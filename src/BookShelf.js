import React from 'react'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

const shelfTarget = {
  canDrop(props, monitor) {
    const book = monitor.getItem()

    if (book.shelfName !== props.shelfName) {
      return true
    }

    return false
  },

  drop(props, monitor) {
    const book = monitor.getItem()
    const { shelfName, updateLibrary } = props

    updateLibrary({ id: book.id, shelfName })
    BooksAPI.update({ id: book.id }, shelfName)
      .catch(() => {
        updateLibrary(book)
      })
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

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
    const { connectDropTarget, isOver, canDrop } = this.props

    let shelfClass = 'bookshelf'
    if (isOver && canDrop) {
      shelfClass = 'bookshelf bookshelf--droppable'
    }

    return connectDropTarget(
      <div className={shelfClass}>
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
                  cover={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''}
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
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  shelfName: PropTypes.string.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  bookList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DropTarget('book', shelfTarget, collect)(BookShelf)
