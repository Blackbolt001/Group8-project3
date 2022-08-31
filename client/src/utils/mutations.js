import { gql } from '@apollo/client';

export const CREATE_OWNER = gql`
  mutation createOwner($username: String!, $email: String!, $password: String!) {
    createOwner(username: $username, email: $email, password: $password) {
      token
      owner {
        _id
        username
      }
    }
  }
`;
 
export const CREATE_PET = gql`
  mutation createPet($petname: String!,$breed: String!, $age: Int, $nature: String!, $Gender: String!) {
    createPet(petname:$petname, breed: $breed, age: $age, nature:$nature, gender:$ge) {
      _id
      pet_name
      breed
      age
      nature
      gender
    }
  }
`;

export const UPDATE_PET = gql`
  mutation createPet($petname: String!,$breed: String!, $age: Int, $nature: String!, $Gender: String!) {
    createPet(petname: $petname, breed: $breed, age: $age, nature: $nature, gender: $gender) {
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
      owner {
        _id
        username
      }
    }
  }
`;