export default (state = {
  // list of objects, each containing info about a movie
  movieList: [],
}, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {...state,
        movieList: [...movieList, action.movieData]
      }
    default:
      return state
  }
}
