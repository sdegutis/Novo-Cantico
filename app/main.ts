import 'source-map-support/register';
import { makeRequestHandler, Server } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { addRouteable, loadRoutes } from './core/router';
import './routes/home';

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

persisted.server ??= new Server(8080);
persisted.server.handler = makeRequestHandler(makeRouteHandler(loadRoutes()));
