import PropTypes from 'prop-types'

const BookPropTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired
}

export default BookPropTypes
