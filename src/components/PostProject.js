import React, { Component } from "react";
import { css } from "react-emotion";
import { Link } from "gatsby";
import Img from "gatsby-image";

const styles = css`
  .logo {
    width: 100%;
    max-width: 50%;
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 50px;
  }

  .categories {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: flex-end;

    &__container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      text-align: right;
    }

    span {
      color: white;
      text-transform: uppercase;
      font-weight: 100;
      letter-spacing: 0.5px;
    }
  }
`;

class PostProject extends Component {
  render() {
    const { post, index } = this.props;

    const {
      node: {
        link,
        categories,
        acf: { image, logo_white }
      }
    } = post;

    return (
      <Link to={link} className={`post ${styles}`} key={index}>
        <Img className="image" fluid={image.localFile.childImageSharp.fluid} />

        <div className="content">
          <div className="categories">
            <div className="categories__container">
              {categories.map((category, index) => {
                return <span key={index}>{category.name}</span>;
              })}
            </div>
          </div>
          <div className="logo">
            <Img
              className="image"
              fluid={logo_white.localFile.childImageSharp.fluid}
            />
          </div>
        </div>

        <div className={"overlay"}>
          <div className={"content"}>
            Replace with black logo
            <Img
              className="image"
              fluid={logo_white.localFile.childImageSharp.fluid}
            />
          </div>
        </div>
      </Link>
    );
  }
}
export default PostProject;
