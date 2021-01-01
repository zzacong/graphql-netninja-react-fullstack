// const { ApolloServer } = require('apollo-server')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const { typeDefs, resolvers } = require('./schema/schema')
const { MongoUri } = require('./config/keys')

// Connect to MongoDB
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB'))

// * Using Apollo Server (BASIC)
// const server = new ApolloServer({ typeDefs, resolvers })
// const PORT = process.env.PORT || 4000
// server.listen(PORT).then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })

// * Using Express Middleware (CORS integrated)
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
