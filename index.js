var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var mongo = require('./mongo')

// Define the Author type
var authorType = new graphql.GraphQLObjectType({
  name: 'Author',
  fields: {
    _id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    author: {
      type: authorType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: async (_, {id}) => {
        return await mongo.databaseOperation(mongo.operations.findAuthorByID, {id: id})
        //return authors.filter((author) => author._id === id)[0];
      }
    },
    authors: {
        type: graphql.GraphQLList(authorType),
        resolve: async (_, args) => {
            return await mongo.databaseOperation(mongo.operations.findAuthors)
            //return authors;
          }
    }
  }
});

var schema = new graphql.GraphQLSchema({query: queryType});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');