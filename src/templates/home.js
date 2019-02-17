import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";

export default function home({
  data: {
    wordsbyCollections: { post_title, post_content }
  }
}) {
  return (
    <>
      <h1>Home Template</h1>
      {!!post_title && <h2>{post_title}</h2>}
      {!!post_content && <div>{Parser(post_content)}</div>}
    </>
  );
}

export const query = graphql`
  query HomeTemplate($id: Int!) {
    wordsbyCollections(ID: { eq: $id }) {
      post_title
      post_content
      # acf {
      # hero_image {
      #   localFile {
      #     childImageSharp {
      #       fluid(quality: 100, maxWidth: 1400) {
      #         ...GatsbyImageSharpFluid_tracedSVG
      #       }
      #     }
      #   }
      # }
      # }
    }
  }
`;
