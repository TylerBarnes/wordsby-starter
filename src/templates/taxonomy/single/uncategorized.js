import React from "react";
import { graphql, Link } from "gatsby";

export default function home(props) {
  const {
    data: {
      allWordsbyCollections: { edges: posts }
    }
  } = props;

  return (
    <>
      <h1>Example Single Term template</h1>
      {!!posts &&
        posts.map(({ node: post }) => {
          return (
            <div key={post.pathname}>
              <Link to={post.pathname}>{post.post_title}</Link>
            </div>
          );
        })}
    </>
  );
}

export const CollectionQuery = graphql`
  query UncategorizedTermSingle($slug: String!) {
    allWordsbyCollections(
      filter: {
        term_slugs: { in: [$slug] }
        post_title: { ne: "schema_builder" }
      }
    ) {
      edges {
        node {
          post_title
          template_slug
          term_slugs
          pathname
        }
      }
    }
  }
`;
