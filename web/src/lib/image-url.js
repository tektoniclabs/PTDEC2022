import sanityConfig from '../../../studio/sanity.json'
import imageUrlBuilder from '@sanity/image-url'

var builder
if (process.env.GATSBY_SANITY_DATASET) {
  builder = imageUrlBuilder({
    projectId: 'k3ih81r6',
    dataset: process.env.GATSBY_SANITY_DATASET,
  })
} else if (process.env.GATSBY_SANITY_DATASET !== undefined) {
  builder = imageUrlBuilder({
    projectId: 'k3ih81r6',
    dataset: process.env.GATSBY_SANITY_DATASET,
  })
} else {
  builder = imageUrlBuilder(sanityConfig.api)
}
export function imageUrlFor(source) {
  return builder.image(source)
}
