import { LatestPosts } from "../../components/latest-posts/latest-posts";
import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { Page, Stylesheet } from "../../components/page/page";
import { ViewSourceLink } from "../../components/view-source/view-source";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { BlogPost } from "../../model/blog/post";
import { staticRouteFor } from "../../util/static";
import { blogIndexPage } from "./index";

const PostImage: JSX.Component<{ src: string; author: string }> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['blog.css']!)} />
  <div class='post-image' style={`background-image: url(${attrs.src})`}>
    <NarrowContainer style="position: relative; height: 200px;">
      <span class='attribution'>{attrs.author}</span>
    </NarrowContainer>
  </div>
</>;

export class ViewBlogPage implements Routeable {

  method: RouteMethod = 'GET';
  route: string;

  constructor(private post: BlogPost) {
    this.route = blogIndexPage.route + `/${this.post.slug}`;
    addRouteable(this);
  }

  handle(input: RouteInput): RouteOutput {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Page title="Novo Cantico">
          <NavBar />
          <PostImage src={this.post.image} author={this.post.imageAuthor} />
          <NarrowContainer style='margin-bottom:7em'>
            <h1><a href={this.route}>{this.post.title}</a></h1>
            <p><i>Posted on {this.post.date.toLocaleString()}</i></p>
            <div id='post-content'>
              {this.post.content}
            </div>
            <p><ViewSourceLink file={this.post}>View this blog post's source</ViewSourceLink></p>
            <p><ViewSourceLink file={__file}>View this page's source</ViewSourceLink></p>
            <LatestPosts />
          </NarrowContainer>
        </Page>
      </>),
    };
  }


}
