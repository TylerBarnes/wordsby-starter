import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { css } from "emotion";
import Img from "gatsby-image";

// Import app components
import GridEdges from "../../components/gridEdges";
import Color from "../../components/Color";
import Footer from "../../components/Footer";

const styles = css`
  h1 {
    padding-bottom: 70px;
    text-transform: lowercase;
  }

  h3 {
    color: ${Color.red};
    font-size: 1.2rem;
    font-weight: 300;
  }

  .container {
    max-width: 500px;
    margin: 0 auto;
  }

  .tasks {
    margin-bottom: 100px;

    .subline {
      margin-bottom: 50px;
    }

    .task {
      margin-bottom: 50px;

      &__headline {
        margin-bottom: 10px;
      }
    }
  }

  .clients {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .client {
      width: 100%;
      margin-bottom: 40px;
      padding: 0 10%;

      @media screen and (min-width: 460px) {
        width: 50%;
      }

      .gatsby-image-outer-wrapper {
        width: 100%;
      }

      .image {
        margin: 0 auto;
        max-width: 200px;
      }
    }
  }
`;

export const PageWhatWeDo = ({ props }) => {
  const {
    title,
    acf: { subline, tasks, headline, clients }
  } = props;

  return (
    <Fragment>
      <div className={styles}>
        <GridEdges>
          <h1 className="headline">{title}</h1>

          <div className="container">
            <div className="tasks">
              <h3 className="subline">{subline}</h3>

              {tasks.map((task, index) => {
                return (
                  <div className="task" key={index}>
                    <div
                      className="task__headline"
                      dangerouslySetInnerHTML={{ __html: task.headline }}
                    />
                    <div
                      className="task__text"
                      dangerouslySetInnerHTML={{ __html: task.text }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <h1 className="headline">{headline}</h1>

          <div className="container">
            <div className="clients">
              {clients.map((client, index) => {
                if (client.image.localFile.childImageSharp === null) {
                  return "";
                }
                return (
                  <div className="client" key={index}>
                    <Img
                      className="image"
                      fluid={client.image.localFile.childImageSharp.fluid}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </GridEdges>
      </div>

      <Footer logo={true} />
    </Fragment>
  );
};

const Page = ({ data }) => {
  return <PageWhatWeDo props={data.wordpressPage} />;
};
Page.defaultProps = {
  menuLogo: true
};
export default Page;

export const pageQuery = graphql`
  query PageWhatWeDoById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      acf {
        subline
        headline
        tasks {
          headline
          text
        }
        clients {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
