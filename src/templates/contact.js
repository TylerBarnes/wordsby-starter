import React from "react";
import { graphql } from "gatsby";

export default function contact(props) {
  return (
    <>
      <h1>Contact Template</h1>
    </>
  );
}

export const CollectionQuery = graphql`
  query ContactTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
    }
  }
`;
