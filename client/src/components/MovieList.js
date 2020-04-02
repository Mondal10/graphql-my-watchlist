import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries'

// Components
import MovieDetails from './MovieDetails'

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayBooks() {
    let data = this.props.data;

    if (data.loading) {
      return (<div>Loading Movie List...</div>);
    } else {
      return data.books.map(book => <li key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}>{book.name}</li>);
    }
  }

  render() {
    return (
      <div>
        <ul id="movie-list">
          {this.displayBooks()}
        </ul>
        <MovieDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(MovieList);