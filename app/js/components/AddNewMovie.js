import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const MAX_ACTORS = 5

class AddNewMovie extends Component {
  constructor() {
    super()
    this.submitNewMovie = this.submitNewMovie.bind(this)
    this.state = {
      actorCount: 1
    }
  }

  submitNewMovie() {
    const title = this.refs.title.value
    const genre = this.refs.genre.value
    const year = this.refs.year.value
    const rating = this.refs.rating.value
    let actors = []
    for (let i = 0; i < this.state.actorCount; ++i) {
      if (this.refs['actor'+i].value) {
        actors.push(this.refs['actor'+i].value)
      }
    }
    this.props.addMovie({ title, genre, year, rating, actors })
    //this.props.exit()
  }

  render() {
    const { actorCount } = this.state
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          Add a movie to your collection
        </div>
        <div className='app__content__wrapper'>
          Title
          <input type='text' ref='title' placeholder='Enter title'/>
          Genre
          <input type='text' ref='genre' placeholder='Enter Genre'/>
          Year
          <input type='text' ref='year' placeholder='Enter Year'/>
          Rating
          <input type='text' ref='rating' placeholder='Rating'/>
          Actors (Max 5)
          <div 
            className='regularButton'
            disabled={actorCount >= MAX_ACTORS}
            onClick={ () => this.setState({ actorCount: actorCount + (actorCount < MAX_ACTORS ? 1 : 0) }) }>
            Add Another Actor
          </div>
          <div 
            className='regularButton'
            onClick={ () => this.setState({ actorCount: actorCount - (actorCount > 1 ? 1 : 0) }) }>
            Remove Last Actor
          </div>
          {
            _.times(actorCount, (i) => <input key={i} type='text' placeholder={'Actor '+(i+1)} ref={'actor'+i}/> )
          }
          <div 
            className='regularButton'
            disabled={actorCount >= MAX_ACTORS}
            onClick={this.submitNewMovie}>
            Submit New Movie
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({
    addMovie: (movieData) => dispatch({ type: 'ADD_MOVIE', movieData })
  })
)(AddNewMovie)


