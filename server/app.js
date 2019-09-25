const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// Creating middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Listen port
app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
});