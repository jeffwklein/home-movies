import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddNewMovie from './components/AddNewMovie'
import ViewMovies from './components/ViewMovies'
import EditMovies from './components/EditMovies'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      navItems: [
        { label: 'My Movies', component: <ViewMovies/> },
        { label: 'Add Movie', component: <AddNewMovie/> },
        { label: 'Edit Movies', component: <EditMovies/> },
      ]
    }
  }

  render() {
    const { navItems, selectedIndex }  = this.state
    return (
      <div className='app'>
        <div className='app__nav'>
          <div className='app__nav__header'>
            Home Movies
          </div>
          {
            // populate the nav menu
            navItems.map((item, i) =>
              <div key={i}
                className={'app__nav' + (selectedIndex === i ? '__selected' : '__item')}
                onClick={ () => this.setState({ selectedIndex: i })}>
                { item.label }
              </div>
            )
          }
        </div>
        { navItems[selectedIndex].component }
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(App)

