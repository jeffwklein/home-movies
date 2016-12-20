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
    // ensure that a title has been provided, exit if not
    if (!title) {
      this.setState({
        successMessage: null,
        titleError: true
      })
      return
    }
    const genre = this.refs.genre.value
    const year = this.refs.year.value
    const rating = this.refs.rating.value
    let actors = []
    for (let i = 0; i < this.state.actorCount; ++i) {
      if (this.refs['actor'+i].value) {
        actors.push(this.refs['actor'+i].value)
      }
    }
    // SUCCESS
    this.props.addMovie({ title, genre, year, rating, actors })
    this.refs.title.value = ''
    this.refs.genre.value = ''
    this.refs.year.value = ''
    this.refs.rating.value = ''
    this.setState({
      successMessage: 'Added '+ title +' to your collection!',
      titleError: false
    })
  }

  render() {
    const { actorCount, titleError, successMessage } = this.state
    return (
      <div className='app__content'>
        <div className='app__content__header'>
          Add a movie to your collection
        </div>
        { 
          // if added successfully, display message
          successMessage ?
          <div className='successMessage'>
            { successMessage }
          </div> : null
        }
        <div className='app__content__wrapper'>
          { 
            // if no title provided, display this error
            titleError ?
            <div className='errorMessage'>
              You must provide a movie title.
            </div> : null
          }
          <input type='text' ref='title' placeholder='Enter title' className='addMovie'/>
          <input type='text' ref='genre' placeholder='Enter Genre' className='addMovie'/>
          <input type='text' ref='year' placeholder='Enter Year' className='addMovie'/>
          <input type='text' ref='rating' placeholder='Rating' className='addMovie'/>
          <button 
            className='small'
            disabled={actorCount >= MAX_ACTORS}
            onClick={ () => this.setState({ actorCount: actorCount + (actorCount < MAX_ACTORS ? 1 : 0) }) }>
            Add Another Actor
          </button>
          <button 
            className='small'
            onClick={ () => this.setState({ actorCount: actorCount - (actorCount > 1 ? 1 : 0) }) }>
            Remove Last Actor
          </button>
          {
            _.times(actorCount, (i) => <input key={i} type='text' placeholder={'Actor '+(i+1)} ref={'actor'+i} className='addMovie'/> )
          }
          <button
            className='big'
            disabled={actorCount >= MAX_ACTORS}
            onClick={this.submitNewMovie}>
            Submit New Movie
          </button>
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


