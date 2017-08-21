import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import SearchPage from './SearchPage'
import ShelfPage from './ShelfPage'
import NoMatch from './NoMatch'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.state = {
      myLibrary: []
    }
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => (
        this.setState({
          myLibrary: books.map(book => ({
            id: book.id,
            cover: book.imageLinks ? book.imageLinks.thumbnail : '',
            authors: book.authors || [],
            title: book.title,
            shelf: book.shelf ? book.shelf : 'none'
          }))
        })
      ))
      .catch(() => {
        // TODO(johnny) Handle error of network
      })
  }

  updateLibrary = (book) => {
    const { id, shelf } = book
    const { myLibrary } = this.state

    const bookInLibrary = myLibrary.find(aBook => (aBook.id === id))

    if (bookInLibrary) {
      this.setState({
        myLibrary: myLibrary.map((aBook) => {
          if (aBook.id === id) {
            aBook.shelf = shelf
          }

          return aBook
        })
      })
    } else {
      this.setState({
        myLibrary: [...myLibrary, book]
      })
    }
  }

  render() {
    const { myLibrary } = this.state

    return (
      <div className="app">
        <Switch>
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

          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
