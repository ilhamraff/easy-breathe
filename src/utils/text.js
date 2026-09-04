/**
 * Strip HTML tags and entities to return clean plain text for excerpts.
 * @param {string} html - HTML string.
 * @returns {string} Plain text.
 */
export function stripHtml(html) {
  if (!html) return "";

  // Remove HTML tags
  const noTags = html.replace(/<[^>]*>/g, " ");

  // Decode common HTML entities
  const decoded = noTags
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // Normalize consecutive whitespace
  return decoded.replace(/\s+/g, " ").trim();
}
