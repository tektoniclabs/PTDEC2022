import React, { useContext } from 'react'
import { graphql } from 'gatsby'
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

const ThankYou = (props) => {
  const { user, netlifyIdentity } = useContext(IdentityContext)
  return (
    <Layout onShowBack={true}>
      <Container>
        <Segment inverted textAlign="center">
          <Header as="h1" style={{ color: '#fff !important' }}>
            Thank you for your message{' '}
          </Header>
          <p>
            Your message has been sent successfully. Someone from our team will contact you shortly.
          </p>
        </Segment>
      </Container>
    </Layout>
  )
}

export default ThankYou
