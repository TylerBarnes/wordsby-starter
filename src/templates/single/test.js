import React from "react";
import { graphql } from "gatsby";

const Page = ({ data }) => {
  const {
    wordpressWpCollections: { post_title, post_content }
  } = data;

  return (
    <>
      <h1>{post_title}</h1>
      <h2>
        <strong>Template:</strong> Test Single
      </h2>
      <p>{post_content}</p>
    </>
  );
};

export default Page;

export const CollectionQuery = graphql`
  query TestById($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
