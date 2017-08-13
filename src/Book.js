import React from 'react'
import BookPropTypes from './BookPropTypes'
import * as BooksAPI from './BooksAPI'

const NONE_SHELF = 'none'

class Book extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shelfName: NONE_SHELF
    }
  }

  handleChange = (event) => {
    const newValue = event.target.value

    if (newValue !== NONE_SHELF) {
      const oldValue = this.state.shelfName
      const { id } = this.props
      const book = { id }

      BooksAPI.update(book, newValue)
        .catch(() => {
          this.setState({
            shelfName: oldValue
          })
        })
    }

    this.setState({
      shelfName: newValue
    })
  }

  render() {
    const { title, cover, authors } = this.props
    const { shelfName } = this.state

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url("${cover}")` }}
          />

          <div className="book-shelf-changer">
            <select value={shelfName} onChange={this.handleChange}>
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
          { authors.map(author => (
            <p key={author}>
              {author}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  ...BookPropTypes
}

export default Book
