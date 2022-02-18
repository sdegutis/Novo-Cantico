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
        <html>
          Support via <a href='https://www.patreon.com/novocantico'>Patreon</a>
        </html>
      </>),
    };
  }
});
