const indexName = `stories`

const pageQuery = `
  {
    stories: allSanityStory {
      edges {
        node {
          id
          title
          topics {
            title
          }
          keywords
          locations {
            title
          }
          metaDescription
          _rawPrecis
          storyType
          slug {
            current
          }
        }
      }
    }

    locations:allSanityLocation {
        nodes {
          title
        }
    }

  }
`

function pageToAlgoliaRecord({ node: { id, title, topics, keywords, locations, ...rest } }) {
  return {
    objectID: id,
    title: title,
    topics: topics,
    keywords: keywords,
    locations: locations,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => {
      // for removing locations from keywords
      var locations = data.locations.nodes.map((item) => item.title)
      data.stories.edges.map((story) => {
        story.node.keywords = story.node.keywords.filter(
          (keyword) =>
            !locations.some((location) => location.toLowerCase() == keyword.toLowerCase())
        )
      })
      return data.stories.edges.map(pageToAlgoliaRecord)
    },
    indexName,
    settings: {
      searchableAttributes: ['keywords', 'topics.title'],
      attributesForFaceting: ['locations.title'],
    },
  },
]

module.exports = queries
