import { format } from 'date-fns'

export function cn(...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map((edge) => edge.node)
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current
}

export function getStoryUrl(slug) {
  return `/story/${slug.current || slug}/`
}
export function getTourUrl(slug) {
  return `/tour/${slug.current || slug}/`
}
export function getYoutubeTag(url) {
  var tag
  if (url !== undefined)
    if (url.length > 0) {
      var queryString = url.split('=')[1]
      tag = queryString
      if (tag === undefined) {
        var splitUrl = url.split('/')
        tag = splitUrl[4]
      }
    }
  return tag
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function buildSanityImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
    fluid: source.asset.fluid,
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj.fluid
}

export function buildAuthorImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset.id },
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}
