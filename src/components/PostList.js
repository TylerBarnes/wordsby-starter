import React, { Component } from "react";
import { css } from "react-emotion";

// import app component
// import PostTeam from "./PostTeam";
import PostProject from "./PostProject";

const styles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0;

  .post {
    position: relative;
    width: 100%;
    margin-bottom: 14px;

    @media screen and (min-width: 500px) {
      width: calc(50% - 7px);
    }

    > .gatsby-image-outer-wrapper > .image {
      height: 60vw;

      @media screen and (min-width: 500px) {
        height: 30vw;
      }

      > div {
        display: none;
      }
    }

    &:hover .overlay {
      opacity: 1;
      transition: ease all 0.4s;
      background-color: white;
    }
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 20px 30px;
    opacity: 0;
    transition: ease all 0.4s;
  }
`;

class PostList extends Component {
  render() {
    let card;
    const postList = this.props.posts.map((post, index) => {
      // this.props.type === "team" &&
      //   (card = <PostTeam post={post} key={index} />);

      // this.props.type === "projects" &&
      //   (card = <PostProject post={post} key={index} />);
      return card;
    });
    return <div className={styles}>{postList}</div>;
  }
}

export default PostList;
