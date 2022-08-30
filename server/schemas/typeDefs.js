const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Owner {
    _id: ID!
    name: String!
    email:String!
    petCount:Int
    savedPets: [Pet]
    username: String!
    password: String!
    age: Int
    interests: String!
    pet: [Pet]
  }
type Auth {
  token:ID!
  owner:Owner
}
  type Pet {
    pet_id: ID!
    pet_name: String!
    breed: String!
    age: Int
    nature: String!
    gender: String!
  }
  input petInput {
    pet_id: ID!
    pet_name: String!
    breed: String!
    age: Int
    nature: String!
    gender: String!
  }

  type Query {
    owner: [Owner]
    me:Owner
    pet(_id: String): [Pet]
  }
  type Mutation {
    addOwner(username:String!,email:String!,password:String!):Auth
    login(email:String!,password:String!):Auth
    savePet(pet:petInput!):Owner
    removePet(petId:ID!):Owner
  }

`;

module.exports = typeDefs;
