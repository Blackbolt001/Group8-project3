import { gql } from '@apollo/client';

export const QUERY_OWNER= gql`
  query owner {
    owner {
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

export const QUERY_PET = gql`
  query pet($_id: String) {
   pet(_id: $_id) {
    _id
    pet_name
    breed
    age
    nature
    gender
    }
  }
`;
