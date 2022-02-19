import { baseUrl } from "../../core/http-server";
import { staticRouteFor } from "../../util/static";
import carattere from './carattere.css';

const inlineFontCss = carattere.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
  return `url(${baseUrl.replace(/\/+$/, '')}${staticRouteFor(__dir.filesByName[filename]!)})`;
});

export const carattereFont = {
  name: 'carattere.css',
  buffer: Buffer.from(inlineFontCss),
};
