function parseMarkdown(markdownText) {
  // Simple Markdown parsing logic
  const htmlText = markdownText
    .replace(/###### (.*)/g, '<h6>$1</h6>') // H6
    .replace(/##### (.*)/g, '<h5>$1</h5>') // H5
    .replace(/#### (.*)/g, '<h4>$1</h4>') // H4
    .replace(/### (.*)/g, '<h3>$1</h3>') // H3
    .replace(/## (.*)/g, '<h2>$1</h2>') // H2
    .replace(/# (.*)/g, '<h1>$1</h1>') // H1
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
    .replace(/~~(.*?)~~/g, '<del>$1</del>') // Strikethrough
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />') // Images
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // Links
    .replace(/\n/g, '<br/>'); // Line breaks

  return htmlText;
}

export { parseMarkdown };