import React from 'react'

import './App.css'

import SearchPage from './SearchPage'
import ShelfPage from './ShelfPage'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.state = {
      showSearchPage: true,
      myLibrary: []
    }
  }


  deactivateSearchPage = () => {
    this.setState({
      showSearchPage: false
    })

    BooksAPI.getAll()
      .then(books => (
        this.setState({
          myLibrary: books
        })
      ))
      .catch(() => {
        // TODO(johnny) Handle error of network
      })
  }

  render() {
    const { myLibrary } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage deactivateSearchPage={this.deactivateSearchPage} />
        ) : (
          <ShelfPage myLibrary={myLibrary} />
        )}
      </div>
    )
  }
}

export default BooksApp
