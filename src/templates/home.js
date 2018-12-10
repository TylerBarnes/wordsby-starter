import React from 'react'
import { Margin } from 'styled-components-spacing'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Img from 'gatsby-image'
import Hero from '../components/Hero'
import BackgroundImage from '../components/BackgroundImage'
import Edges from '../components/Edges'
import Text from '../components/Text'
import Button from '../components/Button'
import Flex from '../components/Flex'
import InnerLayout from '../layout/InnerLayout'
import Spacer from '../components/Spacer'
import Clients from '../components/Clients'

import Reveal from '../components/animation/Reveal'
import OpacityContent from '../components/animation/OpacityContent'

import { minWidth, maxWidth } from '../utils/breakpointHelpers'

export default function home({ data }) {
  const {
    wordpressWpCollections: {
      acf: {
        hero_image: {
          localFile: {
            childImageSharp: { fluid: heroBg },
          },
        },
        hero_title,
        hero_paragraph,
        link,
        card_1_image: {
          localFile: {
            childImageSharp: { fluid: card1Image },
          },
        },
        card_1_title,
        card_1_paragraph,
        card_1_link,
        card_2_title,
        card_2_paragraph,
        card_2_link,
        card_2_image: {
          localFile: {
            childImageSharp: { fluid: card2Image },
          },
        },
      },
    },
  } = data

  return (
    <InnerLayout>
      <OpacityContent>
        <Hero height={'60vh'} fluidBg={heroBg} />

        <Edges medium>
          <Margin vertical={5}>
            <Flex mb={5}>
              <Button to={link.url}>{link.title}</Button>
              <Spacer pt={4}>
                <Text align="center">
                  <HeadlineStyles className="super-title">
                    {hero_title}
                  </HeadlineStyles>
                  <Spacer p={3} />
                  <Text fontSize="1.1rem">
                    <p style={{ margin: '0 auto' }}>{hero_paragraph}</p>
                  </Text>
                </Text>
              </Spacer>
            </Flex>
          </Margin>
        </Edges>

        <CardsContainer>
          <Edges>
            <Cards>
              <Card>
                <Reveal selector=".gatsby-image-wrapper">
                  <BackgroundImage height={'350px'}>
                    <Img fluid={card1Image} />
                  </BackgroundImage>
                </Reveal>
                <Spacer p={3} />
                <Text px={4}>
                  <h2>{card_1_title}</h2>
                  <p>{card_1_paragraph}</p>
                  <Spacer p={3} />
                  <Button to={card_1_link.url}>{card_1_link.title}</Button>
                </Text>
              </Card>

              <Card>
                <Reveal selector=".gatsby-image-wrapper">
                  <BackgroundImage height={'350px'}>
                    <Img fluid={card2Image} />
                  </BackgroundImage>
                </Reveal>
                <Spacer p={3} />
                <Text px={4}>
                  <h2>{card_2_title}</h2>
                  <p>{card_2_paragraph}</p>
                  <Spacer p={3} />
                  <Button to={card_2_link.url}>{card_2_link.title}</Button>
                </Text>
              </Card>
            </Cards>
          </Edges>
        </CardsContainer>

        <Spacer mv={4} />

        <Clients />
      </OpacityContent>
    </InnerLayout>
  )
}

const HeadlineStyles = styled.h1`
  margin: 0;
  padding: 0;
`

const CardsContainer = styled.section`
  background: #ececec;
`

const Cards = styled.div`
  ${maxWidth('md')} {
    margin-bottom: -100px;
    margin-top: 150px;
    position: relative;
    top: -100px;
  }

  ${minWidth('md')} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 200px;

    > div {
      width: calc(50% - 20px);
      transform: translateY(-120px);
    }
  }
`

const Card = styled.div`
  min-height: 180px;
  width: 100%;
  font-size: 17px;
  letter-spacing: 1.16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${maxWidth('lg')} {
    padding-bottom: 50px;
  }
`

export const query = graphql`
  query HomeTemplate($id: Int!) {
    wordpressWpCollections(wordpress_id: { eq: $id }) {
      post_title
      acf {
        hero_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        hero_title
        hero_paragraph
        link {
          title
          url
          target
        }
        card_1_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        card_1_title
        card_1_paragraph
        card_1_link {
          title
          url
          target
        }
        card_2_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
        card_2_title
        card_2_paragraph
        card_2_link {
          title
          url
          target
        }
      }
    }
  }
`
