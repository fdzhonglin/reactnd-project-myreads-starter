import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      books: [],
      queryString: ''
    }
  }

  getShelfName(book) {
    const { id } = book
    const { myLibrary } = this.props

    const sameBook = myLibrary.find(bookInLibrary => (bookInLibrary.id === id))

    return sameBook ? sameBook.shelf : 'none'
  }

  queryChange = (event) => {
    const newQueryString = event.target.value.trim()
    this.setState({
      queryString: newQueryString
    })

    if (newQueryString.length === 0) {
      this.setState({
        books: []
      })
      return
    }

    const MAX_RESULT = 10
    BooksAPI.search(newQueryString, MAX_RESULT)
      .then((booksReturned) => {
        if (booksReturned.error) {
          this.setState({
            books: []
          })

          return
        }
        this.setState({
          books: booksReturned ? booksReturned.map(book => ({
            id: book.id,
            cover: book.imageLinks ? book.imageLinks.thumbnail : '',
            authors: book.authors || [],
            title: book.title,
            shelf: book.shelf ? book.shelf : 'none'
          })) : []
        })
      })
      .catch(() => {
        this.setState({
          books: []
        })
      })
  }

  render() {
    const { updateLibrary } = this.props
    const { books, queryString } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={queryString}
              onChange={this.queryChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { books.map(book => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  cover={book.cover}
                  authors={book.authors}
                  title={book.title}
                  shelf={this.getShelfName({ id: book.id })}
                  updateLibrary={updateLibrary}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  myLibrary: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateLibrary: PropTypes.func.isRequired
}

export default SearchPage
