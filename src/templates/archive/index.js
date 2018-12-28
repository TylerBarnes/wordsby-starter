import React from "react";
import { graphql, Link } from "gatsby";

export default function home(props) {
  const {
    wordsbyCollections: { post_title, post_content },
    posts: { edges: posts }
  } = props.data;

  const { previousPagePath, nextPagePath } = props.pageContext;

  return (
    <>
      {!!post_title && <h1>{post_title}</h1>}
      <h2>Default Archive template</h2>
      {!!post_content && (
        <div dangerouslySetInnerHTML={{ __html: post_content }} />
      )}

      {!!posts &&
        posts.map(({ node: post }) => (
          <article key={post.post_title}>
            <Link to={post.pathname}>{post.post_title}</Link>
          </article>
        ))}

      {!!previousPagePath && <Link to={previousPagePath}>Previous page</Link>}
      {!!nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </>
  );
}

export const CollectionQuery = graphql`
  query($skip: Int, $limit: Int, $post_type: String, $id: Int) {
    posts: allWordsbyCollections(
      filter: { post_type: { eq: $post_type } }
      skip: $skip # This was added by the plugin
      limit: $limit # This was added by the plugin
    ) {
      edges {
        node {
          post_title
          post_content
          pathname
        }
      }
    }

    wordsbyCollections(ID: { eq: $id }) {
      post_title
      post_content
    }
  }
`;
