import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import TeamGrid from '../components/TeamGrid'
import Edges from '../components/Edges'
import InnerLayout from '../layout/InnerLayout'
import ModalComponent from '../components/Modal'
import styled from 'styled-components'
import bluePaper from '../images/blue-paper.jpg'
import Spacer from '../components/Spacer'

export default function about(props) {
  const {
    wordpressWpCollections: {
      acf: {
        about_headline,
        about_video_background: {
          localFile: {
            childImageSharp: { fluid: videoBg },
          },
        },
        about_paragraph,
        video_url,
        video_subtext,
        team_member_headline,
      },
    },
    allWordpressWpCollections: { edges: team },
  } = props.data

  return (
    <InnerLayout>
      <Edges medium>
        <Spacer pt={6} pb={5}>
          <TitleStyles className={'super-title'}>{about_headline}</TitleStyles>
        </Spacer>
      </Edges>

      <Edges small>{about_paragraph}</Edges>

      <VideoSectionStyles>
        <Edges medium>
          <ModalComponent link={video_url}>
            <VideoSectionImageStyles>
              <Img fluid={videoBg} />
            </VideoSectionImageStyles>
          </ModalComponent>
        </Edges>
        <Edges>
          <VideoSectionTextStyles className={'super-title'}>
            {video_subtext}
          </VideoSectionTextStyles>
        </Edges>
      </VideoSectionStyles>

      <Spacer p={4}>
        <TeamGridHeadlineStyles>{team_member_headline}</TeamGridHeadlineStyles>
      </Spacer>

      <TeamGrid team={team} />
    </InnerLayout>
  )
}

const TitleStyles = styled.h1`
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
`

const VideoSectionStyles = styled.section`
  background-image: url('${bluePaper}');
  margin-top: 200px;
  padding-bottom: 150px;
`

const VideoSectionImageStyles = styled.section`
  position: relative;
  margin: auto;
  transform: translateY(-100px);
  box-shadow: 0 30px 50px 0 rgba(0, 0, 0, 0.5);

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: -40px;
    width: 100px;
    height: calc(100% + 80px);
    border-color: black;
    border-style: solid;
  }

  &:before {
    left: -50px;
    border-width: 7px 0 7px 7px;
  }

  &:after {
    right: -50px;
    border-width: 7px 7px 7px 0;
  }
`

const VideoSectionTextStyles = styled.h1`
  width: 100%;
  text-align: center;
  color: white;
`

const TeamGridHeadlineStyles = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0;
`

export const CollectionQuery = graphql`
  query AboutTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      acf {
        about_headline
        about_paragraph
        about_video_background {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        video_url
        video_subtext
        team_member_headline
      }
    }
    allWordpressWpCollections(filter: { post_type: { eq: "team" } }) {
      edges {
        node {
          post_title
          acf {
            job_description
            text
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
