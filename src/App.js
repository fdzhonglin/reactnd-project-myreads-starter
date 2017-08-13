import React from 'react'

import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    this.state = {
      showSearchPage: true,
      bookShelfs: []
    }
  }

  deactivateSearchPage = () => {
    this.setState({
      showSearchPage: false
    })
  }

  render() {
    const currentlyReadingShelf = [
      {
        cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        title: 'Harper Lee',
        authors: ['To Kill a Mockingbird']
      },
      {
        cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
        title: 'Ender\'s Game',
        authors: ['Orson Scott Card']
      }
    ]

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage deactivateSearchPage={this.deactivateSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfName="Currently Reading"
                  bookList={currentlyReadingShelf}
                />
              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
