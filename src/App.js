import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'

import SearchPage from './SearchPage'
import ShelfPage from './ShelfPage'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.state = {
      myLibrary: []
    }
  }

  componentWillMount = () => {
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
        <Route
          exact
          path="/"
          render={() => (
            <ShelfPage
              myLibrary={myLibrary}
              updateLibrary={this.updateLibrary}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage
              myLibrary={myLibrary}
              updateLibrary={this.updateLibrary}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
