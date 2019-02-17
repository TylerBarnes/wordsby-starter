import React from "react";
import { graphql, Link } from "gatsby";
import { Img } from "wordsby-components";
// import Parser from "html-react-parser";
import excerptHtml from "excerpt-html";

export default function home(props) {
  const {
    wordsbyCollections: { post_title },
    posts: { edges: posts }
  } = props.data;

  const { previousPagePath, nextPagePath } = props.pageContext;

  return (
    <>
      <h1>Default Post Archive</h1>
      {!!post_title && <h1>{post_title}</h1>}
      {!!posts &&
        posts.map(({ node: post }) => {
          const {
            taxonomies: { category }
          } = post;

          return (
            <div key={post.post_title}>
              <Link to={post.pathname}>
                {post.featured_img ? (
                  <Img field={post.featured_img} />
                ) : (
                  "Placeholder"
                )}
              </Link>
              <div>
                {!!category &&
                  category.terms.map((term, index) => {
                    return (
                      <Link key={index} to={term.pathname}>
                        {term.name}
                      </Link>
                    );
                  })}
              </div>
              <Link to={post.pathname}>
                <h2>{post.post_title}</h2>
              </Link>

              {!!post.post_content && (
                <div>{excerptHtml(post.post_content)}</div>
              )}

              <Link to={post.pathname}>
                <button>Read more</button>
              </Link>
            </div>
          );
        })}

      {!!previousPagePath && <Link to={previousPagePath}>Previous page</Link>}
      {!!nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </>
  );
}

export const CollectionQuery = graphql`
  query($skip: Int, $limit: Int, $post_type: String, $id: Int) {
    posts: allWordsbyCollections(
      filter: { post_type: { eq: $post_type } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          post_title
          post_content
          pathname
          taxonomies {
            category {
              pathname
              terms {
                name
                slug
                pathname
              }
            }
          }
        }
      }
    }

    wordsbyCollections(ID: { eq: $id }) {
      post_title
    }
  }
`;
