import React from "react";
import { graphql, Link } from "gatsby";
import Grid from "styled-components-grid";
import InnerLayout from "../../layout/InnerLayout";
import Img from "gatsby-image";
import Sidebar from "../../components/Sidebar";
import Edges from "../../components/Edges";
import excerptHtml from "excerpt-html";
import Parser from "html-react-parser";

export default function home(props) {
  const {
    wordpressWpCollections: { post_title },
    posts: { edges: posts }
  } = props.data;

  const { previousPagePath, nextPagePath } = props.pageContext;

  return (
    <InnerLayout>
      <Edges>
        <Grid>{!!post_title && <h1>{post_title}</h1>}</Grid>
        <Grid>
          <Grid.Unit size={{ md: 1 / 5 }}>
            <Sidebar />
          </Grid.Unit>

          <Grid.Unit size={{ md: 4 / 5 }}>
            {!!posts &&
              posts.map(({ node: post }) => {
                const {
                  taxonomies: {
                    category: { pathname, terms }
                  }
                } = post;

                return (
                  <Grid key={post.post_title}>
                    <Grid.Unit size={{ md: 1 / 3 }}>
                      <Link to={post.pathname}>
                        {post.featured_img ? (
                          <Img
                            fluid={
                              post.featured_img.localFile.childImageSharp.fluid
                            }
                          />
                        ) : (
                          "Placeholder"
                        )}
                      </Link>
                    </Grid.Unit>

                    <Grid.Unit size={{ md: 2 / 3 }}>
                      {terms.map((term, index) => {
                        return (
                          <Link key={index} to={`${pathname}${term.slug}`}>
                            {term.name}
                          </Link>
                        );
                      })}

                      <Link to={post.pathname}>
                        <h2>{post.post_title}</h2>
                      </Link>

                      {!!post.post_content && (
                        <div>{Parser(excerptHtml(post.post_content))}</div>
                      )}

                      <Link to={post.pathname}>
                        <button>Read more</button>
                      </Link>
                    </Grid.Unit>
                  </Grid>
                );
              })}

            {!!previousPagePath && (
              <Link to={previousPagePath}>Previous page</Link>
            )}
            {!!nextPagePath && <Link to={nextPagePath}>Next page</Link>}
          </Grid.Unit>
        </Grid>
      </Edges>
    </InnerLayout>
  );
}

export const CollectionQuery = graphql`
  query($skip: Int!, $limit: Int!, $post_type: String!, $id: Int!) {
    posts: allWordpressWpCollections(
      filter: { post_type: { eq: $post_type } }
      skip: $skip # This was added by the plugin
      limit: $limit # This was added by the plugin
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
              }
            }
          }
        }
      }
    }

    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
    }
  }
`;
