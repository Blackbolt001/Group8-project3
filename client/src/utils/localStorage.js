export const getSavedPetIds = () => {
    const getSavedPetIds = localStorage.getItem('saved_pets')
    ?JSON.parse(localStorage.getItem('saved_pets'))
    : [];
    return getSavedPetIds;
};
export const savedPetIds = (pet_IdIdArr) => {
    if(pet_IdIdArr.length) {
        localStorage.setItem('saved_pets',JSON.stringify(pet_IdIdArr));
    }else {
        localStorage.removeItem('saved_pets');
    }
};

export const removePetId = (pet_Id) => {
    const savedPetIds = localStorage.getItem('saved_pets')
?JSON.parse(localStorage.getItem('saved_pets'))
:null;

if (!getSavedPetIds) {
    return false;
}

const updatedSavedPetIds = savedPetIds?.filter((savedPetId) => savedPetId !== pet_Id);
localStorage.setItem('saved_pets', JSON.stringify(updatedSavedPetIds));
return true;
};