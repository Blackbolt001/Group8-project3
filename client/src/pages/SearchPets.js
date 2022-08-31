import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { savedPetIds, getSavedPetIds } from '../utils/localStorage';
import {useMutation} from '@apollo/client';
import { SAVE_PET } from '../utils/mutations';

const SearchPets = () => {
  const [searchedPets, setSearchedPets] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedPetIds, setSavedPetIds] = useState(getSavedPetIds());
  const [savePet, {error}] = useMutation(SAVE_PET);
  useEffect(() => {
    return () => savedPetIds(savedPetIds);
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

      const petData = items.map((pet) => ({
        pet_Id: pet.id,
        pet_name:pet.name,
        owners: pet.info.owners || ['No owner to display'],
        breed: pet.info.breed,
        age: pet.age,

        nature: pet.info.nature,
       // image: pet.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedPets(petData);
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