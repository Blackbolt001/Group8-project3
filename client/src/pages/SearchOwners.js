import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { savedOwnerIds, getSavedOwnerIds } from '../utils/localStorage';
import {useMutation} from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';

const SearchOwners = () => {
  const [searchedOwners, setSearchedOwners] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedOwnerIds, setSavedOwnerIds] = useState(getSavedOwnerIds());
  const [savePet, {error}] = useMutation(SAVE_OWNER);
  useEffect(() => {
    return () => savedOwnerIds(savedOwnerIds);
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`*=${searchInput}`);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const ownerData = items.map((owner) => ({
          Id: owner.id,
          name:owner.name,
          username:owner.username,
         pets: owner.info.pets || ['No pets to display'],
       //add option or alert to add pet? 
        interests: owner.info.interests,

       // image: pet.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedOwners(ownerData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePet = async (pet_Id) => {
    const petToSave = searchedPets.find((pet) => pet.pet_Id === pet_Id);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

  
    try {

    const {data} = await savePet({
        variables: {newPet: {...petToSave} },
      });
    setSavedPetIds([...savedPetIds,petToSave.pet_Id]);

  } catch (err) {
    console.log(err);
  }
}}

export default SearchPets;