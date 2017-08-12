import React from 'react'
import PropTypes from 'prop-types'
import BookPropTypes from './BookPropTypes'
import Book from './Book'

class BookShelf extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    const { shelfName, bookList } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { bookList.map(book => (
              <li key={book.title}>
                <Book
                  cover={book.cover}
                  authors={book.authors}
                  title={book.title}
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
  bookList: PropTypes.arrayOf(
    PropTypes.shape({
      ...BookPropTypes
    })
  ).isRequired
}

export default BookShelf
