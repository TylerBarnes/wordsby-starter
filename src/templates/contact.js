import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { css } from "emotion";

// Import app components
import Color from "../components/Color";
// import Map from "../../components/Map";

const styles = css`
  * {
    color: white;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    background-color: ${Color.darkGrey};

    @media screen and (min-width: 640px) {
      padding-bottom: 150px;
    }
  }

  .googleMaps,
  .content {
    width: 100%;

    @media screen and (min-width: 640px) {
      width: 50%;
    }
  }

  .googleMaps {
    min-height: 350px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .contactInfo {
    padding: 30px;
    display: flex;
    align-items: center;
    background-color: ${Color.red};
    flex: 1;

    @media screen and (min-width: 1024px) {
      padding: 60px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 22px;
    }

    p {
      margin-bottom: 40px;
    }

    .contact {
      margin-bottom: 0;
      a {
        text-decoration: none;
        display: block;
      }
    }
  }

  .career {
    border-top: 1px solid white;
    padding: 30px;
    background-color: ${Color.darkGrey};

    @media screen and (min-width: 1024px) {
      padding: 60px 60px 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
`;

export const PageContact = ({ props }) => {
  const {
    wordpressPage: {
      acf: { text1, text2 }
    }
  } = props;

  return (
    <Fragment>
      <div className={styles}>
        <div className="container">
          <div className="googleMaps">{/* <Map /> */}</div>

          <div className="content">
            <div className="contactInfo">
              {text1 && <div dangerouslySetInnerHTML={{ __html: text1 }} />}
            </div>

            <div className="career">
              {text2 && <div dangerouslySetInnerHTML={{ __html: text2 }} />}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <PageContact props={data} />;
};

Page.defaultProps = {
  menuLogo: true
};

export default Page;

export const pageQuery = graphql`
  query PageContactById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        text1
        text2
      }
    }
  }
`;
