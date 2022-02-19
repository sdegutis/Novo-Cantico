import { Stylesheet } from "../components/page/page";
import { baseUrl } from "../core/http-server";
import { staticRouteFor } from "./static";

export function makeFontComponent(dir: FsDir, name: string): JSX.Component<{}> {
  const file = dir.filesByName[name]!;
  const css = file.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
    return `url(${baseUrl.replace(/\/+$/, '')}${staticRouteFor(dir.filesByName[filename]!)})`;
  });
  const font = { name, buffer: Buffer.from(css) };
  return () => <Stylesheet src={staticRouteFor(font)} />;
}
