import React from "react";
import Helmet from "react-helmet";
import "minireset.css/minireset.css";
import { injectGlobal } from "emotion";

// import app components
import Color from "./Color";
import Transition from "./Transition";
import typographyString from "./Typography";
import Header from "./Header";
import MetaTag from "./MetaTag";

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

const TemplateWrapper = ({
  location,
  children,
  pageResources: {
    component: { defaultProps: props }
  },
  data: {
    wordpressPage: page,
    wordpressWpTeam: team,
    wordpressWpFeaturedProjects: project
  }
}) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
    </Helmet>

    {page ? <MetaTag title={page.title} /> : ""}
    {team ? <MetaTag title={team.title} /> : ""}
    {project ? <MetaTag title={project.title} /> : ""}

    {/* <Header logo={props.menuLogo} /> */}

    <Transition location={location}>{children}</Transition>
  </div>
);

export default TemplateWrapper;
