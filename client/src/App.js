import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie'

// apollo client setup
const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql'
  uri: 'https://graphql-watch-list.herokuapp.com/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Amit's Watch List</h1>
          <MovieList />
          <AddMovie />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;