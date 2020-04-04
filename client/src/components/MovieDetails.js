import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getMovieQuery } from '../queries/queries'

class MovieDetails extends Component {

  displayMovieDetails() {
    const { movie } = this.props.data;

    if (movie) {
      return (
        <div>
          <h2>{movie.name}</h2>
          <p>{movie.genre}</p>
          <p>{movie.director.name}</p>
          <p>All movies by director:</p>
          <ul className="other-movies">
            {
              movie.director.movie.map(item => <li key={item.id}>{item.name}</li>)
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
        {this.displayMovieDetails()}
      </div>
    );
  }
}

export default graphql(getMovieQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.movieId
      }
    }
  }
})(MovieDetails);