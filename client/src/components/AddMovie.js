import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import flowright from 'lodash.flowright';

import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries'

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayDirectors() {
    let data = this.props.getAuthorsQuery;

    if (data.loading) {
      return (<option disabled>Loading Authors...</option>);
    } else {
      return data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }]
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
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
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
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddMovie);