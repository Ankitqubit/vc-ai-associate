import { Citation } from '@/lib/types';

/**
 * Injects citation nodes into HTML content
 * Converts placeholders like <cite id="citation-1"></cite> into proper citation nodes
 *
 * @param htmlContent - The HTML content with citation placeholders
 * @param citations - Array of citation objects indexed by their IDs
 * @returns HTML content with citation nodes properly formatted
 */
export function injectCitations(htmlContent: string, citations: Citation[]): string {
  if (!citations || citations.length === 0) {
    return htmlContent;
  }

  // Create a map for quick citation lookup
  const citationMap = new Map(citations.map(c => [c.id, c]));

  // Counter for citation numbering
  let citationNumber = 1;
  const usedCitations = new Map<string, number>();

  // Replace citation placeholders with citation nodes
  return htmlContent.replace(
    /<cite[^>]*id=["']([^"']+)["'][^>]*><\/cite>/g,
    (match, citationId) => {
      const citation = citationMap.get(citationId);
      if (!citation) {
        console.warn(`Citation not found: ${citationId}`);
        return '';
      }

      // Get or assign citation number (same citation = same number)
      let number = usedCitations.get(citationId);
      if (!number) {
        number = citationNumber++;
        usedCitations.set(citationId, number);
      }

      // Create citation node HTML
      const citationData = JSON.stringify(citation).replace(/"/g, '&quot;');
      return `<span class="inline-citation-node" data-citation-id="${citation.id}" data-citation-data="${citationData}" data-citation-number="${number}"></span>`;
    }
  );
}

/**
 * Extracts citations from HTML content
 * Useful for parsing content that already has citation nodes
 *
 * @param htmlContent - HTML content with citation nodes
 * @returns Array of unique citations found in the content
 */
export function extractCitations(htmlContent: string): Citation[] {
  const citations: Citation[] = [];
  const citationIds = new Set<string>();

  const regex = /<span[^>]*data-citation-id=["']([^"']+)["'][^>]*data-citation-data=["']([^"']+)["'][^>]*><\/span>/g;
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    const [, citationId, citationDataEncoded] = match;

    if (!citationIds.has(citationId)) {
      citationIds.add(citationId);

      try {
        const citationData = citationDataEncoded.replace(/&quot;/g, '"');
        const citation = JSON.parse(citationData);
        citations.push(citation);
      } catch (e) {
        console.error(`Failed to parse citation data for ${citationId}:`, e);
      }
    }
  }

  return citations;
}

/**
 * Strips all citations from HTML content
 * Useful for getting plain content without citation badges
 *
 * @param htmlContent - HTML content with citations
 * @returns HTML content without citations
 */
export function stripCitations(htmlContent: string): string {
  return htmlContent.replace(
    /<span[^>]*class="inline-citation-node"[^>]*><\/span>/g,
    ''
  );
}
