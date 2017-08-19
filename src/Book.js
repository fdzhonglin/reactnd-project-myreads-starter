import React from 'react'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  handleChange = (event) => {
    const newValue = event.target.value
    const { shelf, updateLibrary } = this.props

    if (newValue !== shelf) {
      const oldValue = shelf

      updateLibrary({
        ...this.props,
        shelf: newValue
      })

      BooksAPI.update({ id: this.props.id }, newValue)
        .catch(() => {
          updateLibrary({
            ...this.props,
            shelf: oldValue
          })
        })
    }
  }

  render() {
    const { title, cover, authors, shelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}
          />

          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleChange}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">
          { authors.join(', ') }
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  shelf: PropTypes.string.isRequired,
  updateLibrary: PropTypes.func.isRequired
}

export default Book
