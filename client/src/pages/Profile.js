import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_PET} from '../utils/mutations';
import ImgUpload from '../components/ImgUpload'
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";

import "./styles.scss";

const Profile = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    // useState to hold visibility
    const [isVisible, setIsVisible] = useState(true);

    // function to change visibility
    const editPet = event => {
        setIsVisible(current => !current);
    };

    // Takes pet info from db and sets to formState
    // --------- TODO: TARGET PET INFO FROM DB FOR EACH PET DATA IN USESTATE -----------
    const [formState, setFormState] = useState({ petName: '', petBreed: '', petAge: '', petNature: '', petGender: ''});
    const [updatePet, { error, data }] = useMutation(UPDATE_PET);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
          const { data } = await updatePet({
            variables: { ...formState },
          });
        } catch (e) {
          console.error(e);
        }

        setFormState({
            petName: '', 
            petBreed: '' , 
            petAge: '', 
            petNature: '', 
            petGender: ''  
        })
    };

    return(
        <div>
            {Auth.loggedIn()
                // Displays profile info if logged in
                ? (
                    <div>
                        <h1>Your Profile Page</h1>
                        <div>
                            <ImgUpload />
                            <button className='editPetButton btn btn-block btn-info' onClick={editPet}>
                                Edit Pet Info
                            </button>
                        </div>
                        {/* Form to update pet info */}
                        <div className={`editPetForm ${isVisible ? 'hidden' : 'visible'}`}>
                            <form onSubmit={handleFormSubmit}>
                                <p> Pet's Name:</p>
                                <input 
                                    className="form-input"
                                    name="petName"
                                    type="text"
                                    value={formState.petName}
                                    onChange={handleChange}
                                />
                                <p> Breed:</p>
                                <input 
                                    className="form-input"
                                    name="petBreed"
                                    type="text"
                                    value={formState.petBreed}
                                    onChange={handleChange}
                                />
                                <p> Age:</p>
                                <input 
                                    className="form-input"
                                    name="petAge"
                                    type="text"
                                    value={formState.petAge}
                                    onChange={handleChange}
                                />
                                <p> Nature:</p>
                                <input 
                                    className="form-input"
                                    name="petNature"
                                    type="text"
                                    value={formState.petNature}
                                    onChange={handleChange}
                                />
                                <p> Gender:</p>
                                <input 
                                    className="form-input"
                                    name="petGender"
                                    type="text"
                                    value={formState.petGender}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-info"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Save changes
                                </button>
                            </form>
                        </div>
                        <br></br>
                        <div>
                            {/* Logout button */}
                            <button onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Takes user to login page if not logged in */}
                        <Navigate to='/login' replace={true} />
                    </div>
            )}
        </div>
    )
}

export default Profile;