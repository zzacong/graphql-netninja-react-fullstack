require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB'))

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
