import { gql } from '@apollo/client';

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