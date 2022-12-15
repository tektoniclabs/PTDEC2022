import { Link } from 'gatsby'
import React, { useContext } from 'react'
import { buildImageObj, cn, getStoryUrl, getTourUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-content/block-text'
import BlockContent from './block-content'
import { Button, Icon } from 'semantic-ui-react'
import * as styles from './story-preview.module.css'
import { Label, Segment, Card } from 'semantic-ui-react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Pagination } from 'semantic-ui-react'
import OverflowWrapper from 'react-overflow-wrapper'
import Collapsible from 'react-collapsible'
import IdentityContext from '../../identity-context'
const colors = ['red', 'orange', 'yellow']

function StoryPreview(props) {
  const {
    topics,
    keywords,
    type,
    fromStory,
    backURL,
    fromTours,
    searchState,
    // isLoggedIn,
    // setDialog,
  } = props

  const { user, netlifyIdentity } = useContext(IdentityContext)

  return (
    <div className={styles.root}>
      {/* <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} /> */}

      {/* <Segment
        style={{
          padding: '0',
          background: '#353535',
          borderRadius: '15px',
          border: '0px solid',
          margin: '0',
          boxShadow: '0px 0px 0px 0px',
        }}
      > */}

      {/* Stories Banner Label */}

      {props.storyType !== undefined && props.storyType === 'Text' && props.subscription ? (
        user === undefined ? (
          // Text Stories
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        ) : user.app_metadata.roles[0] === 'paid' ? (
          <Label color="green" ribbon className={styles.storySubscriptionBanner}>
            Subscribed
          </Label>
        ) : (
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        )
      ) : props.storyType !== undefined && props.storyType === 'Audio' && props.subscription ? (
        user === undefined ? (
          // Audio Stories
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        ) : user.app_metadata.roles[0] === 'paid' ? (
          <Label color="green" ribbon className={styles.storySubscriptionBanner}>
            Subscribed
          </Label>
        ) : (
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        )
      ) : props.storyType !== undefined && props.storyType === 'Video' && props.subscription ? (
        user === undefined ? (
          // Text Stories
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        ) : user.app_metadata.roles[0] === 'paid' ? (
          <Label color="green" ribbon className={styles.storySubscriptionBanner}>
            Subscribed
          </Label>
        ) : (
          <Label color="red" ribbon className={styles.storySubscriptionBanner}>
            Subscription Only
          </Label>
        )
      ) : null}

      {props.mainImage && props.mainImage.asset && (
        // {subscriptionflag ? user logged in? yes[is it paid? yes(show link)]: no(pay now) : no(signup) }
        <div className={styles.storyImage}>
          <Link
            to={
              props.subscription
                ? user === undefined
                  ? '/subscription'
                  : user.app_metadata.roles[0] === 'paid'
                  ? getStoryUrl(props.slug.current)
                  : //put stripe for here
                    '/subscription'
                : getStoryUrl(props.slug.current)
            }
            state={{
              paymentReturnLink:
                typeof window !== 'undefined'
                  ? `${window.location.origin}${getStoryUrl(props.slug.current)}`
                  : process.env.URL,
              fromTours: fromTours,
              url: backURL,
              searchState: searchState,
            }}
          >
            <GatsbyImage
              image={props.mainImage.asset.gatsbyImageData}
              alt={props.mainImage.alt}
              objectFit="cover"
              objectPosition="top"
              sizes={{ ...props.mainImage.asset.fluid, aspectRatio: 4 / 3 }}
            />
          </Link>
        </div>
      )}

      {props.storyType !== undefined ? (
        <div className={styles.topics}>
          <div className={styles.topicContainer}>
            {topics !== undefined && topics !== null
              ? topics.map((topic, index) => (
                  <li className={styles.topicText} key={index}>
                    {topic.title}
                  </li>
                ))
              : null}
          </div>
        </div>
      ) : null}
      {props.storyType !== undefined ? <h3 className={styles.title}>{props.title}</h3> : null}

      {props._rawPrecis && (
        <div className={styles.precis}>
          <BlockContent blocks={props._rawPrecis} />
        </div>
      )}
      {props.storyType !== undefined ? (
        <div className={styles.topicContainer}>
          {keywords !== undefined && keywords !== null
            ? keywords.map((keyword, index) => (
                <li className={styles.keywordText} key={index}>
                  #{keyword}
                </li>
              ))
            : null}
          {/* </OverflowWrapper> */}
          {/* </Label.Group> */}
        </div>
      ) : null}

      <div>
        <Link
          to={
            props.subscription
              ? user === undefined
                ? '/subscription'
                : user.app_metadata.roles[0] === 'paid'
                ? getStoryUrl(props.slug.current)
                : //put stripe for here
                  '/subscription'
              : getStoryUrl(props.slug.current)
          }
          state={{
            paymentReturnLink:
              typeof window !== 'undefined'
                ? `${window.location.origin}${getStoryUrl(props.slug.current)}`
                : process.env.URL,
            fromTours: fromTours,
            url: backURL,
            searchState: props.searchState,
          }}
        >
          <div className={styles.button}>
            <Button
              style={{ textTransform: 'uppercase', color: '#fff' }}
              color="black"
              inverted
              size="large"
              content={
                props.storyType === 'Text'
                  ? 'Read'
                  : props.storyType === 'Audio'
                  ? 'Listen'
                  : props.storyType === 'Video'
                  ? 'Watch'
                  : 'Browse'
              }
            ></Button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default StoryPreview
