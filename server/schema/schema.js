const { gql } = require('apollo-server')
const Book = require('../models/book')
const Author = require('../models/author')

const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book!]
  }

  type Query {
    book(id: ID): Book
    author(id: ID!): Author
    books: [Book!]
    authors: [Author!]
  }

  type Mutation {
    addBook(name: String!, genre: String!, authorId: ID!): Book
    addAuthor(name: String!, age: Int!): Author
  }
`

const resolvers = {
  Query: {
    book: (_parent, args) => Book.findById(args.id),
    author: (_parent, args) => Author.findById(args.id),
    books: () => Book.find({}),
    authors: () => Author.find({}),
  },
  Book: {
    author: parent => Author.findById(parent.authorId),
  },
  Author: {
    books: parent => Book.find({ authorId: parent.id }),
  },
  Mutation: {
    addBook: (_parent, args) => {
      const book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      })
      return book.save()
    },
    addAuthor: (_parent, args) => {
      const author = new Author({
        name: args.name,
        age: args.age,
      })
      return author.save()
    },
  },
}

module.exports = { typeDefs, resolvers }
