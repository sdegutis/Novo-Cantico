import mime from "mime";

export function notFoundPage(input: RouteInput): RouteOutput {
  return {
    status: 404,
    body: Buffer.from('Page not found'),
  };
}

export function errorPage(input: RouteInput): RouteOutput {
  return {
    status: 500,
    body: Buffer.from('An error happened (not your fault)'),
  };
}

export function makeRouteHandler(routes: Map<string, RouteHandler>): RouteHandler {
  return (input: RouteInput): RouteOutput => {
    if (input.headers['host'] !== input.url.host) {
      return { status: 302, headers: { 'Location': input.url.href } };
    }

    if (input.url.pathname.endsWith('/') && input.url.pathname !== '/') {
      return { status: 302, headers: { 'Location': input.url.pathname.slice(0, -1) } };
    }

    const key = `${input.method} ${input.url.pathname}`;
    const handler = routes.get(key);
    let output: RouteOutput;

    try {
      if (handler) {
        output = handler(input);
      }
      else {
        output = notFoundPage(input);
      }
    }
    catch (e) {
      console.error(e);
      output = errorPage(input);
    }

    output.headers ??= {};
    output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
    output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

    return output;
  };
}
