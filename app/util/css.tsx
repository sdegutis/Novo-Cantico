import { Stylesheet } from "../components/page/page";
import { baseUrl } from "../core/http-server";
import { staticRouteFor } from "./static";

export function makeFontComponent(dir: FsDir, name: string, style: string): JSX.Component<{}> {
  const file = dir.filesByName[name]!;

  const inlineFontCss = file.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
    return `url(${baseUrl.replace(/\/+$/, '')}${staticRouteFor(dir.filesByName[filename]!)})`;
  });

  const font = { name, buffer: Buffer.from(inlineFontCss) };

  return (attrs, children) => {
    const child = children[0] as JSX.Element;
    const oldStyle = child.attrs["style"] ?? '';
    child.attrs["style"] = `${oldStyle};${style};`;
    child.children.push(<Stylesheet src={staticRouteFor(font)} />);
    return child;
  };
}
