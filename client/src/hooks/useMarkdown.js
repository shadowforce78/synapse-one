import { useState } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

const useMarkdown = () => {
  const [markdown, setMarkdown] = useState('');

  const updateMarkdown = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const parsedMarkdown = parseMarkdown(markdown);

  return {
    markdown,
    updateMarkdown,
    parsedMarkdown,
  };
};

export default useMarkdown;