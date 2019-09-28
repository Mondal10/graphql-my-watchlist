const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema } = graphql;

// Dummy data
const books = [
    { name: 'Immortals of Meluha', genre: 'fiction', id: '1', authorId: '1' },
    { name: 'The Secret', genre: 'personal development', id: '2', authorId: '2' },
    { name: 'blah blah', genre: 'brruuuuu', id: '3', authorId: '3' },
    { name: 'blooh blooh', genre: 'trruuuuu', id: '4', authorId: '4' },
    { name: 'holaaa', genre: 'horror', id: '5', authorId: '3' },
    { name: 'BHOLLAAA', genre: 'Comedy', id: '6', authorId: '4' },
];

const authors = [
    { name: 'Amish Tripathi', age: 30, id: '1' },
    { name: 'Rhonda Byrnes', age: 40, id: '2' },
    { name: 'Nandan Grover', age: 23, id: '3' },
    { name: 'Amit Mondal', age: 23, id: '4' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // Parent(This Object) is BookType
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // Parent(This Object) is AuthorType
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // Code to get data from DB/ other source
                return _.find(books, { id: args.id });
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});