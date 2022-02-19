import { Page } from "../components/core";
import { renderElement } from "../core/jsx";
import { addRouteable } from "../core/router";

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
          Coming soon.
        </Page>
      </>),
    };
  }
});
