import React, { Component } from 'react'
import { connect } from 'react-redux'

class ViewAndEditMovies extends Component {
  constructor() {
    super()
  }

  render() {
    const { movieList } = this.props.store
    console.log(movieList)
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          View and edit your movie collection
        </div>
        <div className='app__content__wrapper'>
          <div className='movieTable__row__header'>
          </div>
          <div className='movieTable__row__header'>
          {
            //movieList.map((
          }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(ViewAndEditMovies)

