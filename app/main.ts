import 'source-map-support/register';
import { makeRequestHandler, Server } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { addRouteable, loadRoutes } from './core/router';

addRouteable({
  method: 'GET',
  route: '/',
  handle: (input) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: Buffer.from('Hello <b>world</b>!'),
    };
  }
});

persisted.server ??= new Server(8080);
persisted.server.handler = makeRequestHandler(makeRouteHandler(loadRoutes()));

console.log('Hello world!');
