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

  updateLibrary = (book) => {
    const { id, shelfName } = book
    const { myLibrary } = this.state

    this.setState({
      myLibrary: myLibrary.map((bookInLibrary) => {
        if (bookInLibrary.id === id) {
          bookInLibrary.shelf = shelfName
        }

        return bookInLibrary
      })
    })
  }

  render() {
    const { myLibrary } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage
            deactivateSearchPage={this.deactivateSearchPage}
            myLibrary={myLibrary}
            updateLibrary={this.updateLibrary}
          />
        ) : (
          <ShelfPage myLibrary={myLibrary} updateLibrary={this.updateLibrary} />
        )}
      </div>
    )
  }
}

export default BooksApp
