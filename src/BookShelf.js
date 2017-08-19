import React from 'react'
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'

import DraggableBook from './DraggableBook'
import * as BooksAPI from './BooksAPI'

const shelfTarget = {
  canDrop(props, monitor) {
    const book = monitor.getItem()

    if (book.shelf !== props.shelf) {
      return true
    }

    return false
  },

  drop(props, monitor) {
    const book = monitor.getItem()
    const { shelf, updateLibrary } = props

    updateLibrary({ ...book, shelf })
    BooksAPI.update({ id: book.id }, shelf)
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
  static changeToReadableString(shelf) {
    return shelf
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => (str.toUpperCase()))
  }

  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    const { shelf, bookList, updateLibrary } = this.props
    const { connectDropTarget, isOver, canDrop } = this.props

    let shelfClass = 'bookshelf'
    if (isOver && canDrop) {
      shelfClass = 'bookshelf bookshelf--droppable'
    }

    return connectDropTarget(
      <div className={shelfClass}>
        <h2 className="bookshelf-title">
          { BookShelf.changeToReadableString(shelf) }
        </h2>

        <div className="bookshelf-books">
          <ol className="books-grid">
            { bookList.map(book => (
              <li key={book.id}>
                <DraggableBook
                  updateLibrary={updateLibrary}
                  id={book.id}
                  cover={book.cover}
                  authors={book.authors}
                  title={book.title}
                  shelf={book.shelf}
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
  shelf: PropTypes.string.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  bookList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DropTarget('book', shelfTarget, collect)(BookShelf)
