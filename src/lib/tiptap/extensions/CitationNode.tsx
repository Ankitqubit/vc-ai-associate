import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { CitationBadge } from '@/components/memo/CitationBadge';
import { Citation } from '@/lib/types';

export interface CitationNodeOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    citation: {
      /**
       * Insert a citation badge
       */
      insertCitation: (citationId: string) => ReturnType;
    };
  }
}

/**
 * React component that renders the citation badge in the editor
 */
function CitationNodeView({ node, deleteNode }: any) {
  const citationId = node.attrs.citationId;
  const citationData = node.attrs.citationData;
  const number = node.attrs.number;

  // Parse citation data if it's a string
  let citation: Citation;
  try {
    citation = typeof citationData === 'string'
      ? JSON.parse(citationData)
      : citationData;
  } catch (e) {
    console.error('Failed to parse citation data:', e);
    return null;
  }

  return (
    <NodeViewWrapper as="span" className="inline-citation">
      <CitationBadge
        citation={citation}
        number={number}
        onClick={() => {
          // Handle citation click - could open drawer/modal
          console.log('Citation clicked:', citation);
        }}
      />
    </NodeViewWrapper>
  );
}

/**
 * Tiptap extension for inline citation badges
 * Renders numbered badges like [1], [2] inline with text
 */
export const CitationNode = Node.create<CitationNodeOptions>({
  name: 'citation',

  group: 'inline',

  inline: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      citationId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-citation-id'),
        renderHTML: (attributes) => {
          if (!attributes.citationId) {
            return {};
          }
          return {
            'data-citation-id': attributes.citationId,
          };
        },
      },
      citationData: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-citation-data'),
        renderHTML: (attributes) => {
          if (!attributes.citationData) {
            return {};
          }
          return {
            'data-citation-data': typeof attributes.citationData === 'string'
              ? attributes.citationData
              : JSON.stringify(attributes.citationData),
          };
        },
      },
      number: {
        default: 1,
        parseHTML: (element) => {
          const num = element.getAttribute('data-citation-number');
          return num ? parseInt(num, 10) : 1;
        },
        renderHTML: (attributes) => {
          return {
            'data-citation-number': attributes.number,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-citation-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'inline-citation-node',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CitationNodeView);
  },

  addCommands() {
    return {
      insertCitation:
        (citationId: string) =>
        ({ commands, state }) => {
          // Find the citation data from the memo section
          // This will need to be passed via editor options or context
          return commands.insertContent({
            type: this.name,
            attrs: {
              citationId,
              // citationData and number should be set when inserting
            },
          });
        },
    };
  },
});
