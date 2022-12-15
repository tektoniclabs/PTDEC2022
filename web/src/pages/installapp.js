import React, { useEffect, useContext, useState } from 'react'
import IdentityContext from '../../identity-context'
import Layout from '../containers/layout'
import * as styles from '../components/styling.module.css'
import screenshot1 from '../assets/1.png'
import screenshot2 from '../assets/2.png'
import screenshot3 from '../assets/3.png'
import {
  Accordion,
  Button,
  Container,
  Icon,
  Segment,
  Grid,
  Search,
  Image,
  Divider,
} from 'semantic-ui-react'

function InstallPage() {
  // const { installable, deferredPrompt } = useContext(IdentityContext)
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  // const handleInstallClick = (e) => {
  //   // Hide the app provided install promotion
  //   // setInstallable(false)
  //   // Show the install prompt
  //   deferredPrompt.prompt()
  //   // Wait for the user to respond to the prompt
  //   deferredPrompt.userChoice.then((choiceResult) => {
  //     if (choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the install prompt')
  //       //redirect to homepage after installation
  //       if (typeof window !== `undefined`) window.location.replace(`/`)
  //     } else {
  //       console.log('User dismissed the install prompt')
  //     }
  //   })
  // }

  return (
    <Layout onShowBack={true}>
      <Container className={styles.contactForm}>
        <Segment inverted textAlign="center">
          <Divider hidden></Divider>
          <h1>Install Perfect Traveller</h1>
          <p>
            Perfectraveller.com is a webApp (sometimes called a PWA) and can be installed on almost
            any device (android, iOS, computer, other devices) as an app.
          </p>
          <Accordion inverted>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
              <Icon name="dropdown" />
              iPhone and iPad Installation
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p>
                Open perfectraveller.com in the Safari browser and tap the Share icon (the square
                with an arrow pointing out of it) at the bottom of the screen. Scroll down to the
                list of actions and tap Add to Home Screen.
                <div>
                  <Divider hidden></Divider>
                  <Grid columns="3" stackable>
                    <Grid.Column>
                      <img
                        srcSet={screenshot1}
                        className={styles.installImage}
                        alt="Perfect Traveller iphone"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <img
                        srcSet={screenshot2}
                        className={styles.installImage}
                        alt="Perfect Traveller iphone"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <img
                        srcSet={screenshot3}
                        className={styles.installImage}
                        alt="Perfect Traveller iphone"
                      />
                    </Grid.Column>
                  </Grid>
                </div>
              </p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
              <Icon name="dropdown" />
              Mac / Windows Installation
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <p>
                Google has a good help page at{' '}
                <a
                  href="https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en"
                  target="_blank"
                >
                  <strong>
                    <i>Google Installation Help</i>
                  </strong>
                </a>
              </p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
              <Icon name="dropdown" />
              Android Installation
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <div style={{ textAlign: 'justify' }}>
                <p>
                  <ol>
                    <li>Open up Google Chrome in your Android phone browser. </li>
                    <br />
                    <li>Search for perfect traveller or perfectraveller in Google Chrome.</li>
                    <br />
                    <li>
                      Open up menu (displayed as 3 dots or 3 bars at top of screen) and tap “Add to
                      home screen” or “Install App”.
                    </li>
                    <br />
                    <li>Click “Done” and close browser.</li>
                    <br />
                    <li>
                      Open the Perfect Traveller icon on home screen of your Android phone to enjoy
                      the Perfect Traveller app.
                    </li>
                    <br />
                  </ol>
                </p>
              </div>
              {/* <ul>
                  <li>On your Android device, open Chrome.</li>
                  <li>Go to a website you want to install.</li>
                  <li>Tap Add to home screen/ Install App.</li>
                  <li>Follow the onscreen instructions to install.</li>
                </ul> */}
              {/* The button below will be enabled when the app is ready to be installed and you can
                click the button to install the app. */}
              {/* <br /> */}
              {/* {
                  <button
                    disabled={!installable || deferredPrompt === undefined}
                    className={styles.installBtn}
                    onClick={handleInstallClick}
                  >
                    {installable || deferredPrompt !== undefined
                      ? 'Install App'
                      : 'Initializing...'}
                  </button>
                } */}
            </Accordion.Content>
          </Accordion>
        </Segment>
      </Container>
    </Layout>
  )
}

export default InstallPage
