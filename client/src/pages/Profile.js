import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';

const Profile = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };


    return(
        <div>
            {Auth.loggedIn()
                // Displays profile info if logged in
                ? (
                    <div>
                        <h1>Welcome to your profile page!</h1>
                        
                            {/* Logout button */}
                            <div>
                            <button className="" onClick={logout}>
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