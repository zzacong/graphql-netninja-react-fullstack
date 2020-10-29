import React from 'react'
import { useQuery } from '@apollo/client'

import { getBookQuery } from '../queries/queries'

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
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
  // data.book.map(book => <p key={book.id}>{book.name}</p>)
  console.log(data)

  return <div id="book-details">{displayBookDetails()}</div>
}

export default BookDetails
