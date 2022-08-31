import React from 'react';
import Auth from '../utils/auth';
import { removePetId } from '../utils/localStorage';
import {useQuery,useMutation} from "@apollo/client";
//import { GET_ME } from '../utils/queries';
import {REMOVE_PET} from "../utils/mutations";

const SavedPets = () => {
  const {loading,data} = useQuery(GET_ME);
  const [removePet,{error}] = useMutation(REMOVE_PET);

  const userData = data?.me || {};
  if (loading) {
    return <h2>LOADING...</h2>
  }

const handleDeletePet = async (pet_Id) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
}
        try { 
          const {data} = await removePet({
     variables:{pet_Id},
  });

          removePetId(pet_Id);
}
        catch(err) {
          console.error(err);
}
      };
    }

export default SavedPets;