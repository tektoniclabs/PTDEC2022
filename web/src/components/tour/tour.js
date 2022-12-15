import { format, distanceInWords, differenceInDays } from 'date-fns'
import React, { useContext } from 'react'
import { buildImageObj, buildAuthorImageObj, getYoutubeTag, getTourUrl } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import BlockContent from '../block-content'
import BlockText from '../block-content/block-text'
import 'pure-react-carousel/dist/react-carousel.es.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import OverflowWrapper from 'react-overflow-wrapper'
import { GatsbyImage } from 'gatsby-plugin-image'
import SEO from '../../components/hoc/seo/seo'
import StoryGrid from './storyGrid'

import * as styles from './tour.module.css'
import cn from 'classnames'
import Collapsible from 'react-collapsible'
import { rhap_container, rhap_time } from 'react-h5-audio-player/lib/styles.css'
import {
  Container,
  Segment,
  Label,
  Popup,
  Grid,
  Divider,
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react'
import AudioPlayer from 'react-h5-audio-player'
import { Link, navigate } from 'gatsby'
import imglogo from '../../assets/logo.png'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import Masonry from 'react-masonry-css'
import Social from '../story/social'
import IdentityContext from '../../../identity-context'
import 'react-h5-audio-player/lib/styles.css'
import SubscriptionPage from '../../pages/subscription'

function Tour(props) {
  const style = {
    borderRadius: '5px',
    opacity: 0.9,
    backgroundColor: '#353535',
    padding: '1em',
  }
  const options = {
    buttons: {
      //   // backgroundColor: 'rgba(30,30,36,0.8)',
      //   // iconColor: 'rgba(255, 255, 255, 0.8)',
      //   // iconPadding: '5px',
      //   disablePanzoom: true,
      //   disableWheelControls: true,
      showCloseButton: true,
      showDownloadButton: false,
      //   hideControlsAfter: false,
      //   showFullscreenButton: true,
      showAutoplayButton: false,
      //   // showThumbnailsButton: true,
      //   // size: '40px'
    },

    caption: {
      captionFontFamily: 'Lato, sans-serif',
      // captionFontSize: '22px',
      // captionColor: '#8D99AE',
      // captionFontWeight: 300,
      showCaption: true,
    },
    settings: {
      overlayColor: 'rgba(0, 0, 0, 0.95)',
      transitionTimingFunction: 'ease-in-out',
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: [0.25, 0.75, 0.5, 1],
      slideAnimationType: 'slide',
      disablePanzoom: true,
      disableWheelControls: true,
      autoplaySpeed: 0,
      hideControlsAfter: false,
    },
    // progressBar: {
    //   height: '3px',
    //   fillColor: '#8D99AE',
    //   backgroundColor: 'rgba(43, 45, 66, 0.95)',
    // },
    thumbnails: {
      thumbnailsSize: ['150px', '100px'],
      thumbnailsGap: '0 5px',
    },
  }
  const {
    _rawBody,
    _rawTips,
    author,
    title,
    _updatedAt,
    mainImage,
    reviewedAt,
    imageCarousel,
    embargoedUntil,
    locations,
    excerpt,
    transcript,
    keywords,
    topics,
    address,
    duration,
    video,
    slug,
    audio,
    stories,
    tourType,
    searchState,
    subscription,
  } = props
  const { user, loading } = useContext(IdentityContext)
  if (loading || (subscription && (user === undefined || user?.app_metadata.roles[0] !== 'paid'))) {
    //if they need to signup or pay for subscription
    if (typeof window !== 'undefined')
      return (
        <article className={styles.root}>
          {mainImage && mainImage.asset && (
            <SEO
              title={title}
              description={excerpt}
              keywords={keywords}
              image={mainImage.asset.fluid}
            />
          )}
          {mainImage && mainImage.asset && (
            <div className={styles.headerImage}>
              <div className={styles.overlay}>
                <GatsbyImage
                  image={mainImage.asset.gatsbyImageData}
                  alt={mainImage.alt}
                  className={styles.image}
                  objectFit="cover"
                  objectPosition="top center"
                  sizes={{ ...mainImage.asset.fluid, aspectRatio: 5 / 3 }}
                />
              </div>
              <div className={styles.logo}>
                <img srcSet={imglogo} className={styles.imageLogo} />
              </div>
            </div>
          )}
          <Container>
            <h2>To view this exclusive tour</h2>
            <Link
              to={'/subscription'}
              state={{
                paymentReturnLink:
                  typeof window !== 'undefined'
                    ? `${window.location.origin}${getTourUrl(props.slug.current)}`
                    : process.env.URL,
              }}
            >
              <Button color="black" inverted size="large" aria-label="buttonOpen" type="button">
                Subscribe Now
              </Button>
            </Link>
          </Container>
        </article>
      )
    //or we can show them a link to subsciption/signup page
  }
  if (!loading)
    return (
      <article className={styles.root}>
        <SEO
          title={title}
          description={excerpt}
          keywords={keywords}
          image={mainImage.asset.fluid}
        />
        {mainImage && mainImage.asset && (
          <div className={styles.headerImage}>
            <div className={styles.overlay}>
              <GatsbyImage
                image={mainImage.asset.gatsbyImageData}
                alt={mainImage.alt}
                className={styles.image}
                sizes={{ ...mainImage.asset.fluid, aspectRatio: 5 / 3 }}
                objectFit="cover"
                objectPosition="top"
              />
            </div>
            <div className={styles.logo}>
              <img srcSet={imglogo} className={styles.imageLogo} />
            </div>
            {/* <div className={styles.scrollBtn}>
            <Link className={styles.scrollIcon} to="#tourStart">
              <span></span>Scroll
            </Link> */}
            {/* <a className={styles.scrollIcon} href="#tourStart">
              <span></span>Scroll
            </a> */}
            {/* </div> */}
          </div>
        )}

        <Container>
          <Segment id="tourStart" inverted textAlign="center" className={styles.sectionStart}>
            {/* Topics */}
            <Label.Group circular>
              {topics !== undefined && topics !== null
                ? topics.map((topic, index) => (
                    <Label size="large" className={styles.topic} key={index}>
                      {topic.title}
                    </Label>
                  ))
                : null}
            </Label.Group>
            <Divider hidden></Divider>
            {/* Updated Date */}
            {_updatedAt && (
              <p>
                Updated on{' '}
                {differenceInDays(new Date(_updatedAt), new Date()) > 3
                  ? distanceInWords(new Date(_updatedAt), new Date())
                  : format(new Date(_updatedAt), 'MMMM do yyyy')}
              </p>
            )}

            {/* Title */}
            <Header as="h1" color="grey" inverted className={styles.pageTitle}>
              {title}
            </Header>
            {/* Location */}
            <div>
              {locations !== undefined && locations !== null
                ? locations.map((location, index) => (
                    <div className={styles.locationTitle} key={index}>
                      <p style={{ marginRight: '10px' }}> {location.title}</p>
                      {location.description !== null ? (
                        <Modal
                          size="small"
                          basic
                          centered={true}
                          closeIcon
                          trigger={
                            <Button
                              size="tiny"
                              circular
                              color="grey"
                              icon="info"
                              className={styles.infoButton}
                            />
                          }
                        >
                          <Modal.Header>{location.title}</Modal.Header>
                          <Modal.Content>
                            <p>{location.description}</p>
                          </Modal.Content>
                        </Modal>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          </Segment>

          {/* ----- Video Story ----- */}
          {tourType === 'Video' && video ? (
            <Segment inverted className={styles.textStory}>
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.youtube.com/embed/${getYoutubeTag(video)}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              {duration ? <p className={styles.duration}>Duration: {duration}</p> : null}
            </Segment>
          ) : null}
          {/* ----- Audio Story ----- */}
          {tourType === 'Audio' && audio && audio.asset.url !== undefined ? (
            <Segment inverted className={styles.textStory}>
              <AudioPlayer
                className={cn(rhap_container, styles.rhap_container, rhap_time, styles.rhap_time)}
                autoPlay={false}
                src={audio.asset.url}
                onPlay={(e) => console.log('onPlay')}
              />
              {duration ? <p className={styles.duration}>Duration: {duration}</p> : null}
            </Segment>
          ) : null}
          {/* ----- Transcript ----- */}
          {tourType === 'Audio' && transcript && (
            <div>
              <Segment inverted className={styles.audioStory}>
                {/* <Modal
                basic
                size="large"
                centered={true}
                closeIcon
                trigger={
                  <Button
                    size="large"
                    content="View Transcript"
                    color="black"
                    inverted
                    className={styles.Collapsible}
                    textAlign="center"
                  ></Button>
                }
              >
                <Modal.Header>Transcript</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <p style={{ textAlign: 'justify' }}> {transcript}</p>
                  </Modal.Description>
                </Modal.Content>
              </Modal> */}
                <Collapsible trigger="View Transcript" className={styles.Collapsible}>
                  <div className={styles.transcript}> {transcript}</div>
                </Collapsible>
                {/* <Divider></Divider> */}
              </Segment>
            </div>
          )}

          {/* ----- Tour Description ----- */}
          <Segment inverted className={styles.textStory}>
            {_rawBody && <BlockContent blocks={_rawBody} />}
          </Segment>

          {/* Image Carousel */}
          {imageCarousel && (
            <Header as="h2" color="grey" inverted textAlign="center">
              {imageCarousel.title}
            </Header>
          )}
          {imageCarousel && (
            <Segment inverted>
              <SimpleReactLightbox>
                <CarouselProvider
                  naturalSlideWidth={155}
                  naturalSlideHeight={100}
                  totalSlides={imageCarousel.imagesCarousel.length}
                  visibleSlides={3}
                >
                  <div className={styles.arrow}>
                    <ButtonBack className={styles.arrowLeft}>
                      <Icon name="chevron left" />
                    </ButtonBack>
                  </div>
                  <div className={styles.arrow2}>
                    <ButtonNext className={styles.arrowRight}>
                      <Icon name="chevron right" />
                    </ButtonNext>
                  </div>
                  <Slider>
                    <SRLWrapper options={options}>
                      {imageCarousel &&
                        imageCarousel.imagesCarousel.map((slide, index) => (
                          <Slide tag="a" key={index}>
                            {slide.asset && (
                              <GatsbyImage
                                image={slide.asset.gatsbyImageData}
                                alt={slide.caption}
                                // className={styles.image}
                                objectFit="fit"
                                objectPosition="top center"
                              />
                            )}
                          </Slide>
                        ))}
                    </SRLWrapper>
                  </Slider>
                </CarouselProvider>
              </SimpleReactLightbox>
              <Divider hidden></Divider>
            </Segment>
          )}

          {/* ----- Address ----- */}
          {address && (
            <Segment inverted textAlign="center">
              {(address && address.street !== null) || address.name !== null ? (
                <div className={styles.sectionTitle}> Location</div>
              ) : null}
              {address &&
                (address.name !== null || address.name !== undefined ? (
                  <p>{address.name}</p>
                ) : null)}
              {address &&
                (address.street !== null ? (
                  <div>
                    <p>{address.street}</p>
                    <a
                      href={
                        `https://www.google.com/maps/search/?api=1&query=` + `${address.street}`
                      }
                      target="_blank"
                    >
                      <Button
                        style={{
                          textTransform: 'uppercase',
                          color: '#fff',
                          backgroundColor: '#000 !important',
                        }}
                        color="black"
                        inverted
                        size="large"
                        content="View Map"
                      ></Button>
                    </a>
                  </div>
                ) : null)}
            </Segment>
          )}

          {/* Tips */}
          {_rawTips && (
            <Segment className={styles.cardDesign} inverted>
              <div className={styles.cardLayout}>
                <Header as="h2" color="grey" inverted textAlign="center">
                  Tips
                </Header>
                <BlockText className={styles.tips} blocks={_rawTips}></BlockText>
                <Divider hidden></Divider>
              </div>
            </Segment>
          )}

          {/* ----- Stories Cards ----- */}
          {stories && stories.length > 0 && (
            <Segment inverted>
              <div className={styles.storiesTitle} id="storiesOnTours">
                Stories
              </div>
              <StoryGrid
                stories={stories}
                fromTours={true}
                backURL={slug.current}
                searchState={searchState}
              ></StoryGrid>
            </Segment>
          )}

          {/* Keywords */}
          <Segment inverted textAlign="center">
            {keywords && (
              <Label.Group circular>
                {keywords.map((keyword) => (
                  <div className={styles.keyword} key={keyword}>
                    #{keyword}
                  </div>
                ))}
              </Label.Group>
            )}
          </Segment>
          <Segment inverted textAlign="center">
            {/* Reviewed Date */}
            {reviewedAt && (
              <p>
                <em>
                  This tour was originally published on{' '}
                  {differenceInDays(new Date(reviewedAt), new Date()) > 3
                    ? distanceInWords(new Date(reviewedAt), new Date())
                    : format(new Date(reviewedAt), 'MMMM do yyyy')}
                </em>{' '}
              </p>
            )}
          </Segment>
          <Divider hidden></Divider>
        </Container>

        {/* <Container fluid> */}
        <Segment inverted style={{ backgroundColor: '#000' }} padded="very">
          {/* Author */}
          <Divider hidden></Divider>
          {author && (
            <Grid columns={2} centered stackable>
              {author.image && author.image.asset && (
                <Grid.Column width={5}>
                  <div className={styles.imageAuthor}>
                    <GatsbyImage
                      image={author.image.asset.gatsbyImageData}
                      alt={author.alt}
                      className={styles.imgauthor}
                      // objectPosition="50% 50%"
                      sizes={{ ...author.image.asset.fluid, aspectRatio: 1 / 1 }}
                    />
                  </div>
                </Grid.Column>
              )}

              <Grid.Column width={8}>
                <Header as="h2" color="grey" inverted>
                  About {author.name}
                </Header>
                {author._rawBio && (
                  <p>{author._rawBio.map((bio) => bio.children.map((biotext) => biotext.text))}</p>
                )}
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid>
          )}
          <Divider hidden></Divider>
        </Segment>
        {/* </Container> */}
        {!subscription ? (
          <Container fluid>
            {/* Social Share */}
            <Segment inverted textAlign="center" padded="very">
              <Header as="h2" color="grey" inverted>
                Share this tour with your friends & family!{' '}
              </Header>

              <Social
                slug={slug.current}
                title={title}
                story={false}
                description={excerpt}
                keywords={keywords}
                image={mainImage}
              ></Social>
            </Segment>
          </Container>
        ) : null}
      </article>
    )
}

export default Tour
