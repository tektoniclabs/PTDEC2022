const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

//  for adding SemanticUI
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: { '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config') },
    },
  })
}

async function createStoryPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityStory {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityStory || {}).edges || []

  projectEdges.forEach((edge) => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/story/${slug}/`

    reporter.info(`Creating Story page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/story.js'),
      context: { id },
    })
  })
}

async function createTourPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityTour {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityTour || {}).edges || []

  projectEdges.forEach((edge) => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/tour/${slug}/`

    reporter.info(`Tour ID: ${id}`)
    reporter.info(`Creating Tour page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/tour.js'),
      context: { id },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createStoryPages(graphql, actions, reporter)
  await createTourPages(graphql, actions, reporter)
}
