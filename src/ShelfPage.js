import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import BookShelf from './BookShelf'

class ShelfPage extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  getShelfBooks(shelfName) {
    const { myLibrary } = this.props

    return myLibrary.filter(book => book.shelf === shelfName)
  }

  getShelfsSection() {
    const shelfs = ['currentlyReading', 'wantToRead', 'read']
    const { updateLibrary } = this.props

    return shelfs.map(shelfName => (
      (
        <div key={shelfName}>
          <BookShelf
            updateLibrary={updateLibrary}
            shelfName={shelfName}
            bookList={this.getShelfBooks(shelfName)}
          />
        </div>
      )
    )).reduce((result, component) =>
      result.concat(component), []
    )
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {this.getShelfsSection()}
        </div>

        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

ShelfPage.propTypes = {
  myLibrary: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateLibrary: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(ShelfPage)
