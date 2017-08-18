import React from 'react'
import PropTypes from 'prop-types'
import BookPropTypes from './BookPropTypes'
import Book from './Book'

class BookShelf extends React.Component {
  static changeToReadableString(shelfName) {
    return shelfName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => (str.toUpperCase()))
  }

  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    const { shelfName, bookList, updateLibrary } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          { BookShelf.changeToReadableString(shelfName) }
        </h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            { bookList.map(book => (
              <li key={book.id}>
                <Book
                  updateLibrary={updateLibrary}
                  id={book.id}
                  cover={book.imageLinks ? book.imageLinks.thumbnail : ''}
                  authors={book.authors}
                  title={book.title}
                  shelfName={book.shelf ? book.shelf : 'none'}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  bookList: PropTypes.arrayOf(
    PropTypes.shape({
      ...BookPropTypes
    })
  ).isRequired
}

export default BookShelf
