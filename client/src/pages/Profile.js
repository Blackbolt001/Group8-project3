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
                        <h1>This is the Profile page</h1>
                        <div>
                            {/* Logout button */}
                            <button className="" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    // Takes user to login page if not logged in
                    Navigate('/Login')
            )}
        </div>
    )
}

export default Profile;