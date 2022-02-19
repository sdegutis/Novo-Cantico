import { NarrowContainer } from "../../components/narrow-container/container";
import { Page } from "../../components/page/page";
import { renderElement } from "../../core/jsx";
import { addRouteable } from "../../core/router";
import { markdown } from "../../util/markdown";
import { InCarattere } from "../fonts";

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
          <NarrowContainer>
            <InCarattere><h1 style='font-size:300%'>Novo Cantico</h1></InCarattere>
            <p><em>Finding a new harmony for web software from first principles.</em></p>
            <hr />
            {content}
            <hr />
            <i>Coming soon.</i>
          </NarrowContainer>
        </Page>
      </>),
    };
  }
});
