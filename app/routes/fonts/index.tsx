import { staticRouteFor } from "../../util/static";
import carattere from './carattere.css';

export const inlineFontCss = carattere.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
  return `url(${staticRouteFor(__dir.filesByName[filename]!)})`;
});
