import React from 'react'
import * as styles from './tourGrid.module.css'
import { Container } from 'semantic-ui-react'
import Masonry from 'react-masonry-css'
import TourPreview from '../tour-preview'

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 2,
  500: 1,
}

export default function TourGrid(props) {
  const { tours, fromStory, backURL, searchState } = props
  return (
    <Container>
      {tours && tours.length > 0 && (
        <div className={styles.sectionTitle}>
          This story is featured in the following {tours.length > 1 ? 'tours' : 'tour'}
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.mymasonrygrid}
        columnClassName={styles.mymasonrygridcolumn}
      >
        {tours &&
          tours.map(
            (tour) =>
              tour !== undefined && (
                <div key={tour.id} className={styles.slidebottom}>
                  <TourPreview {...tour} fromStory backURL={backURL} searchState={searchState} />{' '}
                </div>
              )
          )}
      </Masonry>
    </Container>
  )
}
