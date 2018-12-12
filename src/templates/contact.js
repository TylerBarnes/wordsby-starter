import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";

export default function contact(props) {
  const { post_title, post_content } = props;

  return (
    <>
      <h1>Contact Template</h1>
      {!!post_title && <h2>{post_title}</h2>}
      {!!post_content && <div>{Parser(post_content)}</div>}
    </>
  );
}

export const CollectionQuery = graphql`
  query ContactTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
