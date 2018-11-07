import React from "react";
import { graphql } from "gatsby";
// import GridEdges from "../../components/gridEdges";

const Page = ({ data }) => {
  const {
    wordpressWpCollections: { post_title, post_content }
  } = data;

  return (
    <>
      <h1>{post_title}</h1>
      <p>{post_content}</p>
    </>
  );
};

export default Page;

export const CollectionQuery = graphql`
  query CollectionById($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
