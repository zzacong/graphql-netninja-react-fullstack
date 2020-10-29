import { gql } from '@apollo/client'

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export { getAuthorsQuery, getBookQuery, getBooksQuery, addBookMutation }
