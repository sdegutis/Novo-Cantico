import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

export const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

markdown.use(markdownItAnchor, {
  slugify,
  permalink: markdownItAnchor.permalink.headerLink(),
});
