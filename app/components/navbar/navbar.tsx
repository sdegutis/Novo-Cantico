import { advantagesPage } from "../../routes/advantages";
import { landingPage } from "../../routes/home";
import { howItWorksPage } from "../../routes/how-it-works";
import { staticRouteFor } from "../../util/static";
import { NarrowContainer } from "../narrow-container/container";
import { Stylesheet } from "../page/page";
import { ViewSourceLink } from "../view-source/view-source";

export const NavBar: JSX.Component<{}> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['navbar.css']!)} />
  <NarrowContainer>
    <nav id='site-navbar'>
      <a href={landingPage.route}>Novo Cantico</a>
      <a href={howItWorksPage.route}>How it works</a>
      <a href={advantagesPage.route}>Advantages</a>
      <a href='https://github.com/sdegutis/Novo-Cantico'>GitHub repo</a>
      <iframe src="https://github.com/sponsors/sdegutis/button" title="Sponsor sdegutis" height="35" width="116" style="border: 0;"></iframe>
    </nav>
    <p><ViewSourceLink file={__file}>View nav-bar's source</ViewSourceLink></p>
  </NarrowContainer>
</>;
