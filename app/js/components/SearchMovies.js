import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchMovies extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          Search movies
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(SearchMovies)


