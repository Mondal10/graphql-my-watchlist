import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getMoviesQuery } from '../queries/queries'

// Components
import MovieDetails from './MovieDetails'

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayMovies() {
    let data = this.props.data;

    if (data.loading) {
      return (<div>Loading Movie List...</div>);
    } else {
      return data.movies.map(movie => <li key={movie.id} onClick={(e) => { this.setState({ selected: movie.id }) }}>{movie.name}</li>);
    }
  }

  render() {
    return (
      <div>
        <ul id="movie-list">
          {this.displayMovies()}
        </ul>
        <MovieDetails movieId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getMoviesQuery)(MovieList);