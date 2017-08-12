import React from 'react'
import BookPropTypes from './BookPropTypes'

class Book extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const { title, cover, authors } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: cover }}
          />

          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    )
  }
}

Book.propTypes = {
  ...BookPropTypes
}

export default Book
