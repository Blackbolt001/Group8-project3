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


export const QUERY_MESSAGE = gql`
query Message($user: String, $chat: String) {
  message(user: $user, chat: $chat) {
    content
    user
  }
}
`;
export const QUERY_CHAT = gql`
query Query {
  chat {
    user_1
    user_2
  }
}
`;


export const GET_ME = gql`
{   
me
    {
      owner {
        _id
        name
        username
        age
        interests
        pet
{
  pet_id 
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

