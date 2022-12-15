import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, getYoutubeTag } from '../lib/helpers'
import StoryPreviewGrid from '../components/story-preview-grid'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/hoc/seo/seo'
import * as styles from '../components/styling.module.css'
import Layout from '../containers/layout'
import { GatsbyImage } from 'gatsby-plugin-image'
import imglogo from '../assets/logo.png'
import SearchHome from '../components/search/Home'
import {
  Button,
  Transition,
  Container,
  Modal,
  Grid,
  Segment,
  Label,
  Header,
} from 'semantic-ui-react'
import { imageUrlFor } from '../lib/image-url'

const searchIndices = [{ name: `stories`, title: `stories` }]
export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      mainImage {
        alt
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
        asset {
          _id
          gatsbyImageData
          # fluid(maxWidth: 1960) {
          #   ...GatsbySanityImageFluid_withWebp
          # }
        }
      }
      featuredVideo
      keywords
    }

    stories: allSanityStory(sort: { fields: _updatedAt, order: DESC }) {
      edges {
        node {
          id
          slug {
            current
          }
          mainImage {
            alt
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
            asset {
              _id
              gatsbyImageData
              # fluid(maxWidth: 1960) {
              #   ...GatsbySanityImageFluid_withWebp
              # }
            }
          }
          locations {
            title
          }
          title
          topics {
            id
            title
          }
          _rawPrecis
          metaDescription
          storyType
          keywords
          subscription
          _updatedAt
        }
      }
      group(field: locations___title, limit: 1) {
        fieldValue
      }
    }

    tours: allSanityTour(sort: { fields: _updatedAt, order: DESC }) {
      edges {
        node {
          id
          slug {
            current
          }
          mainImage {
            alt
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
            asset {
              _id
              gatsbyImageData
              # fluid(maxWidth: 1960) {
              #   ...GatsbySanityImageFluid_withWebp
              # }
            }
          }
          title
          topics {
            id
            title
          }
          excerpt
          keywords
          subscription
          _updatedAt
        }
      }
    }

    locations: allSanityLocation {
      nodes {
        title
      }
    }
  }
`

const IndexPage = (props) => {
  const { data, errors, location } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  var locations = data.stories.group.map((item, index) => ({
    key: index,
    text: item.fieldValue,
    value: item.fieldValue,
  }))

  const site = (data || {}).site
  var storyNodes = data.stories
    ? mapEdgesToNodes(data.stories).filter(filterOutDocsWithoutSlugs)
    : []
  var tourNodes = data.tours ? mapEdgesToNodes(data.tours).filter(filterOutDocsWithoutSlugs) : []

  // for getting the keywords and topics for filtering/search
  var searchTags = []
  storyNodes.forEach((story) => {
    story.keywords.forEach((keyword) => searchTags.push(keyword.toLowerCase()))
    story.topics.forEach((topic) => searchTags.push(topic.title.toLowerCase()))
  })
  // keep only the unique searchtags and Filter for removing locations from search tags
  searchTags = searchTags
    .filter((item, i, ar) => ar?.indexOf(item) === i)
    .filter((item) => !locations.some((location) => location.text.toLowerCase() === item))
    .sort()

  // create an array for searchTags
  var searchTags = searchTags.map((item, index) => ({
    key: index,
    text: item,
    value: item,
  }))
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        image={site.mainImage.asset.fluid}
      />

      {/* This uses Image Sharp and Gatsby Image */}
      <div className={styles.headerImage}>
        <div className={styles.overlay}>
          <GatsbyImage
            image={site.mainImage.asset.gatsbyImageData}
            alt={site.mainImage.alt}
            className={styles.image}
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </div>
        <div className={styles.logo}>
          <img srcSet={imglogo} className={styles.imageLogo} alt="Perfect Traveller Logo" />
        </div>

        <Header as="h1" className={styles.text}>
          {site.description}
        </Header>

        <Modal
          size="large"
          basic
          centered={true}
          closeIcon
          trigger={
            <Button
              size="massive"
              inverted
              circular
              color="black"
              icon="play"
              className={styles.btn}
            ></Button>
          }
        >
          <Modal.Content>
            <iframe
              width="100%"
              height="650px"
              // src={`https://www.youtube.com/embed/PBvdRJmt_hs`}
              src={`https://www.youtube.com/embed/${getYoutubeTag(site.featuredVideo)}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Modal.Content>
        </Modal>
      </div>

      {/* Search */}
      <Container>
        {/* Search */}
        {typeof window !== `undefined` && storyNodes && tourNodes && locations.length > 0 ? (
          <SearchHome
            searchState={location.state && location.state.searchState}
            searchTags={searchTags}
            locations={locations}
            nodes={storyNodes}
            tourNodes={tourNodes}
          />
        ) : null}
      </Container>
      {/* {typeof window !== `undefined` && storyNodes && tourNodes && (
        <StoryPreviewGrid nodes={storyNodes} tourNodes={tourNodes} />
      )} */}
    </Layout>
  )
}

export default IndexPage
