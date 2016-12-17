import React, { Component } from 'react'
import { connect } from 'react-redux'

class ViewAndEditMovies extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          View and edit your movie collection
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(ViewAndEditMovies)

