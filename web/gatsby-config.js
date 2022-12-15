require('dotenv').config()
const {
  api: { projectId, dataset },
} = requireConfig('../studio/sanity.json')
module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.perfectraveller.com',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Perfectraveller',
        short_name: 'Perfectraveller',
        start_url: '/',
        background_color: '#1b1b1b',
        theme_color: '#353535',
        display: 'standalone',
        icon: 'src/assets/icon.png',
        cache_busting_mode: 'none',
        orientation: 'portrait',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: 'NetworkFirst',
              options: {
                networkTimeoutSeconds: 5,
              },
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\/(page-data|app-data)\.json$/,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: 'StaleWhileRevalidate',
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: 'StaleWhileRevalidate',
            },
            {
              urlPattern: /\/$/,
              handler: 'NetworkFirst',
              options: {
                networkTimeoutSeconds: 5,
              },
            },
          ],
        },
        precachePages: ['/contact', '/privacy', '/terms'],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: { '/*': ['cache-control: max-age=0,no-cache,no-store,must-revalidate'] },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-buildtime-timezone',
      options: {
        tz: 'Australia/Melbourne',
        format: 'dddd, MMMM Do YYYY, h:mm:ss a', // "Sunday, February 14th 2010, 3:25:50 pm"
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID || projectId,
        dataset: process.env.SANITY_DATASET || dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        // watchMode: true,
        // overlayDrafts: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-netlify-identity`,
    //   options: {
    //     url: `https://feature-subscription--perfectraveller.netlify.app`, // required!
    //   },
    // },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-176715822-1',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Abril Fatface',
          'Lato', // you can also specify font weights and styles
        ],
        display: 'auto',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Abril Fatface'],
          urls: ['/static/fonts/fonts.css'],
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries: require('./src/utils/algolia-queries'),
    //   },
    // },
  ],
}

/**
 * We're requiring a file in the studio folder to make the monorepo
 * work "out-of-the-box". Sometimes you would to run this web frontend
 * in isolation (e.g. on codesandbox). This will give you an error message
 * with directions to enter the info manually or in the environment.
 */

function requireConfig(path) {
  try {
    return require(path)
  } catch (e) {
    console.error(
      'Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js'
    )
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || '',
        dataset: process.env.SANITY_DATASET || '',
      },
    }
  }
}
