import JsYaml from 'js-yaml';
import { DateTime } from "luxon";
import { ViewBlogPage } from "../../routes/blog/blog-view";
import { markdown } from "../../util/markdown";

export class BlogPost {

  static loadFromFile(file: FsFile) {
    const date = DateTime.fromISO(file.name.slice(0, 10));
    const slug = file.name.slice(0, -3);
    const rawContent = file.buffer.toString('utf8').replace('\r\n', '\n');
    const [, frontmatter, mdContent] = rawContent.split(/^---\n(.+?)\n---\n\n(.+?)$/s) as [string, string, string];
    const { title } = JsYaml.load(frontmatter) as any;
    const content = markdown.render(mdContent);
    return new BlogPost(file, slug, title, date, content);
  }

  view;

  constructor(
    public file: FsFile,
    public slug: string,
    public title: string,
    public date: DateTime,
    public content: string,
  ) {
    this.view = new ViewBlogPage(this);
  }

}

export function loadBlogPosts() {
  const postsDir = __dir.dirsByName['posts']!;
  return postsDir.files.map(BlogPost.loadFromFile);
}
