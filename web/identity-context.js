import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import jwtDecode from 'jwt-decode'

const IdentityContext = React.createContext({})
export function IdentityProvider(props) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
  // Install PWA
  // const [installable, setInstallable] = useState(false)
  // const [deferredPrompt, setDeferredPrompt] = useState()

  // useEffect(() => {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     // Prevent the mini-infobar from appearing on mobile
  //     e.preventDefault()
  //     // Stash the event so it can be triggered later.
  //     setDeferredPrompt(e)
  //     // Update UI notify the user they can install the PWA
  //     setInstallable(true)
  //   })
  //   window.addEventListener('appinstalled', () => {
  //     // Log install to analytics
  //     console.log('INSTALL: Success')
  //     if (typeof window !== `undefined`) window.location.replace(`/`)
  //   })
  // }, [])

  // handle the user state on each Auth action and also on page refreshes
  const handleUserStateChange = async () => {
    setLoading(true)
    const user = netlifyIdentity.currentUser()
    // if no user found then set null
    if (!user) {
      setUser()
      setLoading(false)
      return
    }
    //get the refresh token and extract the current user data
    const token = await user.jwt(true)
    const data = jwtDecode(token)
    data.token = token
    // set the user in state
    setUser(data)
    setLoading(false)
  }

  // for making sure this is present only on clientSide
  // useEffect(() => {
  //   // netlifyIdentity?.close()
  //   netlifyIdentity.init({})
  // }, [])
  //Login Action
  netlifyIdentity.on('login', (user) => {
    handleUserStateChange()
    // setUser(user)
    netlifyIdentity.close()
  })

  // for Logout Action
  netlifyIdentity.on('logout', () => {
    setUser()
    netlifyIdentity.close()
    setLoading(false)
  })

  return (
    <IdentityContext.Provider value={{ netlifyIdentity: netlifyIdentity, user, loading }}>
      {props.children}
    </IdentityContext.Provider>
  )
}

export default IdentityContext
