import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      mainImage {
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
      keywords
      author
    }
  }
`

function SEO({ description, lang, meta, image: metaImage, keywords = [], title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        if (!data.site) {
          return
        }
        const metaDescription = description || data.site.description

        const image = metaImage && metaImage.src ? `${metaImage.src}` : null

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={title === data.site.title ? '%s' : `%s | ${data.site.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
                metaImage
                  ? [
                      {
                        name: 'image',
                        property: 'og:image',
                        content: image,
                      },
                      {
                        property: 'og:image:width',
                        content: '1200',
                      },
                      {
                        property: 'og:image:height',
                        content: '628',
                      },
                      {
                        name: 'twitter:card',
                        content: 'summary_large_image',
                      },
                    ]
                  : [
                      {
                        name: 'twitter:card',
                        content: 'summary',
                      },
                    ]
              )
              .concat(meta)}
          >
            <meta name="description" content={metaDescription} />
            <meta name="image" content={image} />
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content="https://perfectraveller.com" />  */}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    // height: PropTypes.number.isRequired,
    // width: PropTypes.number.isRequired,
  }),
}

export default SEO
