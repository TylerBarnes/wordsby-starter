import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import InnerLayout from '../layout/InnerLayout'
import Mapbox from '../components/Mapbox/Mapbox'

export default function contact(props) {
  const {
    wordpressWpCollections: {
      acf: {
        image: {
          localFile: {
            childImageSharp: { fluid },
          },
        },
        locations,
      },
    },
  } = props.data

  return (
    <InnerLayout>
      <Img fluid={fluid} />

      <Mapbox locations={locations} />
    </InnerLayout>
  )
}

export const CollectionQuery = graphql`
  query ContactTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      acf {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        locations {
          title
          phone
          location {
            lat
            lng
            address
          }
        }
      }
    }
  }
`
