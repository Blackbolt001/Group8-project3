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
`;

export const UPDATE_PET = gql`
  mutation updatePet($pet_name: String!,$breed: String!, $age: Int, $nature: String!, $gender: String!) {
    updatePet(pet_name: $pet_name, breed: $breed, age: $age, nature: $nature, gender: $gender) {
      _id
      username
      email
      pet {
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

export const CREATE_CHAT = gql`
mutation Mutation($user1: String!, $user2: String!) {
  createChat(user_1: $user1, user_2: $user2) {
    user_2
    user_1
  }
}
`;
export const CREATE_MESSAGE = gql`
mutation CreateMessage($content: String!, $user: String!, $chat: String!) {
  createMessage(content: $content, user: $user, chat: $chat) {
 content
 user
_id
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

// export const UPLOAD_IMAGE = gql`
//   mutation uploadImage() {
//     uploadImage() {
//       _id
      
//     }
//   }
// `