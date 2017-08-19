import React from 'react'
import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'

import BookPropTypes from './BookPropTypes'
import Book from './Book'

const bookSource = {
  beginDrag(props) {
    return { ...props }
  }
}

function collect(connet) {
  return {
    connectDragSource: connet.dragSource()
  }
}

class DraggableBook extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    const { id, title, cover, authors, shelf, updateLibrary } = this.props
    const { connectDragSource } = this.props

    return connectDragSource(
      <div>
        <Book
          id={id}
          title={title}
          cover={cover}
          authors={authors}
          shelf={shelf}
          updateLibrary={updateLibrary}
        />
      </div>
    )
  }
}

DraggableBook.propTypes = {
  ...BookPropTypes,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource('book', bookSource, collect)(DraggableBook)
