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
            <div class='header-box'>
              <h1>Novo Cantico</h1>
              <iframe src="https://github.com/sponsors/sdegutis/button" title="Sponsor sdegutis" height="35" width="116" style="border: 0; margin-bottom: 7px"></iframe>
            </div>
            {content}
          </NarrowContainer>
        </Page>
      </>),
    };
  }
});
