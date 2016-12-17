export default (state = {
  // list of objects, each containing info about a movie
  movieList: [],
}, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      console.log(action)
      return {...state,
        movieList: [...state.movieList, action.movieData]
      }
    default:
      return state
  }
}
