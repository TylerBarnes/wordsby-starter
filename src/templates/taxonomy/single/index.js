import React from "react";
import { graphql, Link } from "gatsby";

export default function home(props) {
  const {
    data: {
      allWordpressWpCollections: { edges: posts }
    }
  } = props;

  return (
    <>
      <h1>Default Single Term template</h1>
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
  query DefaultTaxonomyTermSingle($slug: String!) {
    allWordpressWpCollections(filter: { term_slugs: { in: [$slug] } }) {
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
