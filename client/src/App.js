import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import BookList from './components/BookList';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Amit's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
