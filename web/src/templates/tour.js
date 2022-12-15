import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'semantic-ui-react'
import GraphQLErrorList from '../components/graphql-error-list'
import Tour from '../components/tour/tour'
import Layout from '../containers/layout'

export const query = graphql`
  query TourTemplateQuery($id: String!) {
    sanityTour(id: { eq: $id }) {
      _rawBody
      _rawTips
      title
      _id
      slug {
        current
      }
      author {
        id
        _rawBio
        image {
          _key
          _type
          alt

          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          asset {
            id
            gatsbyImageData
            # fluid(maxWidth: 1960) {
            #  ...GatsbySanityImageFluid_withWebp
            # }
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
        }
        name
        nickname
      }
      excerpt
      keywords
      id
      reviewedAt
      embargoedUntil
      _updatedAt
      topics {
        id
        description
        title
      }
      mainImage {
        _key
        _type
        alt
        asset {
          id
          _id
          gatsbyImageData
          # fluid(maxWidth: 1960) {
          #   ...GatsbySanityImageFluid_withWebp
          # }
        }
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
      }
      address {
        name
        street
      }
      locations {
        id
        description
        title
      }
      imageCarousel {
        imagesCarousel {
          alt
          caption
          asset {
            id
            _id
            gatsbyImageData
            # fluid(maxWidth: 1960) {
            #   ...GatsbySanityImageFluid_withWebp
            # }
          }
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
        }
        title
      }
      subscription
      tourType
      video
      audio {
        asset {
          id
          url
        }
      }
      transcript
      duration
      stories {
        id
        title
        storyType
        subscription
        mainImage {
          _key
          _type
          alt
          asset {
            id
            gatsbyImageData
            # fluid(maxWidth: 1960) {
            #   ...GatsbySanityImageFluid_withWebp
            # }
          }
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
        }
        _rawPrecis
        keywords
        topics {
          id
          description
          title
        }
        slug {
          current
        }
      }
    }
  }
`

const TourTemplate = (props) => {
  const { data, errors, location } = props
  const sanityTour = data && data.sanityTour
  // for handling back when tour page is reached after clicking on a featured tour card from Story Page
  const fromStory =
    location.state && location.state.fromStory !== undefined ? location.state.fromStory : false
  const storyURL = location.state && location.state.url !== undefined ? location.state.url : null
  const searchState = location.state ? location.state.searchState : null
  return (
    <Layout
      onShowBack={true}
      onHideMenu={true}
      fromStory={fromStory}
      storyURL={storyURL}
      searchState={searchState}
    >
      {/* {errors && <SEO title="GraphQL Error" />} */}
      {/* {sanityTour && <SEO title={sanityTour.title || 'Untitled'} />} */}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {sanityTour && <Tour {...sanityTour} searchState={searchState} />}
    </Layout>
  )
}

export default TourTemplate
