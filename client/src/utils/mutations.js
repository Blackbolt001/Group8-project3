import { gql } from '@apollo/client';

export const CREATE_OWNER = gql`
  mutation createOwner($username: String!, $email: String!, $password: String!) {
    createOwner(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

// export const CREATE_PET = gql`
//   mutation createPet($pet_name: String!, $breed: String!, $age: Int, $nature: String!, $gender: String!) {
//     createPet(petname:$pet_name, breed: $breed, age: $age, nature: $nature, gender: $gender) {
//       _id
//       pet_name
//       breed
//       age
//       nature
//       gender
//     }
//   }
// `;

export const CREATE_PET = gql`
  mutation createPet($pet: petInput!) {
    createPet(pet: $pet) {
      _id
      username
      email
      pet {
        pet_name
        breed
        age
        nature
        gender
      }
    }
  }
  }
`;

export const UPDATE_PET = gql`
  mutation updatePet($pet_name: String!,$breed: String!, $age: Int, $nature: String!, $gender: String!) {
    updatePet(pet_name: $pet_name, breed: $breed, age: $age, nature: $nature, gender: $gender) {
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