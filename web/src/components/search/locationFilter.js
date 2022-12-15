import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import * as styles from './locationFilter.module.css'

const renderLabel = (label) => ({
  color: 'grey',
  content: `${label.text}`,
})
const LocationFilter = (props) => (
  // <div style={{ background: '#ccc', padding: '0.1rem', borderRadius: '10px' }}>
  <div className={styles.locationDropDownBg}>
    <Dropdown
      placeholder="Select Location"
      fluid
      button
      multiple
      search
      selection
      closeOnChange
      options={props.locations}
      onChange={props.handleChange}
      value={props.filterValue}
      renderLabel={renderLabel}
    />
  </div>
)

export default LocationFilter
