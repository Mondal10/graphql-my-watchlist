const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connecting to the database
const uri = 'mongodb://Amit:test1234@ds053958.mlab.com:53958/graphql-net-ninja';
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