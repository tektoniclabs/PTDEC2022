import algoliasearch from 'algoliasearch/lite'
import { createRef, default as React, useState } from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  ClearRefinements,
  RefinementList,
} from 'react-instantsearch-dom'
import PropTypes from 'prop-types'

export default function Search({ indices }) {
  const rootRef = createRef()
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
      <div>
        <ClearRefinements />
        <h2>Locations</h2>
        <RefinementList attribute="locations.title" />
      </div>
      <div>
        <SearchBox searchAsYouType={false} />
        <Hits />
      </div>
    </InstantSearch>
  )
}

function Hit(hits) {
  return (
    <div>
      {console.log(hits)}
      {/* {hits} */}
    </div>
  )
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
}
