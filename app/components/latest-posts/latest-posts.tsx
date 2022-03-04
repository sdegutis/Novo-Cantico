import { blogPosts } from "../../model/load";
import { blogIndexPage } from "../../routes/blog";
import { ViewSourceLink } from "../view-source/view-source";

export const LatestPosts: JSX.Component<any> = (attrs, children) => <>
  <div>
    <h2><a href={blogIndexPage.route}>Blog posts</a></h2>
    <ul>
      {blogPosts.slice(-10).reverse().map(post => <>
        <li>
          <a href={post.view.route}>{post.title}</a> &mdash; { }
          {post.date.toLocaleString()}
        </li>
      </>)}
    </ul>
    <p><ViewSourceLink file={__file}>View blog-post glimpse component's source</ViewSourceLink></p>
  </div>
</>;
