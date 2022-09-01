const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Owner {
    _id: ID!
    name: String
    email: String
    username: String
    password: String
    age: Int
    interests: String
    pet: [Pet]
  }

  type Chat {
    _id: ID!
    user_1: String!
    user_2: String!
    messages: [Message]
  }

  type Auth {
    token: ID!
    owner: Owner
  }

  type Pet {
    pet_name: String
    breed: String
    age: Int
    nature: String
    gender: String
  }

  type Message {
   _id: ID!
   content: String!
   time: String
   user: String!
   chat: Chat
  }

  input petInput {
    pet_name: String!
    breed: String!
    age: Int
    nature: String!
    gender: String!
  }

  input messageInput {
    content: String!
    username: String!
  }

  type Query {
    owner: [Owner]
    findOwnerById(_id: ID!): Owner
    pet(_id: String): Owner
    chat(user: String): [Chat]
    message(user: String, chat: String): [Message]
  }
  
  type Mutation {
    createOwner(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPet(pet_name: String, age: Int, breed: String, gender: String, nature: String): Owner
    updatePet(Pet: petInput!): Owner
    createChat(user_1: String!, user_2: String!): Chat
    createMessage(messages: messageInput!): Chat
  }
`;

module.exports = typeDefs;
