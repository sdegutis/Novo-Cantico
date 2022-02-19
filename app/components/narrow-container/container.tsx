import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../page/page";
import css from './container.css';

export const NarrowContainer: JSX.Component<{}> = (attrs, children) => <>
  <div class='container'>
    <Stylesheet src={staticRouteFor(css)} />
    {children}
  </div>
</>;
