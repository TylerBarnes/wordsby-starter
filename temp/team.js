import React, { Fragment } from "react";
import { Link } from "gatsby";
import { css } from "emotion";
import { graphql } from "gatsby";
import Img from "gatsby-image";

// Import app components
import GridEdges from "../../components/gridEdges";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";

const style = css`
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .image,
  .content {
    width: 100%;

    @media screen and (min-width: 640px) {
      width: 50%;
    }
  }

  .content {
    margin-bottom: 30px;
    @media screen and (min-width: 640px) {
      margin-bottom: 0;
      padding-right: 50px;
    }
  }

  .title {
    margin-bottom: 25px;
  }

  .jobTitle {
    margin-bottom: 25px;
    text-transform: uppercase;
  }

  .jobTitle,
  .description {
    @media screen and (min-width: 1024px) {
      padding-left: 100px;
    }
  }

  .image {
    position: relative;
    margin-bottom: 30px;

    &:before {
      content: " ";
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

export const TeamPostTemplate = ({ props }) => {
  const {
    title,
    acf: { jobTitle, text, image }
  } = props;

  return (
    <Fragment>
      <div className={style}>
        <GridEdges>
          <Breadcrumbs currentPageTitle={title}>
            <Link to="/team">Back to team</Link>
          </Breadcrumbs>
        </GridEdges>

        <GridEdges>
          <div className="container">
            <div className="content">
              <h1 className="title">{title}</h1>
              <p className="jobTitle">{jobTitle}</p>
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
            <div className="image">
              <Img fluid={image.localFile.childImageSharp.fluid} />
            </div>
          </div>
        </GridEdges>
      </div>

      <Footer logo={false} />
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <TeamPostTemplate props={data.wordpressWpTeam} />;
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  fragment TeamFields on wordpress__POST {
    id
    title
  }
  query TeamPostByID($id: String!) {
    wordpressWpTeam(id: { eq: $id }) {
      id
      title
      acf {
        jobTitle
        text
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 768) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
