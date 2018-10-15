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

export const PageTeam = ({ data }) => {
  return (
    <Fragment>
      <div className={styles}>
        <GridEdges>
          <TitleText props={data.wordpressPage} />
          <PostList posts={data.allWordpressWpTeam.edges} type="team" />
        </GridEdges>
      </div>

      <Footer logo={true} />
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <PageTeam data={data} />;
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  query PageTeamById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        text
      }
    }
    allWordpressWpTeam(sort: { fields: [menu_order] }) {
      edges {
        node {
          id
          title
          link
          acf {
            jobTitle
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 768) {
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
