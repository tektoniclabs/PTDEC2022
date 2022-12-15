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

function TourPreview(props) {
  const { topics, keywords, type, fromStory, backURL, fromTours, searchState, excerpt } = props
  const { user, netlifyIdentity } = useContext(IdentityContext)

  return (
    <div className={styles.tourContainer}>
      {props.storyType !== undefined ? null : props.subscription ? (
        user === undefined ? (
          // Paid Tours
          <Label color="red" ribbon className={styles.tourSubscriptionBanner}>
            Subscription Tour{' '}
          </Label>
        ) : user.app_metadata.roles[0] === 'paid' ? (
          <Label color="green" ribbon className={styles.tourSubscriptionBanner}>
            Subscription Tour{' '}
          </Label>
        ) : (
          <Label color="red" ribbon className={styles.tourSubscriptionBanner}>
            Subscription Tour{' '}
          </Label>
        )
      ) : user === undefined ? (
        <Label
          color=""
          ribbon
          className={styles.tourSubscriptionBannerFree}
          styles={{ fontWeight: 'bold' }}
        >
          Free Tour
        </Label>
      ) : user.app_metadata.roles[0] === 'paid' ? (
        <Label color="green" ribbon className={styles.tourSubscriptionBanner}>
          Free Tour
        </Label>
      ) : (
        <Label ribbon className={styles.tourSubscriptionBannerFree}>
          Free Tour
        </Label>
      )}

      {props.mainImage && props.mainImage.asset && (
        <div className={styles.tourImage}>
          <Link
            to={
              props.subscription
                ? user === undefined
                  ? '/subscription'
                  : user.app_metadata.roles[0] === 'paid'
                  ? getTourUrl(props.slug.current)
                  : //put stripe for here
                    '/subscription'
                : getTourUrl(props.slug.current)
            }
            state={{
              paymentReturnLink:
                typeof window !== 'undefined'
                  ? `${window.location.origin}${getTourUrl(props.slug.current)}`
                  : process.env.URL,
              fromStory: fromStory,
              url: backURL,
              searchState: searchState,
            }}
          >
            <GatsbyImage
              image={props.mainImage.asset.gatsbyImageData}
              alt={props.mainImage.alt}
              className={styles.image}
              objectFit="cover"
              objectPosition="top"
              sizes={{ ...props.mainImage.asset.fluid, aspectRatio: 4 / 3 }}
            />
          </Link>
        </div>
      )}

      <div className={styles.tourContent}>
        <h3 className={styles.tourTitle}>{props.title}</h3>
        <div>
          <Link
            to={
              props.subscription
                ? user === undefined
                  ? '/subscription'
                  : user.app_metadata.roles[0] === 'paid'
                  ? getTourUrl(props.slug.current)
                  : //put stripe for here
                    '/subscription'
                : getTourUrl(props.slug.current)
            }
            state={{
              paymentReturnLink:
                typeof window !== 'undefined'
                  ? `${window.location.origin}${getTourUrl(props.slug.current)}`
                  : process.env.URL,
              fromStory: fromStory,
              url: backURL,
              searchState: searchState,
            }}
          >
            {' '}
            <div className={styles.tourButton}>
              <Button
                style={{ textTransform: 'uppercase', color: '#fff' }}
                color="black"
                inverted
                size="medium"
                content="Browse"
              ></Button>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.tourDescription}>{excerpt}</div>
    </div>
  )
}

export default TourPreview
