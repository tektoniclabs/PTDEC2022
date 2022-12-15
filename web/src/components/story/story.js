import { format, distanceInWords, differenceInDays } from 'date-fns'
import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import {
  buildImageObj,
  buildAuthorImageObj,
  getYoutubeTag,
  getFluidImage,
  buildSanityImageObj,
  getStoryUrl,
} from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import BlockContent from '../block-content'
import BlockText from '../block-content/block-text'
import 'pure-react-carousel/dist/react-carousel.es.css'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import cn from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import SEO from '../../components/hoc/seo/seo'
import Collapsible from 'react-collapsible'
import TourGrid from './tourGrid'
import Social from './social'
import {
  Container,
  Segment,
  Label,
  Grid,
  Divider,
  Popup,
  Button,
  Header,
  Modal,
  Embed,
  Icon,
  Accordion,
} from 'semantic-ui-react'
import AudioPlayer from 'react-h5-audio-player'
import { Link } from 'gatsby'
import imglogo from '../../assets/logo.png'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import SubscriptionPage from '../../pages/subscription'
import { rhap_container, rhap_time } from 'react-h5-audio-player/lib/styles.css'
import * as styles from './story.module.css'
import IdentityContext from '../../../identity-context'

function Story(props) {
  const style = {
    borderRadius: '5px',
    opacity: 1,
    backgroundColor: '#353535',
    padding: '1em',
    margin: '1em 0em 0em 0em',
  }
  const { user, loading } = useContext(IdentityContext)
  const options = {
    buttons: {
      //   // backgroundColor: 'rgba(30,30,36,0.8)',
      //   // iconColor: 'rgba(255, 255, 255, 0.8)',
      //   // iconPadding: '5px',
      //   disablePanzoom: true,
      //   disableWheelControls: true,
      showCloseButton: true,
      showDownloadButton: false,
      showPrevButton: true,
      showNextButton: true,
      //   hideControlsAfter: false,
      //   showFullscreenButton: true,
      showAutoplayButton: false,
      showThumbnailsButton: true,
      //   // size: '40px'
    },

    caption: {
      captionFontFamily: 'Lato, sans-serif !important',
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
    slug,
    metaDescription,
    transcript,
    duration,
    keywords,
    topics,
    address,
    video,
    audio,
    storyURL,
    tours,
    storyType,
    searchState,
    subscription,
  } = props

  if (loading || (subscription && (user === undefined || user?.app_metadata.roles[0] !== 'paid'))) {
    //if they need to signup or pay for subscription
    if (typeof window !== 'undefined')
      return (
        <article className={styles.root}>
          <SEO
            title={title}
            description={metaDescription}
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
            <Segment inverted textAlign="center">
              <Header as="h2">To view this exclusive story</Header>
              <p></p>
              <Link
                to={'/subscription'}
                state={{
                  paymentReturnLink:
                    typeof window !== 'undefined'
                      ? `${window.location.origin}${getStoryUrl(props.slug.current)}`
                      : process.env.URL,
                }}
              >
                <Button color="black" inverted size="large" aria-label="buttonOpen" type="button">
                  Subscribe Now
                </Button>
              </Link>
            </Segment>
          </Container>
        </article>
      )
  }
  if (!loading) {
    return (
      <article className={styles.root}>
        {mainImage && mainImage.asset && (
          <SEO
            title={title}
            description={metaDescription}
            keywords={keywords}
            image={mainImage.asset.fluid}
          />
        )}

        {mainImage && mainImage.asset && (
          <div className={styles.headerImage}>
            <div className={styles.overlay}>
              {/* <img src={imageUrlFor(mainImage).width(1960).url()} className={styles.image} /> */}
              <GatsbyImage
                image={mainImage.asset.gatsbyImageData}
                // image={mainImage.childImageSharp.asset.gatsbyImageData}
                alt={mainImage.alt}
                className={styles.image}
                objectFit="cover"
                objectPosition="top center"
                // objectPosition="50% 50%"
                sizes={{ ...mainImage.asset.fluid, aspectRatio: 5 / 3 }}
              />
            </div>

            <div className={styles.logo}>
              <img srcSet={imglogo} className={styles.imageLogo} />
            </div>
            {/* <div className={styles.scrollBtn}>
            <Link className={styles.scrollIcon} to="#storyStart">
              <span></span>Scroll
            </Link> */}
            {/* <a className={styles.scrollIcon} href="#storyStart">
              <span></span>Scroll
            </a> */}
            {/* </div> */}
          </div>
        )}
        {/* <div className={styles.viewBannerButton}>
        <Modal
          size="large"
          basic
          centered={true}
          closeIcon
          trigger={
            <Button
              size="massive"
              circular
              color="grey"
              icon="image"
              className={styles.fullScreenBtn}
              textAlign="center"
            >
            </Button>
          }
        >
          <Modal.Content>
            <Img
              fluid={mainImage.asset.fluid}
              alt={mainImage.alt}
              className={styles.image}
              objectFit="cover"
              objectPosition="top center"
            />
          </Modal.Content>
        </Modal>
      </div> */}
        <Container>
          {/* Topics */}
          <Segment id="storyStart" inverted textAlign="center" className={styles.sectionStart}>
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
          {storyType === 'Video' && video ? (
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
          {storyType === 'Audio' && audio && audio.asset.url !== undefined ? (
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
          {storyType === 'Audio' && transcript && (
            <div>
              <Segment inverted className={styles.audioStory}>
                {/* <Modal
                size="large"
                inverted
                style={{ backgroundColor: '#353535 !important' }}
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
                <Modal.Header style={{ backgroundColor: '#353535 !important' }}>
                  Transcript
                </Modal.Header>
                <Modal.Content style={{ backgroundColor: '#353535 !important' }}>
                  <Modal.Description style={{ backgroundColor: '#353535 !important' }}>
                    <p style={{ textAlign: 'justify' }}> {transcript}</p>
                  </Modal.Description>
                </Modal.Content>
              </Modal> */}

                <Collapsible trigger="Transcript" className={styles.Collapsible}>
                  <div className={styles.transcript}> {transcript}</div>
                  {/* <div onClick={window.print} className={styles.printIcon}>
                  <Icon name="print" circular inverted color="grey" bordered size="large" />
                </div> */}
                </Collapsible>
              </Segment>
            </div>
          )}
          {/* ----- Text Story ----- */}
          <Segment inverted className={styles.textStory}>
            {_rawBody && <BlockContent blocks={_rawBody} />}
          </Segment>

          {/* Image Carousel */}
          {imageCarousel && <div className={styles.sectionTitle}> {imageCarousel.title}</div>}
          {imageCarousel && (
            <Segment inverted>
              <SimpleReactLightbox>
                <CarouselProvider
                  naturalSlideWidth={155}
                  naturalSlideHeight={100}
                  totalSlides={imageCarousel.imagesCarousel.length}
                  visibleSlides={3}
                >
                  <div style={{ position: 'relative' }}>
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
                                <div>
                                  <GatsbyImage
                                    image={slide.asset.gatsbyImageData}
                                    alt={slide.caption}
                                    className={styles.image}
                                    objectFit="contain"
                                    objectPosition="top center"
                                  />
                                </div>
                              )}
                            </Slide>
                          ))}
                      </SRLWrapper>
                    </Slider>
                  </div>
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
              {/* {address &&
              (address.pluscode !== null ? (
                <a href={`https://plus.codes/` + `${address.pluscode}`} target="_blank">
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
              ) : address.street !== null ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=` + `${address.street}`}
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
              ) : null)} */}
            </Segment>
          )}
          {/* Tips */}
          {_rawTips && (
            <Segment className={styles.cardDesign} inverted>
              <div className={styles.cardLayout}>
                <div className={styles.sectionTitle}> Tips</div>
                <BlockText className={styles.tips} blocks={_rawTips}></BlockText>
                <Divider hidden></Divider>
              </div>
            </Segment>
          )}
          {/* Keywords */}
          <Segment inverted textAlign="center">
            {keywords && (
              <div>
                {keywords.map((keyword) => (
                  <div className={styles.keyword} key={keyword}>
                    #{keyword}
                  </div>
                ))}
              </div>
            )}
          </Segment>
          <Segment inverted textAlign="center">
            {/* Reviewed Date */}
            {reviewedAt && (
              <p>
                <em>
                  This story was originally published on{' '}
                  {differenceInDays(new Date(reviewedAt), new Date()) > 3
                    ? distanceInWords(new Date(reviewedAt), new Date())
                    : format(new Date(reviewedAt), 'MMMM do yyyy')}
                </em>{' '}
              </p>
            )}
          </Segment>
          <Divider hidden></Divider>
        </Container>

        <Segment inverted style={{ backgroundColor: '#000', margin: '0' }} padded="very">
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
                <div className={styles.author}> About {author.name}</div>

                {author._rawBio && (
                  <p>{author._rawBio.map((bio) => bio.children.map((biotext) => biotext.text))}</p>
                )}
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid>
          )}
          <Divider hidden></Divider>
        </Segment>

        {/* Show the "Featured in these tours" section  */}
        {tours && tours.length > 0 && (
          <div>
            {!props.backFromTours && (
              <Segment inverted className={styles.toursGrid}>
                <TourGrid
                  tours={tours}
                  fromStory={true}
                  backURL={slug.current}
                  searchState={searchState}
                ></TourGrid>
              </Segment>
            )}
          </div>
        )}

        {/* Back to tours button on Story */}
        {props.backFromTours && (
          <Segment inverted textAlign="center" padded="very">
            <Link
              to={storyURL !== null ? `/tour/${storyURL}/#storiesOnTours` : null}
              state={{ searchState: searchState }}
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
                content="Back to Tour"
              ></Button>
            </Link>
          </Segment>
        )}
        {!subscription ? (
          <Container fluid>
            {/* Social Share */}
            <Segment inverted textAlign="center" padded="very">
              <div className={styles.sectionTitle}>
                {' '}
                Share this story with your friends & family!{' '}
              </div>
              <Social
                story={true}
                slug={slug.current}
                title={title}
                description={metaDescription}
                keywords={keywords}
                image={mainImage}
              ></Social>
            </Segment>
          </Container>
        ) : null}
      </article>
    )
  } else return <></>
}

export default Story
