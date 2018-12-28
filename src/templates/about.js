import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";

export default function home(props) {
  const {
    wordsbyCollections: { post_title, post_content }
  } = props.data;

  return (
    <>
      {!!post_title && <h1>{post_title}</h1>}
      <h2>About template</h2>
      {!!post_content && <div>{Parser(post_content)}</div>}
    </>
  );
}

export const CollectionQuery = graphql`
  query AboutTemplate($id: Int!) {
    wordsbyCollections(ID: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
