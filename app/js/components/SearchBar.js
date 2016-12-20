import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchBar extends Component {
  constructor() {
    super()
    this.searchInputChanged = this.searchInputChanged.bind(this)
    this.updateTimeout = this.updateTimeout.bind(this)
  }

  componentWillMount() {
    // reset search terms on navigation to page
    this.props.clearQuery()
  }

  searchInputChanged() {
    const query = this.refs.search.value
    setTimeout(() => this.updateTimeout(query),100)
  }

  updateTimeout(query) {
    const newQuery = this.refs.search.value
    // if user has stopped typing for 100ms -- reduce lag
    if (newQuery === query) {
      this.props.filterMovies(query)
    }
  }

  render() {
    return (
      <input
        type='text'
        ref='search'
        onChange={this.searchInputChanged}
        placeholder='Search Movies...'
        className='searchBar'
      />
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({
    filterMovies:
      (query) => dispatch({
        type: 'FILTER_MOVIES',
        query
      }),
    clearQuery:
      (query) => dispatch({
        type: 'CLEAR_QUERY'
      })
  })
)(SearchBar)


