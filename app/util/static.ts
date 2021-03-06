import { createHash } from 'crypto';
import mime from 'mime';
import path from 'path';
import { addRouteable, Routeable, RouteMethod } from '../core/router';

export class HashedStaticFile implements Routeable {

  etag;
  route;
  constructor(private buffer: Buffer, filename: string) {
    const { name, ext } = path.parse(filename);
    const hash = createHash('sha256').update(buffer).digest().toString('base64url');
    this.route = `/static/${name}.${hash}${ext}`;
    this.etag = `"${hash}"`;
  }

  method: RouteMethod = 'GET';

  handle(input: RouteInput) {
    const headers = { 'ETag': this.etag, 'Cache-Control': `max-age=${60 * 60 * 24 * 7 * 52}, immutable` };

    if (input.headers['if-none-match'] === this.etag) {
      return { status: 304, headers };
    }

    return { body: this.buffer, headers };
  }

}

interface Staticable {
  name: string;
  buffer: Buffer;
}

const map = new Map<Staticable, string>();

export function staticRouteFor(file: Staticable): string {
  let s = map.get(file);
  if (!s) {
    if (file.buffer.length < 1_000) {
      const type = mime.getType(file.name) ?? 'application/octet-stream';
      map.set(file, s = `data:${type};base64,${file.buffer.toString('base64')}`);
    }
    else {
      const f = new HashedStaticFile(file.buffer, file.name);
      addRouteable(f);
      map.set(file, s = f.route);
    }
  }
  return s;
}
