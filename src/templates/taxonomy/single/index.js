import React from 'react'
import { graphql, Link } from 'gatsby'
import Edges from '../../../components/Edges'

export default function home(props) {
  const {
    data: {
      allWordpressWpCollections: { edges: posts },
    },
  } = props

  return (
    <Edges>
      <h1>Default Single Term template</h1>
      {!!posts &&
        posts.map(({ node: post }) => {
          return (
            <div key={post.pathname}>
              <Link to={post.pathname}>{post.post_title}</Link>
            </div>
          )
        })}
    </Edges>
  )
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
`
