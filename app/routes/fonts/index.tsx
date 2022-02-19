import { Stylesheet } from "../../components/page/page";
import { baseUrl } from "../../core/http-server";
import { staticRouteFor } from "../../util/static";
import carattere from './carattere.css';

const inlineFontCss = carattere.buffer.toString('utf8').replace(/url\((.+?)\)/g, (whole, filename) => {
  return `url(${baseUrl.replace(/\/+$/, '')}${staticRouteFor(__dir.filesByName[filename]!)})`;
});

const carattereFont = {
  name: 'carattere.css',
  buffer: Buffer.from(inlineFontCss),
};

export const InCarattere: JSX.Component<{}> = (attrs, children) => {
  const child = children[0] as JSX.Element;
  const oldStyle = child.attrs["style"] ?? '';
  child.attrs["style"] = `${oldStyle}; font-family: 'Carattere', cursive;`;
  child.children.push(<Stylesheet src={staticRouteFor(carattereFont)} />);
  return child;
};
