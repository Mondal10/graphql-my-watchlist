import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from 'lodash.flowright';

import { getMoviesQuery, getDirectorsQuery, addMovieMutation } from '../queries/queries'

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      directorId: ''
    }
  }

  displayDirectors() {
    let data = this.props.getDirectorsQuery;

    if (data.loading) {
      return (<option disabled>Loading Directors...</option>);
    } else {
      return data.directors.map(director => <option key={director.id} value={director.id}>{director.name}</option>);
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addMovieMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        directorId: this.state.directorId,
      },
      refetchQueries: [{ query: getMoviesQuery }]
    });
  }

  render() {
    return (
      <form id="add-movie" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Movie name:</label>
          <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Rating:</label>
          <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Director:</label>
          <select onChange={(e) => this.setState({ directorId: e.target.value })}>
            <option>Select director</option>
            {this.displayDirectors()}
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}

export default flowright(
  graphql(getDirectorsQuery, { name: "getDirectorsQuery" }),
  graphql(addMovieMutation, { name: "addMovieMutation" })
)(AddMovie);