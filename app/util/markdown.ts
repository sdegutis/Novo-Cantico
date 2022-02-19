import MarkdownIt from 'markdown-it';

export const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});
