import { NarrowContainer } from "../../components/narrow-container/container";
import { Page } from "../../components/page/page";
import { renderElement } from "../../core/jsx";
import { addRouteable } from "../../core/router";
import { DavidLibre } from "../../fonts/davidlibre";
import { markdown } from "../../util/markdown";

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
            <DavidLibre.load />
            <h1 style={`font-size:300%; font-family: ${DavidLibre.fontFamily}`}>Novo Cantico</h1>
            {content}
          </NarrowContainer>
        </Page>
      </>),
    };
  }
});
