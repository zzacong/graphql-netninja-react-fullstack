import React, { useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { GET_AUTHORS, GET_BOOKS, ADD_BOOK } from '../queries/queries'

const AddBook = () => {
  const { loading, error, data: authorsData } = useQuery(GET_AUTHORS)
  const [
    addBook,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_BOOK)
  const nameRef = useRef()
  const genreRef = useRef()
  const authorIdRef = useRef()

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading books...</option>
    if (error) return <option disabled>Error...</option>
    return authorsData.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ))
  }

  const submitForm = e => {
    e.preventDefault()
    addBook({
      variables: {
        name: nameRef.current.value,
        genre: genreRef.current.value,
        authorId: authorIdRef.current.value,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    })
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name: </label>
        <input type="text" ref={nameRef} />
      </div>

      <div className="field">
        <label>Genre name: </label>
        <input type="text" ref={genreRef} />
      </div>

      <div className="field">
        <label>Author: </label>
        <select ref={authorIdRef}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
      {mutationLoading && <p>Mutation Loading...</p>}
      {mutationError && <p>`Error! ${error.message}`</p>}
    </form>
  )
}

export default AddBook
