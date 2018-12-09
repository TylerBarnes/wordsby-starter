import React, { Fragment } from "react";
import { Link } from "gatsby";
import { css } from "emotion";
import { graphql } from "gatsby";

// Import app components
import GridEdges from "../../components/gridEdges";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";

const style = css``;

export const ProjectPostTemplate = ({ props }) => {
  const {
    title
    // acf: { slides }
  } = props;

  return (
    <Fragment>
      <div className={style}>
        <GridEdges>
          <Breadcrumbs currentPageTitle={title}>
            <Link to="/featured-projects">Back to projects</Link>
          </Breadcrumbs>

          {/* <TitleText props={props} /> */}
        </GridEdges>

        {/* <SlidesAnimation slides={slides} /> */}
      </div>

      <Footer logo={true} />
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <ProjectPostTemplate props={data.wordpressWpFeaturedProjects} />;
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  fragment ProjectFields on wordpress__POST {
    id
    title
  }
  query ProjectPostByID($id: String!) {
    wordpressWpFeaturedProjects(id: { eq: $id }) {
      id
      title
      acf {
        text
        slides {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          description
        }
      }
    }
  }
`;
