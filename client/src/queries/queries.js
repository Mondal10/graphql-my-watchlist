import { gql } from 'apollo-boost';

const getMoviesQuery = gql`
  {
    movies {
        name
        id
    }
  }
`;

const getDirectorsQuery = gql`
  {
    directors {
        name
        id
    }
  }
`;

const addMovieMutation = gql`
  mutation($name: String!, $genre: String!, $directorId: ID!, $imgUrl: String!, $duration: Int!, $rating: Float!){
    addMovie(name:$name, genre:$genre, directorId:$directorId, imgUrl:$imgUrl, duration:$duration, rating:$rating){
      name
      id
    }
  }
`;

const getMovieQuery = gql`
  query($id:ID){
    movie(id:$id){
      id
      name
      genre
      imgUrl
      duration
      rating
      director {
        id
        name
        age
        movie {
          name
          id
        }
      }
    }
  }
`;

export { getMoviesQuery, getDirectorsQuery, addMovieMutation, getMovieQuery }