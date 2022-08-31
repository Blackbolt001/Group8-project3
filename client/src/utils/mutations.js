import { gql } from '@apollo/client';

export const CREATE_OWNER = gql`
  mutation createOwner($name: String!, $username: String!, $email: String!, $password: String!, $age: Int, $interests: String!, $pet: [Pet]) {
    createOwner(name: $name, username: $username, email: $email, password: $password, age: $age, interests: $interests, pet: $pet) {
      _id
      name
      username
      email
      password
      age
      interests
      pet
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