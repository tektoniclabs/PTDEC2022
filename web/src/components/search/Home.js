import React, { Component } from 'react'
import LocationFilter from './locationFilter'
import SearchFilter from './searchFilter'
import StoryPreviewGrid from '../story-preview-grid'
import * as styles from './home.module.css'
import { Search, Segment, Grid, Divider } from 'semantic-ui-react'
import _ from 'lodash'

export default class SearchHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: [],
      searchValue: '',
      stories: [],
      filteredStories: [],
      filterON: false,
    }
  }

  componentDidMount() {
    if (this.props.searchState !== undefined && this.props.searchState) {
      this.setState(this.props.searchState)
    } else {
      this.setState({
        stories: this.props.nodes,
        filteredStories: this.props.nodes,
        searchTags: this.props.searchTags,
        searchValue: [],
      })
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ filterValue: value }, () => this.doFilter())
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, searchValue: value }, () => this.doFilter())
  }

  doFilter = () => {
    if (this.state.filterValue.length > 0)
      var filteredStories = this.props.nodes.filter((story) =>
        story.locations.some((location) =>
          this.state.filterValue.some(
            (filterValue) => filterValue.toLowerCase() === location.title.toLowerCase()
          )
        )
      )

    this.setState(
      {
        filteredStories: this.state.filterValue.length > 0 ? filteredStories : this.state.stories,
        filterON: this.state.filterValue.length > 0 ? true : false,
      },
      () => {
        if (this.state.searchValue.length > 0) this.doSearchFilter()
      }
    )
  }

  doSearchFilter = () => {
    if (this.state.searchValue.length > 0)
      var filteredStories = this.state.filteredStories.filter((story) => {
        return this.state.searchValue.some((value) => {
          return (
            story.topics.some((topic) => topic.title.toLowerCase() === value.toLowerCase()) ||
            story.keywords.some((keyword) => keyword.toLowerCase() === value.toLowerCase())
          )
        })
      })
    this.setState({
      isLoading: false,
      filteredStories: this.state.searchValue.length > 0 ? filteredStories : this.state.stories,
      filterON: this.state.searchValue.length > 0 ? true : false,
    })
  }

  render() {
    const { filterValue, searchValue, filteredStories, filterON, isLoading } = this.state
    return (
      <div>
        <div className={styles.dividerSpace}></div>

        <Segment inverted style={{ padding: '0' }}>
          <Grid stackable columns={2} className={styles.gridStyles}>
            <Grid.Column mobile={16} tablet={8} computer={5} style={{ padding: 0 }}>
              <LocationFilter
                handleChange={this.handleChange}
                filterValue={filterValue}
                locations={this.props.locations}
              />{' '}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={11} style={{ padding: 0 }}>
              <SearchFilter
                handleSearchChange={this.handleSearchChange}
                searchValue={this.state.searchValue}
                searchTags={this.props.searchTags}
              />{' '}
            </Grid.Column>
          </Grid>
        </Segment>

        {/* <Search
          placeholder="Start your search..."
          fluid
          open={false}
          loading={isLoading}
          input={{ fluid: true }}
          value={searchValue}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true,
          })}
        /> */}
        <div className={styles.storyDisplay}></div>
        <StoryPreviewGrid
          searchState={this.state}
          storyNodes={filteredStories}
          tourNodes={this.props.tourNodes}
          filterON={filterON}
        />
      </div>
    )
  }
}
