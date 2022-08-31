import React from 'react';
import {useState} from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';

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

    return(
        <div>
            {Auth.loggedIn()
                // Displays profile info if logged in
                ? (
                    <div>
                        <h1>This is the Profile page</h1>
                        <div>
                            {/* Logout button */}
                            <button onClick={logout}>
                                Logout
                            </button>
                        </div>
                        <div>
                            <button className='editPetButton' onClick={editPet}>
                                Edit Pet Info
                            </button>
                        </div>
                        <div className={`editPetForm ${isVisible ? 'visible' : 'hidden'}`}>
                            <form>
                                <input 
                                    className="form-input"
                                    name="petName"
                                    type="text"
                                    value={formState.petName}
                                />
                            </form>
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