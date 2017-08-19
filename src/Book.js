import React from 'react'
import { DragSource } from 'react-dnd'
import BookPropTypes from './BookPropTypes'
import * as BooksAPI from './BooksAPI'

const bookSource = {
  beginDrag(props) {
    return { id: props.id, shelfName: props.shelfName }
  }
}

function collect(connet) {
  return {
    connectDragSource: connet.dragSource()
  }
}

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  handleChange = (event) => {
    const newValue = event.target.value
    const { shelfName, updateLibrary } = this.props

    if (newValue !== shelfName) {
      const oldValue = shelfName
      const { id } = this.props
      const book = { id }

      updateLibrary({
        id,
        shelfName: newValue
      })

      BooksAPI.update(book, newValue)
        .catch(() => {
          updateLibrary({
            id,
            shelfName: oldValue
          })
        })
    }
  }

  render() {
    const { title, cover, authors, shelfName, connectDragSource } = this.props

    return connectDragSource(
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

export default DragSource('book', bookSource, collect)(Book)
