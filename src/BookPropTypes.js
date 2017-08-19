import PropTypes from 'prop-types'

const BookPropTypes = {
  id: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  shelf: PropTypes.string.isRequired,
  updateLibrary: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func
}

export default BookPropTypes
