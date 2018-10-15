import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { css } from "emotion";

// Import app components
import GridEdges from "../../components/gridEdges";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const styles = css`
  min-height: 90vh;
  min-height: calc(100vh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    margin-bottom: 100px;

    @media screen and (min-width: 640px) {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .headline {
    svg {
      display: none;
    }

    @media screen and (min-width: 640px) {
      display: flex;
      align-items: flex-end;

      svg {
        display: block;
      }
    }

    margin-bottom: 45px;

    h3 {
      margin-left: 25px;
    }
  }

  .buttons {
    margin-left: 25px;

    @media screen and (min-width: 640px) {
      margin-left: 160px;
    }

    > div {
      margin-right: 25px;
      margin-bottom: 30px;
    }
  }
`;

export const PageHome = ({ props }) => {
  const {
    wordpressPage: {
      acf: { headline, logoTitle, button1, button2 }
    }
  } = props;

  return (
    <Fragment>
      <div className={styles}>
        <GridEdges>
          <div className="container">
            <div className="headline">
              <Logo title={logoTitle} />
              <h3>{headline}</h3>
            </div>
            <div className="buttons">
              <Button to={button1.url} children={button1.title} replace />
              <Button to={button2.url} children={button2.title} replace />
            </div>
          </div>
        </GridEdges>
      </div>
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <PageHome props={data} />;
};
Page.defaultProps = {
  menuLogo: false
};
export default Page;

export const pageQuery = graphql`
  query PageHomeById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        logoTitle
        headline
        button1 {
          title
          url
          target
        }
        button2 {
          title
          url
          target
        }
      }
    }
  }
`;
