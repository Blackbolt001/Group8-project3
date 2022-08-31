import { gql } from '@apollo/client';
export const ADD_OWNER = gql`
  mutation addOwner($name: String!, $username: String!,$password: String!, $age: Int, $interests: String!, $pet: [Pet]) {
`
export const UPDATE_OWNER = gql`
  mutation createOwner($name: String!, $username: String!,$password: String!, $age: Int, $interests: String!, $pet: [Pet]) {
    createMatchup(name: $name, username: $username,password: $password, age: $age, interests: $interests, pet: $pet) {
      _id
      name
      username
      password
      age
      interests
      pet
    }
  }
`;

export const CREATE_OWNER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PET = gql`
  mutation createVote($petname: String!,$breed: String!, $age: Int, $nature: String!, $Gender: String!) {
    createVote(petname:$petname, breed: $breed, age: $age, nature:$nature, gender:$ge) {
      _id
      pet_name
      breed
      age
     nature
      gender
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_CHAT = gql`
mutation Mutation($user1: String!, $user2: String!) {
  createChat(user_1: $user1, user_2: $user2) {
    _id
user_1
user_2
  }
  }
`;

export const REMOVE_PET = gql`
mutation removePet($pet_Id:ID!) {
  removePet(pet_Id:$pet_Id) {
    pet_Id
    pet_name
    savedPets {
      breed
      age
      nature
      gender
  }
}
} 
` ;
export const REMOVE_OWNER = gql`
mutation removeOwner($ownerId:ID!) {
  removeOwner(ownerId:$ownerId){
    name
    username
    savedOwners {
      age
      interests
      pets
    }
  }
}
`;

export const SAVE_PET = gql`
mutation savePet($petData:petData!) {
  savePet(petData:$petData) {
    pet_Id
    pet_name
    savedPets {
      breed
      age
      nature
      gender
    }
  }
}
`;
//export const SEARCH_OWNERS = gql`
//export const SAVED_OWNERS
//export const SEARCH_PETS 
//export const SAVED_PETS
//mutation searchOwner`

