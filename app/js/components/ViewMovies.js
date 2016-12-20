import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'

class ViewMovies extends Component {
  constructor() {
    super()
    this.headerRow = [
      { label: 'Title', big: true },
      { label: 'Genre' },
      { label: 'Year' },
      { label: 'Rating' },
      { label: 'Actors', big: true },
    ].map(
      (headerItem, i) =>
        <div className={'movieTable__row' + (headerItem.big ? '__bigcell' : '__cell')} key={i}>
          { headerItem.label }
        </div>
    )
    this.emptyRow = (
      <div className='movieTable__empty'>
        No movies found!
      </div>
    )
  }

  render() {
    const { filteredMovieList } = this.props.store
    const movieListComponent = filteredMovieList.map(
      (movie, i) =>
        <div className='movieTable__row' key={i}>
          <div className='movieTable__row__bigcell'>
            { movie.title }
          </div>
          <div className='movieTable__row__cell'>
            { movie.genre }
          </div>
          <div className='movieTable__row__cell'>
            { movie.year }
          </div>
          <div className='movieTable__row__cell'>
            { movie.rating }
          </div>
          <div className='movieTable__row__bigcell'>
            { movie.actors.join(', ') }
          </div>
        </div>
    )
    
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          Your Movie Collection
        </div>
        <div className='app__content__wrapper'>
          <SearchBar/>
          <div className='movieTable'>
            <div className='movieTable__row'>
              { this.headerRow }
            </div>
            { filteredMovieList.length > 0 ? movieListComponent : this.emptyRow }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(ViewMovies)

