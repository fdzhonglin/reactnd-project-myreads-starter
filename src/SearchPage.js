import React from 'react'
import PropTypes from 'prop-types'
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
    const newQueryString = event.target.value
    this.setState({
      queryString: newQueryString
    })
    const MAX_RESULT = 10
    BooksAPI.search(newQueryString, MAX_RESULT)
      .then((booksReturned) => {
        this.setState({
          books: booksReturned ? booksReturned.map(book => ({
            cover: book.imageLinks.thumbnail ? book.imageLinks.thumbnail : '',
            title: book.title,
            authors: book.authors || [],
            id: book.id
          })) : []
        })
      })
      .catch(() => {
        // TODO(johnny) Need find a better way to improve UX
      })
  }

  render() {
    const { deactivateSearchPage, updateLibrary } = this.props
    const { books, queryString } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={deactivateSearchPage}>Close</a>
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
                  shelfName={this.getShelfName({ id: book.id })}
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
  deactivateSearchPage: PropTypes.func.isRequired,
  myLibrary: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateLibrary: PropTypes.func.isRequired
}

export default SearchPage
