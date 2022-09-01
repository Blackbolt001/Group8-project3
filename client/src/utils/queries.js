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
      pet{
        pet_name
      }
    }
  }
`;

// export const QUERY_PET = gql`
//   query pet($_id: String) {
//    pet(_id: $_id) {
//     _id
//     pet_name
//     breed
//     age
//     nature
//     gender
//     }
//   }
// `;

// export const QUERY_PET = gql`
//   query owner($_id: ID!) {
//     owner(_id: $_id) {
//       Pet {
//         _id
//         pet_name
//         breed
//         age
//         nature
//         gender
//       }
//     }
//   }
// `;

export const QUERY_OWNER_BY_ID = gql`
  query findOwnerById($_id: ID!) {
    findOwnerById(_id: $_id) {
      Pet {
        _id
        pet_name
        breed
        age
        nature
        gender
      }
    }
  }
`;


export const QUERY_MESSAGE = gql`
query Message($user: String, $chat: String) {
  message(user: $user, chat: $chat) {
    content
    user
    _id
    name
  }
}
`;
export const QUERY_CHAT = gql`
query Query($user: String) {
  chat(user: $user) {
    user_1
    user_2
    _id
  }
}
`;