const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connecting to the database
const uri = 'mongodb://Amit:Test1234@ds263368.mlab.com:63368/graphql-amit-watch-list';

mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

// Creating middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Listen port
app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
});