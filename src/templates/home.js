import React from "react";
import { graphql } from "gatsby";
import Parser from "html-react-parser";
import { Img } from "wordsby-components";

export default function home({
  data: {
    wordpressWpCollections: {
      post_title,
      post_content,
      acf: { hero_image }
    }
  }
}) {
  return (
    <>
      <h1>Home Template</h1>
      {!!post_title && <h2>{post_title}</h2>}
      {!!post_content && <div>{Parser(post_content)}</div>}
      {!!hero_image && <Img field={hero_image} />}
    </>
  );
}

export const query = graphql`
  query HomeTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
      acf {
        hero_image {
          localFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 1400) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
