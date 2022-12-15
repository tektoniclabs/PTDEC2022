import React from 'react'
import * as styles from './storyGrid.module.css'
// import Masonry from 'react-masonry-css'
import StoryPreview from '../story-preview'
import { Container, Segment, Card } from 'semantic-ui-react'
import Masonry from 'react-masonry-component'

export default function StoryGrid(props) {
  const { stories, fromTours, backURL, searchState } = props

  const masonryOptions = {
    transitionDuration: 0,
  }
  return (
    <Masonry
      className={styles.masonry} // default ''
      elementType={'ul'} // default 'div'
      options={masonryOptions} // default {}
    >
      {stories &&
        stories.map(
          (story) =>
            story !== undefined && (
              <div key={story.id} className={styles.root}>
                <StoryPreview
                  {...story}
                  fromTours={true}
                  backURL={backURL}
                  searchState={searchState}
                />{' '}
              </div>
            )
        )}
    </Masonry>
  )
}
