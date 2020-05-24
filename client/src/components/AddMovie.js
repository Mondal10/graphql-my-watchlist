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
      directorId: '',
      imgUrl: '',
      duration: 0,
      rating: 0.0,
    };
    this.formRef = React.createRef();
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
        imgUrl: this.state.imgUrl,
        duration: this.state.duration,
        rating: this.state.rating,
      },
      refetchQueries: [{ query: getMoviesQuery }]
    });

    this.resetForm();
  }

  resetForm() {
    this.formRef.current.reset();
  }

  render() {
    return (
      <form id="add-movie" ref={this.formRef} onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Movie name:</label>
          <input placeholder="eg: Batman" type="text" required onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Cover Image:</label>
          <input placeholder="eg: image-url.jpg" type="url" required onChange={(e) => this.setState({ imgUrl: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input placeholder="eg: Action" type="text" required onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Duration:</label>
          <input placeholder="eg: 152" type="number" required onChange={(e) => this.setState({ duration: parseInt(e.target.value) })} />
        </div>
        <div className="field">
          <label>Rating:</label>
          <input placeholder="eg: 7.8" type="number" min="1" max="10" step="0.1" required onChange={(e) => this.setState({ rating: parseFloat(e.target.value) })} />
        </div>
        <div className="field">
          <label>Director:</label>
          <select required onChange={(e) => this.setState({ directorId: e.target.value })}>
            <option value="">Select director</option>
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