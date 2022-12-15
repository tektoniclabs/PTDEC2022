import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'semantic-ui-react'
import GraphQLErrorList from '../components/graphql-error-list'
import Story from '../components/story/story'
import SEO from '../components/hoc/seo/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query StoryTemplateQuery($id: String!) {
    sanityStory(id: { eq: $id }) {
      _rawBody
      _rawTips
      title
      _id
      subscription
      slug {
        current
      }
      _rawPrecis
      author {
        id
        _rawBio
        image {
          _key
          _type

          alt
          caption
          attribution
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
            # fluid(maxWidth: 100) {
            #   ...GatsbySanityImageFluid_withWebp
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
      locations {
        id
        description
        title
      }
      metaDescription
      mainImage {
        _key
        _type
        alt
        attribution
        asset {
          id
          _id
          gatsbyImageData
          # fluid(maxWidth: 1960) {
          #    ...GatsbySanityImageFluid_withWebp
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
      imageCarousel {
        imagesCarousel {
          alt
          caption
          attribution
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
      storyType
      video
      audio {
        asset {
          id
          url
        }
      }
      transcript
      duration
    }

    allSanityTour(filter: { stories: { elemMatch: { id: { eq: $id } } } }) {
      nodes {
        id
        title
        subscription
        excerpt
        slug {
          current
        }
        mainImage {
          alt
          attribution
          _key
          _type
          asset {
            id
            gatsbyImageData
            # fluid(maxWidth: 1960) {
            #   ...GatsbySanityImageFluid_withWebp
            # }
          }
        }
      }
    }
  }
`

const StoryTemplate = (props) => {
  const { data, errors, location } = props
  const sanityStory = data && data.sanityStory
  const sanityTour = data && data.allSanityTour.nodes
  const fromTours =
    location.state && location.state.fromTours !== undefined ? location.state.fromTours : false
  const storyURL = location.state && location.state.url !== undefined ? location.state.url : null
  const searchState = location.state ? location.state.searchState : null
  return (
    <Layout
      onShowBack={true}
      onHideMenu={true}
      backFromTours={fromTours}
      storyURL={storyURL}
      searchState={searchState}
    >
      {errors && <SEO title="GraphQL Error" />}
      {sanityStory &&
        sanityStory.title &&
        sanityStory.metaDescription &&
        sanityStory.keywords &&
        sanityStory.mainImage && (
          <SEO
            title={sanityStory.title || 'Untitled'}
            description={sanityStory.metaDescription || 'Untitled'}
            keywords={sanityStory.keywords || 'Untitled'}
            image={sanityStory.mainImage.asset.fluid}
          />
        )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {sanityStory && (
        <Story
          {...sanityStory}
          tours={sanityTour}
          onShowBack={true}
          onHideMenu={true}
          backFromTours={fromTours}
          storyURL={storyURL}
          searchState={searchState}
        />
      )}
    </Layout>
  )
}

export default StoryTemplate
