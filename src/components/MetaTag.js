import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery } from "gatsby";
import { graphql } from "gatsby";

export default props => {
  const title = props.title;
  const children = props.children;
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={props => (
        <Helmet>
          <title>
            {title} | {props.site.siteMetadata.title}
          </title>
          {children}
        </Helmet>
      )}
    />
  );
};
