// Split a text chunk into "wordish" tokens suitable for UI streaming.
// - Convert newlines to spaces
// - Collapse multiple spaces
// - Split on spaces; keep punctuation (.,!?) attached to the preceding word
// - Filter out empty strings

export function splitToWordishTokens(chunk: string): string[] {
  if (!chunk) return [];
  const normalized = chunk.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  const parts = normalized.split(' ').filter(Boolean);
  return parts;
}


