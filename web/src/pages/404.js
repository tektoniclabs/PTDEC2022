import React from 'react'
import Layout from '../containers/layout'
import { Button, Container, Icon, Segment, Grid, Search, Image } from 'semantic-ui-react'

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>Not found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
)

export default NotFoundPage
