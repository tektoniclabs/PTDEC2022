/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('typeface-abril-fatface')
require('typeface-lato')

// You can delete this file if you're not using it
const { IdentityProvider } = require('./identity-context')
const React = require('react')
// import { Provider } from './identity-context'

// On any route change check for updated online version of the SW
export const onRouteUpdate = () => {
  navigator?.serviceWorker?.register('/sw.js').then((reg) => {
    reg.update()
  })
}

export const onServiceWorkerUpdateReady = () => {
  // window.location.reload()
  // window.location.replace(window.location.href)
  const url = `${window.location.href}/`
  window.location.href = url
}

export function wrapPageElement({ element, props }) {
  return <IdentityProvider {...props}>{element}</IdentityProvider>
}
