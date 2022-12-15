import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../containers/layout'
import * as styles from '../components/styling.module.css'
import { navigate } from 'gatsby'

import {
  Button,
  Transition,
  Container,
  Modal,
  Grid,
  Form,
  Segment,
  Label,
  Header,
} from 'semantic-ui-react'
import IdentityContext from '../../identity-context'

const EmailVerified = (props) => {
  const { user, loading, netlifyIdentity } = useContext(IdentityContext)
  return (
    <Layout>
      <Container>
        <Segment inverted textAlign="center">
          {loading ? (
            <Header as="h1" style={{ color: '#fff !important' }}>
              Loading...
            </Header>
          ) : (
            <>
              <Header as="h1" style={{ color: '#fff !important' }}>
                Email Verified{' '}
              </Header>
              <p>Your email has been verified successfully.</p>

              <Button
                color="grey"
                size="medium"
                className={styles.memberBtn}
                aria-label="buttonOpen"
                type="button"
                onClick={() => {
                  netlifyIdentity.open()
                }}
              >
                Login
              </Button>
            </>
          )}

          {/* If user has logged in */}
          {user !== undefined ? (
            // If user is a member (Free)
            <>
              {netlifyIdentity.close()}
              {console.log('closing the dialog')}
              {navigate('/subscription')}
            </>
          ) : null}
        </Segment>
      </Container>
    </Layout>
  )
}

export default EmailVerified
