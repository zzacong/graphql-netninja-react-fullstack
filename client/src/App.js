import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import BookList from './components/BookList'
import AddBook from './components/AddBook'

const uri = 'http://localhost:4000/graphql'

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Zac's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}

export default App
