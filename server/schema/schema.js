const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema} = graphql;

// Dummy data
const books = [
    {name:'Immortals of Meluha', genre:'fiction', id:'1'},
    {name:'The Secret', genre:'personal development', id:'2'},
    {name:'blah blah', genre:'brruuuuu', id:'3'},
    {name:'blooh blooh', genre:'trruuuuu', id:'4'},
];

const authors = [
    {name: 'Amish Tripathi', age: 30, id: '1'},
    {name: 'Rhonda Byrnes', age: 40, id: '2'},
    {name: 'Nandan Grover', age: 23, id: '3'},
    {name: 'Amit Mondal', age: 23, id: '4'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent, args) {
                // Code to get data from DB/ other source
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});