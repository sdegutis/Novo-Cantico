import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { Page } from "../../components/page/page";
import { ViewSourceLink } from "../../components/view-source/view-source";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { blogPosts } from "../../model/load";

export const blogIndexPage: Routeable = {
  method: 'GET',
  route: '/blog',
  handle: (input) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Page title="Blog posts">
          <NavBar />
          <NarrowContainer style='margin-bottom:7em'>
            <h2><a href={blogIndexPage.route}>All blog posts</a></h2>
            <ul>
              {blogPosts.map(post => <>
                <li>
                  <a href={post.view.route}>{post.title}</a> &mdash; { }
                  {post.date.toLocaleString()}
                </li>
              </>)}
            </ul>
            <p><ViewSourceLink file={__file}>View this page's source</ViewSourceLink></p>
          </NarrowContainer>
        </Page>
      </>),
    };
  }
};

addRouteable(blogIndexPage);
