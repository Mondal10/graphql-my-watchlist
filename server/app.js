const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connecting to the database
// const uri = `mongodb://${process.env.MONGO_URI}/graphql-amit-watch-list`;
const uri = `mongodb+srv://${process.env.MONGO_URI}@graphql-amit-watch-list.mphpf.mongodb.net/graphql-amit-watch-list?retryWrites=true&w=majority`;

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
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
});
