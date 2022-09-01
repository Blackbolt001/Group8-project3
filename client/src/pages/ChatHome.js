import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';

const ChatHome = () => {
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
                        <h1>Chat Home Page</h1>
                        
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

export default ChatHome;