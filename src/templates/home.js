import React from "react";
import { graphql } from "gatsby";

export default function home({ data }) {
  return <div />;
}

export const query = graphql`
  query HomeTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
    }
  }
`;
