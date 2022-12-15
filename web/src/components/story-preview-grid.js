import React, { useContext } from 'react'
import StoryPreview from './story-preview'
import TourPreview from './tour-preview'
import * as styles from './story-preview-grid.module.css'
import { Container, Segment, Card } from 'semantic-ui-react'
import Masonry from 'react-masonry-component'
// import Masonry from 'react-masonry-css'
import IdentityContext from '../../identity-context'
import { Dimmer, Loader } from 'semantic-ui-react'

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 2,
  500: 1,
}

const masonryOptions = {
  transitionDuration: 5,
}
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function newRandomArray(storyNodes, tourNodes) {
  var nodes = []
  // Get the average and upper and lower limits
  var storyNodesLength = storyNodes && storyNodes.length
  var tourNodesLength = tourNodes && tourNodes.length
  var average = storyNodesLength / tourNodesLength
  var lowerRandom = Math.floor(average - average / 2)
  var higherRandom = Math.floor(average + average / 2)
  while (lowerRandom && higherRandom && storyNodes !== undefined && storyNodes.length !== 0) {
    //get the random number of stories between the upper and lower limits
    var noOfStory =
      tourNodes && tourNodes.length === 0
        ? storyNodes.length
        : getRandomArbitrary(lowerRandom, higherRandom)
    //if not enough stories then use the remaining stories length
    if (storyNodes && storyNodes.length !== 0) {
      if (noOfStory > storyNodes.length) {
        nodes = [...nodes, ...storyNodes.slice(0, storyNodes.length)]
        storyNodes.splice(0, storyNodes.length)
      } else {
        nodes = [...nodes, ...storyNodes.slice(0, noOfStory)]
        storyNodes.splice(0, noOfStory)
      }
    }
    if (tourNodes !== undefined && tourNodes.length !== 0) {
      nodes = [...nodes, tourNodes[0]]
      tourNodes.splice(0, 1)
    }
  }
  return nodes.flat()
}
function StoryPreviewGrid(props) {
  var storyNodes = props.storyNodes ? [...props.storyNodes] : null
  var tourNodes = props.tourNodes ? [...props.tourNodes] : null
  var nodes = props.filterON ? storyNodes : newRandomArray(storyNodes, tourNodes)
  const { user, netlifyIdentity, loading } = useContext(IdentityContext)
  console.log(nodes[0])
  return (
    <Container>
      {/* <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} /> */}
      {loading ? (
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      ) : (
        <Masonry
          className={styles.masonry} // default ''
          elementType={'div'} // default 'div'
          options={masonryOptions} // default {}
        >
          {nodes &&
            nodes.map(
              (node, index) =>
                node !== undefined && (
                  <div className={styles.root} key={index}>
                    {node.storyType === undefined ? (
                      <TourPreview {...node} searchState={props.searchState} />
                    ) : (
                      <StoryPreview {...node} searchState={props.searchState} />
                    )}
                  </div>
                )
            )}
        </Masonry>
      )}
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.mymasonrygrid}
        columnClassName={styles.mymasonrygridcolumn}
      >
        {nodes &&
          nodes.map(
            (node, index) =>
              node !== undefined && (
                <div key={index} className={styles.root}>
                  <StoryPreview {...node} />{' '}
                </div>
              )
          )}
      </Masonry> */}
    </Container>
  )
}

StoryPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
}

export default StoryPreviewGrid
