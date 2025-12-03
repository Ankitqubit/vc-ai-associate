import { Mark, mergeAttributes } from '@tiptap/core';

export interface CommentMarkOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    commentMark: {
      /**
       * Set a comment mark
       */
      setCommentMark: (commentId: string) => ReturnType;
      /**
       * Toggle a comment mark
       */
      toggleCommentMark: (commentId: string) => ReturnType;
      /**
       * Unset a comment mark
       */
      unsetCommentMark: (commentId: string) => ReturnType;
    };
  }
}

/**
 * Tiptap extension for highlighting commented text
 * Adds a mark that wraps selected text with a data-comment-id attribute
 */
export const CommentMark = Mark.create<CommentMarkOptions>({
  name: 'commentMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-comment-id'),
        renderHTML: (attributes) => {
          if (!attributes.commentId) {
            return {};
          }
          return {
            'data-comment-id': attributes.commentId,
          };
        },
      },
      commentStatus: {
        default: 'open',
        parseHTML: (element) => element.getAttribute('data-comment-status') || 'open',
        renderHTML: (attributes) => {
          return {
            'data-comment-status': attributes.commentStatus || 'open',
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-comment-id]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'comment-highlight',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCommentMark:
        (commentId: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { commentId, commentStatus: 'open' });
        },
      toggleCommentMark:
        (commentId: string) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, { commentId, commentStatus: 'open' });
        },
      unsetCommentMark:
        (commentId: string) =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          const marks = state.doc.nodesBetween(from, to, (node) => {
            return node.marks.find(
              (mark) => mark.type.name === this.name && mark.attrs.commentId === commentId
            );
          });

          if (marks) {
            return commands.unsetMark(this.name);
          }
          return false;
        },
    };
  },
});
