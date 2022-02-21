import { NarrowContainer } from "../../components/narrow-container/container";
import { Page, Stylesheet } from "../../components/page/page";
import { renderElement } from "../../core/jsx";
import { addRouteable } from "../../core/router";
import { markdown } from "../../util/markdown";
import { staticRouteFor } from "../../util/static";

const content = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

addRouteable({
  method: 'GET',
  route: '/',
  handle: (input) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: renderElement(<>
        <Page title="Novo Cantico">
          <Stylesheet src={staticRouteFor(__dir.filesByName['home.css']!)} />
          <NarrowContainer style='margin-bottom:7em'>
            {content}
          </NarrowContainer>
        </Page>
      </>),
    };
  }
});
