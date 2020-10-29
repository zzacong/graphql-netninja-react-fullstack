const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const schema = require('./schema/schema')
const { MongoUri } = require('./config/keys')

const app = express()

// Allow cross origin requests
app.use(cors())

// Connect to MongoDB
mongoose.connect(MongoUri, {
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
