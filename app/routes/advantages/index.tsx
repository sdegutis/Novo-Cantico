import { NarrowContainer } from "../../components/narrow-container/container";
import { NavBar } from "../../components/navbar/navbar";
import { Page } from "../../components/page/page";
import { ViewSourceLink } from "../../components/view-source/view-source";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { markdown } from "../../util/markdown";

const content = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const advantagesPage: Routeable = {
  method: 'GET',
  route: '/advantages',
  handle: (input) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Page title="Novo Cantico">
          <NavBar />
          <NarrowContainer style='margin-bottom:7em'>
            {content}
            <p><ViewSourceLink file={__file}>View this page's source</ViewSourceLink></p>
          </NarrowContainer>
        </Page>
      </>),
    };
  }
};

addRouteable(advantagesPage);
