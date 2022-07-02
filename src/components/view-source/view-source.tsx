import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../page/page";

export const ViewSourceLink: JSX.Component<{ file: { path: string } }> = ({ file }, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['view-source.css']!)} />
  <a class='view-source-link' href={`https://github.com/sdegutis/Novo-Cantico/blob/main/app` + file.path}>{children}</a>
</>;
