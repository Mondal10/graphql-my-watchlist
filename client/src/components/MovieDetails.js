import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries'

class MovieDetails extends Component {

  displayBookDetails() {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by author:</p>
          <ul className="other-books">
            {
              book.author.book.map(item => <li key={item.id}>{item.name}</li>)
            }
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>No Movies Found</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div id="movie-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(MovieDetails);