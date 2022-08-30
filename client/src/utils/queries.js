import { gql } from '@apollo/client';

export const QUERY_OWNER = gql`
  query allProfiles {
    profiles {
        _id
        name
        age
        interests
        pet
    }
  }
`;