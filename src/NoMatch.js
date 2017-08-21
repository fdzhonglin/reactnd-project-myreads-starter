
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class NoMatch extends Component {
  render() {
    return (
      <div className="no-match">
        <h1>404</h1>
        <p>PAGE NOT FOUND</p>
        <Link to="/" className="no-match__back-to-home">
          Back to Home
        </Link>
      </div>
    )
  }
}

export default NoMatch
