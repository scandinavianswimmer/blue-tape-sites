const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const applyInlineMarkdown = (value: string) => {
  let rendered = escapeHtml(value);

  rendered = rendered.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  rendered = rendered.replace(/\*(.+?)\*/g, "<em>$1</em>");
  rendered = rendered.replace(/`([^`]+)`/g, "<code>$1</code>");
  rendered = rendered.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
  );

  return rendered;
};

const closeListIfOpen = (chunks: string[], listOpen: boolean) => {
  if (listOpen) {
    chunks.push("</ul>");
  }

  return false;
};

export const renderArticleMarkdown = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const chunks: string[] = [];
  let paragraphBuffer: string[] = [];
  let listOpen = false;

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    chunks.push(`<p>${applyInlineMarkdown(paragraphBuffer.join(" "))}</p>`);
    paragraphBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      listOpen = closeListIfOpen(chunks, listOpen);
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      listOpen = closeListIfOpen(chunks, listOpen);
      const level = headingMatch[1].length + 1;
      chunks.push(`<h${level}>${applyInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!listOpen) {
        chunks.push("<ul>");
        listOpen = true;
      }
      chunks.push(`<li>${applyInlineMarkdown(listMatch[1])}</li>`);
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  closeListIfOpen(chunks, listOpen);

  return chunks.join("\n");
};
