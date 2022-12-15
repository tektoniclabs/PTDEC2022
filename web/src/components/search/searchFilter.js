import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as styles from './searchFilter.module.css'

const renderLabel = (label) => ({
  color: 'grey',
  content: `${label.text}`,
})

const SearchFilter = (props) => (
  <div className={styles.topicDropDownBg}>
    <Dropdown
      placeholder="Enter topics or keywords"
      fluid
      icon={null}
      multiple
      search
      minCharacters={3}
      // icon="search"
      closeOnChange
      className={styles.searchDropdown}
      selection
      options={props.searchTags}
      onChange={props.handleSearchChange}
      value={props.searchValue}
      renderLabel={renderLabel}
    />
  </div>
)

export default SearchFilter
