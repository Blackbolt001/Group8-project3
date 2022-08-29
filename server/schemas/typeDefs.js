const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Owner {
    _id: ID!
    name: String!
    username: String!
    password: String!
    age:
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
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
