import React from 'react';
import Auth from '../utils/auth';
import { removePetId } from '../utils/localStorage';
import {useQuery,useMutation} from "@apollo/client";
//import { GET_ME } from '../utils/queries';
import {REMOVE_OWNER} from "../utils/mutations";

const SavedOwners = () => {
  const {loading,data} = useQuery(GET_ME);
  const [removeOwner,{error}] = useMutation(REMOVE_OWNER);

  const userData = data?.me || {};
  if (loading) {
    return <h2>LOADING...</h2>
  }

const handleDeleteOwner = async (ownerId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
}
        try { 
          const {data} = await removeOwner({
     variables:{ownerId},
  });

          removePetId(ownerId);
}
        catch(err) {
          console.error(err);
}
      };
    }

export default SavedOwners;