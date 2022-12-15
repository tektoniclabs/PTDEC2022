import { graphql, StaticQuery } from 'gatsby'
import React, { useContext, useState, useEffect } from 'react'
import Layout from '../components/hoc/layout/layout'
import IdentityContext from '../../identity-context'
const query = graphql`
  query SiteTitleQuery {
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
    buildtime: site {
      buildTimeZone
    }
    companyInfo: sanityCompanyInfo(_id: { regex: "/(drafts.|)companyInfo/" }) {
      name
      address1
      address2
      zipCode
      city
      country
    }
  }
`

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false)
  const { user, loading, netlifyIdentity } = useContext(IdentityContext)
  function handleShowNav() {
    setShowNav(true)
  }
  function handleHideNav() {
    setShowNav(false)
  }
  useEffect(() => {
    // netlifyIdentity?.close()
    netlifyIdentity.init({})
  }, [])

  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }
        if (!data.companyInfo) {
          throw new Error(
            'Missing "Company info". Open the studio at http://localhost:3333 and add "Company info" data'
          )
        }
        return (
          <Layout
            {...props}
            showNav={showNav}
            buildTime={data.buildtime.buildTimeZone}
            companyInfo={data.companyInfo}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
          />
        )
      }}
    />
  )
}

export default LayoutContainer
