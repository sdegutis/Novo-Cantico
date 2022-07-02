import { Stylesheet } from "../components/page/page";
import { baseUrl } from "../core/http-server";
import { staticRouteFor } from "./static";

export function makeFontComponent(file: FsFile): JSX.Component<{}> {
  const css = file.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
    return `url(${baseUrl.replace(/\/+$/, '')}${staticRouteFor(file.parent.filesByName[filename]!)})`;
  });
  const font = { name: file.name, buffer: Buffer.from(css) };
  return () => <Stylesheet src={staticRouteFor(font)} />;
}
