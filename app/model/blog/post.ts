import JsYaml from 'js-yaml';
import { DateTime } from "luxon";
import { ViewBlogPage } from "../../routes/blog/blog-view";
import { markdown } from "../../util/markdown";
import { staticRouteFor } from '../../util/static';

export class BlogPost {

  static loadFromFile(dir: FsDir) {
    const file = dir.filesByName['content.md']!;
    const date = DateTime.fromISO(dir.name.slice(0, 10));
    const rawContent = file.buffer.toString('utf8').replace('\r\n', '\n');
    const [, frontmatter, mdContent] = rawContent.split(/^---\n(.+?)\n---\n\n(.+?)$/s) as [string, string, string];
    const { title, image: imageAuthor } = JsYaml.load(frontmatter) as any;
    const content = markdown.render(mdContent);
    const image = staticRouteFor(dir.filesByName['image.jpg']!);
    return new BlogPost(dir.path, dir.name, title, date, content, image, imageAuthor);
  }

  view;

  constructor(
    public path: string,
    public slug: string,
    public title: string,
    public date: DateTime,
    public content: string,
    public image: string,
    public imageAuthor: string,
  ) {
    this.view = new ViewBlogPage(this);
  }

}

export function loadBlogPosts() {
  const postsDir = __dir.dirsByName['posts']!;
  return postsDir.dirs.map(BlogPost.loadFromFile);
}
