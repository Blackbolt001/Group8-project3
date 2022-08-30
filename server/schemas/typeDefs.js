const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Owner {
    _id: ID!
    name: String!
    username: String!
    password: String!
    age: Int
    interests: String!
    pet: [Pet]
  }

  type Pet {
    _id: ID!
    pet_name: String!
    breed: String!
    age: Int
    nature: String!
    gender: String!
  }

  type Query {
    owner: [Owner]
    pet(_id: String): [Pet]
  }

`;

module.exports = typeDefs;
