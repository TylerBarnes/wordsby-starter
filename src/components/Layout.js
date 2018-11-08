import React from "react";
import Helmet from "react-helmet";
import "minireset.css/minireset.css";
import { injectGlobal } from "emotion";

// import app components
import Color from "./Color";
import Transition from "./Transition";
import typographyString from "./Typography";
// import Header from "./Header";
import MetaTag from "./MetaTag";
import Preview from "./Preview";

injectGlobal`
  ${typographyString}
  h1, h2, h3, h4, h5, h6 {
    color: ${Color.font.h};
    font-weight: 100;
  }

  p{
    color: ${Color.font.p};
    font-weight: 200;
  }

  a, a:visited, a:focus{
    color: ${Color.font.p};
  }
`;

const TemplateWrapper = props => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
    </Helmet>

    {/* {page ? <MetaTag title={page.title} /> : ""} */}
    {/* {team ? <MetaTag title={team.title} /> : ""} */}
    {/* {project ? <MetaTag title={project.title} /> : ""} */}

    {/* <Header logo={props.menuLogo} /> */}

    <Transition location={props.location}>
      <Preview {...props}>{props.children}</Preview>
    </Transition>
  </div>
);

export default TemplateWrapper;
