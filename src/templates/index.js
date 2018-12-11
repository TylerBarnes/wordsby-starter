import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";

export default function home(props) {
  const {
    wordpressWpCollections: { post_title, post_content }
  } = props.data;

  return (
    <>
      {!!post_title && <h1>{post_title}</h1>}
      <h2>Default template</h2>
      {!!post_content && Parser(post_content)}
    </>
  );
}

export const CollectionQuery = graphql`
  query DefaultSingle($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
