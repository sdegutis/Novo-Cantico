import { advantagesPage } from "../../routes/advantages";
import { comparisonsPage } from "../../routes/comparisons";
import { landingPage } from "../../routes/home";
import { staticRouteFor } from "../../util/static";
import { NarrowContainer } from "../narrow-container/container";
import { Stylesheet } from "../page/page";
import { ViewSourceLink } from "../view-source/view-source";

export const NavBar: JSX.Component<{}> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['navbar.css']!)} />
  <NarrowContainer>
    <nav id='site-navbar'>
      <a href={landingPage.route}>Novo Cantico</a>
      {/* <a href={comparisonsPage.route}>Comparisons</a>
      <a href={advantagesPage.route}>Advantages</a> */}
      <a href='https://github.com/sdegutis/Novo-Cantico'>GitHub Repo</a>
      <a href='https://github.com/sponsors/sdegutis?o=esb'>Sponsor Project</a>
      <a href='mailto:sbdegutis+novocantico@gmail.com'>Software Consulting</a>
    </nav>
    <p><ViewSourceLink file={__file}>View navbar's source</ViewSourceLink></p>
  </NarrowContainer>
</>;
