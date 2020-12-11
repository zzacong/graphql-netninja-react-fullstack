import React from 'react'
import { useQuery } from '@apollo/client'

import { GET_BOOK } from '../queries/queries'

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  })

  const displayBookDetails = () => {
    if (loading) return <p>Loading books...</p>
    if (error) return <p>`Error! ${error.message}`</p>
    const book = data.book
    return book ? (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author: </p>
        <ul className="other-books">
          {book.author.books.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>No book selected.</div>
    )
  }

  return <div id="book-details">{displayBookDetails()}</div>
}

export default BookDetails
