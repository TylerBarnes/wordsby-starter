import React from 'react'
import { graphql } from 'gatsby'
import Grid from 'styled-components-grid'
import InnerLayout from '../../layout/InnerLayout'
import Sidebar from '../../components/Sidebar'
import Edges from '../../components/Edges'
import ShareIcons from '../../components/ShareIcons'

export default function home(props) {
  const {
    wordpressWpCollections: { post_title, post_content },
  } = props.data

  return (
    <InnerLayout>
      <Edges>
        <Grid>
          <Grid.Unit size={{ md: 1 / 5 }}>
            <Sidebar />
          </Grid.Unit>

          <Grid.Unit size={{ md: 4 / 5 }}>
            <ShareIcons />
            <h1>{post_title}</h1>
            {!!post_content && (
              <div dangerouslySetInnerHTML={{ __html: post_content }} />
            )}
          </Grid.Unit>
        </Grid>
      </Edges>
    </InnerLayout>
  )
}

export const CollectionQuery = graphql`
  query DefaultSinglePost($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      post_content
    }
  }
`
