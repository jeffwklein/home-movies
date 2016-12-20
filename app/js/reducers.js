export default (state = {
  // list of objects, each containing info about a movie
  movieList: [],
  filteredMovieList: [],
  query: '',
  sortFunction: (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
}, action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return {...state,
        movieList: [...state.movieList, action.movieData].sort(state.sortFunction)
      }
    case 'UPDATE_MOVIE_LIST':
      return {...state,
        movieList: action.movieList
      }
    case 'ADD_ACTOR':
      if (state.movieList[action.index].actors.length >= 5) {
        return state
      }
      return {...state,
        movieList: [
          ...state.movieList.slice(0, action.index),
          {
            ...state.movieList[action.index], 
            actors: [...state.movieList[action.index].actors, '']
          },
          ...state.movieList.slice(action.index + 1)
        ]
      }
    case 'REMOVE_LAST_ACTOR':
      let newActorList = [...state.movieList[action.index].actors]
      newActorList.pop()
      return {...state,
        movieList: [
          ...state.movieList.slice(0, action.index),
          {
            ...state.movieList[action.index], 
            actors: newActorList
          },
          ...state.movieList.slice(action.index + 1)
        ]
      }
    case 'FILTER_MOVIES':
      const query = action.query.toLowerCase()
      if (!query) {
        console.log('called')
        return {...state,
          filteredMovieList: state.movieList
        }
      }
      // optimization: limit search to current filtered list if previous query starts with new query
      const searchMovieList = query.startsWith(state.query.toLowerCase()) ? [...state.filteredMovieList] : [...state.movieList]
      const filteredMovieList = searchMovieList.filter(movie =>
        [movie.title, movie.genre, movie.year, ...movie.actors].some(element =>
          element.toLowerCase().includes(query)
        )
      )
      return {...state,
        filteredMovieList,
        query
      }
    case 'CLEAR_QUERY':
      return {...state,
        filteredMovieList: state.movieList,
        query: ''
      }
    default:
      return state
  }
}

const testMovieList = [
  {
    title: 'Home Alone 2',
    genre: 'Comedy',
    rating: '7.7',
    year: '1992',
    actors: [
      'Tom Cruise', 'Tom Hanks', 'Matt Damon'
    ]
  },
  {
    title: 'The Sum of All Fears',
    genre: 'Action',
    rating: '5.6',
    year: '2001',
    actors: [
      'Dwayne Johnson', 'Scarlett Johanssen', 'Catherine Zeta-Jones', 'Morgan Freeman'
    ]
  },
  {
    title: 'Another test movie',
    genre: 'Comedy',
    rating: '8.8',
    year: '2014',
    actors: []
  },
]
