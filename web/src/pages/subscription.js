import React, { useEffect, useContext } from 'react'
import { graphql, navigate } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import StoryPreviewGrid from '../components/story-preview-grid'
import GraphQLErrorList from '../components/graphql-error-list'
import * as styles from '../components/styling.module.css'
import imgheader from '../assets/italy.jpg'
import imglogo from '../assets/logo.png'
import { Button, Container, Header, Icon, Divider, Segment, Grid, Search } from 'semantic-ui-react'
import Layout from '../containers/layout'
import Checkout from '../components/checkout'
import IdentityContext from '../../identity-context'
import { getStripe } from '../components/stripe/stripeWrapper'

const SubscriptionPage = (props) => {
  const { user, netlifyIdentity, loading } = useContext(IdentityContext)
  // netlifyIdentity?.close()
  return (
    <>
      <Layout onShowBack={true}>
        <div className={styles.subscriptionHeaderImage}>
          {/* <div className={styles.overlay}> */}
          <img srcSet={imgheader} className={styles.subscriptionImage} alt="Subscription Banner" />

          {/* </div> */}
          <div className={styles.logo}>
            <img
              srcSet={imglogo}
              height="200"
              className={styles.imageLogo}
              alt="Perfect Traveller Logo"
            />
          </div>
        </div>
        <Container className={styles.subscription} fluid>
          {/* <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} /> */}

          <Segment
            fluid
            inverted
            textAlign="center"
            padded="very"
            className={styles.subscriptionContainer}
          >
            {loading ? (
              <h2>Loading...</h2>
            ) : /* If user has logged in */
            user !== undefined ? (
              // If user is a member (Free)
              user.app_metadata.roles[0] === 'free' ? (
                <div>
                  {/* If user is a member (Free) => Stripe's Customer Portal  */}
                  {/* <Header as="h2">
                    Hello {user.user_metadata.full_name} */}
                  {/* <div style={{ marginTop: '0rem' }}></div> */}
                  {/* <Divider hidden></Divider> */}
                  {/* </Header> */}
                  {/* <p>
                      You are signed in as a Member of the Perfect Traveller community. Thank you
                      for your participation and interest in our Stories, Tours and the App. As a
                      Member you will receive regular notifications about new content, special deals
                      and introductions to friends of the App.
                    </p> */}
                  {/* <Divider hidden></Divider> */}
                  <h2>SUBSCRIBE TO PERFECT TRAVELLER</h2>
                  <Button
                    color="black"
                    inverted
                    size="medium"
                    className={styles.defaultBtn}
                    aria-label="buttonOpen"
                    type="button"
                    onClick={() => {
                      fetch('/.netlify/functions/create-manage-link', {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                          'Content-Type': 'text/plain;charset=utf-8',
                        },
                        body:
                          props.location.state?.paymentReturnLink !== undefined
                            ? props.location.state.paymentReturnLink
                            : typeof window !== 'undefined'
                            ? window.location.origin
                            : process.env.URL,
                      })
                        .then((res) => res.json())
                        .then((link) => {
                          window.location.href = link
                        })
                        .catch((err) => console.error(err))
                    }}
                  >
                    Subscribe Now{' '}
                  </Button>
                  <Divider hidden></Divider>
                  <p>
                    A monthly paid subscription of AU $4.95 to Perfect Traveller allows immediate
                    access to every story and all the tours, including all the new exciting and
                    informative content as it’s published without limit. An annual subscription is
                    also available
                  </p>

                  <Divider hidden></Divider>

                  <p>
                    You can follow us on your preferred social media platform for more opportunities
                    to interact with other Perfect Traveller’s.
                  </p>
                  <div className={styles.social}>
                    <a
                      href="https://www.facebook.com/Perfect-Traveller-Pty-Ltd-171235276220004"
                      target="_blank"
                    >
                      <Icon name="facebook f" circular size="large" inverted></Icon>
                    </a>
                    <a href="https://twitter.com/perfectraveller" target="_blank">
                      <Icon name="twitter" circular size="large" inverted></Icon>
                    </a>
                    <a href="https://www.instagram.com/perfect.traveller/" target="_blank">
                      <Icon name="instagram" circular size="large" inverted></Icon>
                    </a>
                    <a href="https://www.youtube.com/user/Perfectraveller/" target="_blank">
                      <Icon name="youtube" circular size="large" inverted></Icon>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  {/* If user is a subscriber (Paid) */}
                  {props.location.state?.paymentReturnLink !== undefined ? (
                    navigate(`${props.location.state.paymentReturnLink}`)
                  ) : (
                    <>
                      <Header as="h1">
                        Hello {user.user_metadata.full_name}
                        {/* <div style={{ marginTop: '0rem' }}></div> */}
                        <br></br>
                      </Header>
                      <p>
                        As a subscriber you have full access to all of Perfect Traveller's stories,
                        tours and more!
                      </p>

                      {/* <p>Current Plan: Paid</p> */}
                      <Button
                        color="black"
                        inverted
                        size="medium"
                        className={styles.manageBtn}
                        aria-label="buttonOpen"
                        type="button"
                        onClick={() => {
                          fetch('/.netlify/functions/create-manage-link', {
                            method: 'POST',
                            headers: {
                              Authorization: `Bearer ${user.token}`,
                              'Content-Type': 'text/plain;charset=utf-8',
                            },
                            body:
                              props.location.state?.paymentReturnLink !== undefined
                                ? props.location.state.paymentReturnLink
                                : typeof window !== 'undefined'
                                ? window.location.origin
                                : process.env.URL,
                          })
                            .then((res) => res.json())
                            .then((link) => {
                              window.location.href = link
                            })
                            .catch((err) => console.error(err))
                        }}
                      >
                        Manage Subscription{' '}
                      </Button>
                    </>
                  )}
                </div>
              )
            ) : (
              <div>
                <Header as="h1" className={styles.paraTitle}>
                  Become a Perfect Traveller
                </Header>

                <Divider hidden></Divider>
                <p style={{ maxWidth: '' }}>
                  Join Perfect Traveller now and enjoy access to all the exciting and informative
                  content and special deals.
                </p>

                <Button
                  color="black"
                  inverted
                  size="medium"
                  className={styles.defaultBtn}
                  aria-label="buttonOpen"
                  type="button"
                  onClick={() => {
                    netlifyIdentity.open('signup')
                  }}
                >
                  Register Now
                </Button>

                <Divider hidden></Divider>
                <p>If you are already a Perfect Traveller (Registered or a Subscriber)</p>
                <Button
                  color="grey"
                  size="large"
                  compact={true}
                  className={styles.memberBtn}
                  aria-label="buttonOpen"
                  type="button"
                  onClick={() => {
                    netlifyIdentity.open()
                  }}
                >
                  Login
                </Button>

                <Divider hidden></Divider>
                <p>
                  You can follow us on your preferred social media platform for more opportunities
                  to interact with other Perfect Traveller’s.
                </p>
                <div className={styles.social}>
                  <a
                    href="https://www.facebook.com/Perfect-Traveller-Pty-Ltd-171235276220004"
                    target="_blank"
                  >
                    <Icon name="facebook f" circular size="large" inverted></Icon>
                  </a>
                  <a href="https://twitter.com/perfectraveller" target="_blank">
                    <Icon name="twitter" circular size="large" inverted></Icon>
                  </a>
                  <a href="https://www.instagram.com/perfect.traveller/" target="_blank">
                    <Icon name="instagram" circular size="large" inverted></Icon>
                  </a>
                  <a href="https://www.youtube.com/user/Perfectraveller/" target="_blank">
                    <Icon name="youtube" circular size="large" inverted></Icon>
                  </a>
                </div>
                {/* <Button
                  color="grey"
                  size="medium"
                  className={styles.memberBtn}
                  aria-label="buttonOpen"
                  type="button"
                  onClick={() => {
                    netlifyIdentity.open()
                  }}
                >
                  Already a member? Login
                </Button> */}
              </div>
            )}
          </Segment>
        </Container>
      </Layout>
    </>
  )
}

export default SubscriptionPage
