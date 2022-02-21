import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { Page } from "../../components/page/page";
import { ViewSourceLink } from "../../components/view-source/view-source";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { BlogPost } from "../../model/blog/post";
import { blogIndexPage } from "./blog-index";

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
          <NarrowContainer style='margin-bottom:7em'>
            <h1><a href={this.route}>{this.post.title}</a></h1>
            <p><i>Posted on {this.post.date.toLocaleString()}</i></p>
            {this.post.content}
            <p><ViewSourceLink file={this.post.file}>View this blog post's source</ViewSourceLink></p>
            <p><ViewSourceLink file={__file}>View this page's source</ViewSourceLink></p>
          </NarrowContainer>
        </Page>
      </>),
    };
  }


}
