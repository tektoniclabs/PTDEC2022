import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../containers/layout'
import * as styles from '../components/styling.module.css'

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

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
    }
  }
`

const ContactPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data.page

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  return (
    <Layout onShowBack={true}>
      <Container className={styles.contactForm}>
        <Header as="h1" style={{ color: '#fff !important' }}>
          {page.title}
        </Header>

        {/* Description text via CMS */}
        <BlockContent blocks={page._rawBody || []} />

        {/* Contact Form  */}

        <Segment inverted>
          <form
            action="/thankyou"
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            style={{ marginLeft: '-17px' }}
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <div className="field half first">
              <label className={styles.formLbl} htmlFor="name">
                Name
              </label>
              <input className={styles.formField} type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label className={styles.formLbl} htmlFor="email">
                Email
              </label>
              <input className={styles.formField} type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label className={styles.formLbl} htmlFor="message">
                Message
              </label>
              <textarea className={styles.formField} name="message" id="message" rows="6" />
            </div>
            <ul style={{ display: 'flex', justifyContent: 'center', padding: '0' }}>
              <li className={styles.formBtnLi}>
                <input className={styles.formBtn} type="submit" value="Send Message" />
              </li>
              <li className={styles.formBtnLi}>
                <input className={styles.formBtn} type="reset" value="Clear" />
              </li>
            </ul>
          </form>
        </Segment>
      </Container>
    </Layout>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title',
    },
  },
}
export default ContactPage
