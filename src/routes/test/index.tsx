import { addRouteable } from "../../core/router";

addRouteable({
  method: 'GET',
  route: '/test',
  handle: (input) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: Buffer.from('Hello <i>world</i>.'),
    };
  },
});
