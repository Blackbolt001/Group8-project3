export const getSavedPetIds = () => {
    const getSavedPetIds = localStorage.getItem('saved_pets')
    ?JSON.parse(localStorage.getItem('saved_pets'))
    : [];
    return getSavedPetIds;
};

export const getSavedOwnerIds = () => {
    const getSavedOwnerIds = localStorage.getItem('saved_owners')
    ?JSON.parse(localStorage.getItem('saved_owners'))
    :[];
};

export const savedPetIds = (pet_IdArr) => {
    if(pet_IdArr.length) {
        localStorage.setItem('saved_pets',JSON.stringify(pet_IdArr));
    }else {
        localStorage.removeItem('saved_pets');
    }
};

export const savedOwnerIds = (ownerIdArr) => {
    if(ownerIdArr.length) {
        localStorage.setItem('saved_owners',JSON.stringify(ownerIdArr));
    }else {
        localStorage.removeItem('saved_owners');
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