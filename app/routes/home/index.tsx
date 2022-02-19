import { Page } from "../../components/page";
import { renderElement } from "../../core/jsx";
import { addRouteable } from "../../core/router";

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

          <h1 style="font-family: 'Carattere', cursive;">Novo Cantico</h1>

          Coming soon.
        </Page>
      </>),
    };
  }
});
