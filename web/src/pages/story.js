import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import StoryPreviewGrid from '../components/story-preview-grid'
import GraphQLErrorList from '../components/graphql-error-list'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Button, Container, Icon, Segment, Grid, Search } from 'semantic-ui-react'
import Layout from '../containers/layout'
import { Header } from 'semantic-ui-react'
import Checkout from '../components/checkout'
import CreateCustomerForm from '../components/stripe/customer'
export const query = graphql`
  query StoryPageQuery {
    posts: allSanityStory(limit: 12, sort: { fields: [embargoedUntil], order: DESC }) {
      edges {
        node {
          id
          reviewedAt
          embargoedUntil
          mainImage {
            asset {
              _id
              gatsbyImageData
              # fluid(maxWidth: 600) {
              #   ...GatsbySanityImageFluid_withWebp
              # }
            }
          }
          title
          _rawPrecis
          storyType
          slug {
            current
          }
        }
      }
    }
  }
`

const StoryPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const storyNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout onShowBack={true}>
      <Container>
        {storyNodes && storyNodes.length > 0 && <StoryPreviewGrid nodes={storyNodes} />}
        <CreateCustomerForm />
        <Checkout />
      </Container>
    </Layout>
  )
}

export default StoryPage
