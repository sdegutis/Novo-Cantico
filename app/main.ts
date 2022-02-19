import 'source-map-support/register';
import { makeRequestHandler, Server } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';

for (const routeDir of __dir.dirsByName['routes']!.dirs) {
  const indexFile = routeDir.find('index');
  if (indexFile && indexFile.isFile()) {
    require(indexFile.path);
  }
}

persisted.server ??= new Server(8080);
persisted.server.handler = makeRequestHandler(makeRouteHandler(loadRoutes()));
