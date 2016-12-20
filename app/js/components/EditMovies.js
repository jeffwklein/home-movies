import React, { Component } from 'react'
import { connect } from 'react-redux'

class EditMovies extends Component {
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
        There are no movies in your collection yet!
      </div>
    )
    this.submitSaveData = this.submitSaveData.bind(this)
  }

  submitSaveData() {
    const { movieList } = this.props.store
    const newMovieList = movieList.map((movie, i) => {
      const title = this.refs['title'+i].value
      if (!title) {
        // TODO: display error if no title ?
        return
      }
      const genre = this.refs['genre'+i].value
      const year = this.refs['year'+i].value
      const rating = this.refs['rating'+i].value
      let actors = []
      for (let j = 0; j < movie.actors.length; ++j) {
        if (this.refs['actor-'+i+'-'+j].value) {
          actors.push(this.refs['actor-'+i+'-'+j].value)
        }
      }
      return { title, genre, year, rating, actors }
    })
    this.props.updateMovieList(newMovieList)
    // TODO: function returns user to view movie screen ?
  }

  render() {
    const { movieList } = this.props.store
    const movieListComponent = movieList.map(
      (movie, i) =>
        <div className='movieTable__row' key={i}>
          <div className='movieTable__row__bigcell'>
            <input type='text' ref={'title'+i} defaultValue={movie.title} className='editMovie'/>
          </div>
          <div className='movieTable__row__cell'>
            <input type='text' ref={'genre'+i} defaultValue={movie.genre} className='editMovie'/>
          </div>
          <div className='movieTable__row__cell'>
            <input type='text' ref={'year'+i} defaultValue={movie.year} className='editMovie'/>
          </div>
          <div className='movieTable__row__cell'>
            <input type='text' ref={'rating'+i} defaultValue={movie.rating} className='editMovie'/>
          </div>
          <div className='movieTable__row__bigcell'>
            <button className='small' onClick={() => this.props.addActor(i)}>
              Add Actor
            </button>
            <button className='small' onClick={() => this.props.removeLastActor(i)}>
              Remove Last Actor
            </button>
            { 
              movie.actors.map(
                (actor, j) =>
                  <input type='text' ref={'actor-'+i+'-'+j} defaultValue={actor} className='editMovie' key={j}/>
              )
            }
          </div>
        </div>
    )
    
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          Edit Movies
        </div>
        <div className='app__content__wrapper'>
          <div className='movieTable'>
            <div className='movieTable__row'>
              { this.headerRow }
            </div>
            { movieList.length > 0 ? movieListComponent : this.emptyRow }
          </div>
          <button className='big' onClick={this.submitSaveData}>
            Save Data
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({
    addActor:
      (index) => dispatch({
        type: 'ADD_ACTOR',
        index
      }),
    removeLastActor:
      (index) => dispatch({
        type: 'REMOVE_LAST_ACTOR',
        index
      }),
    updateMovieList:
      (movieList) => dispatch({
        type: 'UPDATE_MOVIE_LIST',
        movieList
      }),
  })
)(EditMovies)

