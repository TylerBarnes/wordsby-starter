import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { css } from "emotion";

// Import app components
import PostList from "../../components/PostList";
import TitleText from "../../components/titleText";
import GridEdges from "../../components/gridEdges";
import Footer from "../../components/Footer";

const styles = css`
  h1 {
    text-transform: lowercase;
  }
`;

export const PageProjects = ({ data }) => {
  return (
    <Fragment>
      <div className={styles}>
        <GridEdges>
          <TitleText props={data.wordpressPage} />

          <PostList
            posts={data.allWordpressWpFeaturedProjects.edges}
            type="projects"
          />
        </GridEdges>
      </div>

      <Footer logo={true} />
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <PageProjects data={data} />;
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  query PageProjectsById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        text
      }
    }
    allWordpressWpFeaturedProjects(sort: { fields: [menu_order] }) {
      edges {
        node {
          id
          title
          link
          categories {
            name
          }
          acf {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            logo_white {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 250) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
