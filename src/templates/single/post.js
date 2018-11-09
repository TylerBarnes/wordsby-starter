import React from "react";
import { graphql } from "gatsby";

const Page = props => {
  const {
    wordpressWpCollections: { post_title, post_content }
  } = props.data;

  return (
    <>
      <h1>{post_title}</h1>
      <h2>
        <strong>Template:</strong> single post index.
      </h2>
      <p>{post_content}</p>
    </>
  );
};

export default Page;

export const CollectionQuery = graphql`
  query DefaultPostById($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`;