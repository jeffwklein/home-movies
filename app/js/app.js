import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddNewMovie from './components/AddNewMovie'
import ViewAndEditMovies from './components/ViewAndEditMovies'
import SearchMovies from './components/SearchMovies'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      //content: null,
      component: null,
      selectedIndex: null,
      navItems: [
        { label: "Add New Movie", component: <AddNewMovie/> },
        { label: "View and Edit Movies", component: <ViewAndEditMovies/> },
        { label: "Search Movies", component: <SearchMovies/> },
      ]
    }
  }

  render() {
    const { component, navItems, selectedIndex }  = this.state
    return (
      <div className='app'>
        <div className='app__nav'>
          <div className='app__nav__header'>
            Home Movie DB
          </div>
          {
            navItems.map((item, i) => {
              const cssClass = 'app__nav' + (selectedIndex === i ? '__selected' : '__item')
              return (
                <div className={cssClass} key={i} onClick={ () => this.setState({ component: item.component, selectedIndex: i })}>
                  { item.label }
                </div>
              )
            })
          }
        </div>
        { component }
      </div>
    )
  }
}

export default connect(
  (store) => ({ store }),
  (dispatch) => ({})
)(App)

