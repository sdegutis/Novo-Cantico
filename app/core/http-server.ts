import 'dotenv/config';
import * as http from "http";
import 'source-map-support/register';

export const baseUrl = process.env['BASE_URL']!;

export class Server {

  handler!: http.RequestListener;

  constructor(port: number) {
    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      this.handler(req, res);
    });
    server.listen(port);
    console.log(`Running on http://localhost:${port}`);
  }

}

export function makeRequestHandler(handler: RouteHandler): http.RequestListener {
  return ((req: http.IncomingMessage, res: http.ServerResponse) => {
    let chunks: Buffer[] = [];
    req.on('data', (data: Buffer) => chunks.push(data));
    req.on('end', () => {
      const input: RouteInput = {
        url: new URL(req.url!, baseUrl),
        body: Buffer.concat(chunks),
        method: req.method!,
        headers: req.headers,
      };

      const output = handler(input);

      res.statusCode = output.status ?? 200;
      for (const [k, v] of Object.entries(output.headers ?? {})) {
        if (typeof v === 'string') {
          res.setHeader(k, v);
        }
      }
      res.end(output.body ?? '');
    });
  });
}
