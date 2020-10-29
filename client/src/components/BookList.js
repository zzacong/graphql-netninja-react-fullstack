import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery)
  const [selected, setSelected] = useState(null)

  const displayBooks = () => {
    if (loading) return <li>Loading books...</li>
    if (error) return <li>`Error! ${error.message}`</li>

    return data.books.map(book => (
      <li key={book.id} onClick={() => setSelected(book.id)}>
        {book.name}
      </li>
    ))
  }

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  )
}

export default BookList
