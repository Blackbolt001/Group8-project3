import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../../utils/auth';

const Home = () => {
    return(
        <div>
            {Auth.loggedIn()
                // Displays page info if logged in
                ? (
                    <div>
                        <h1>This is the Home page</h1>
                    </div>
                ) : (
                    // Takes user to login page if not logged in
                    Navigate('/Login')
            )}
        </div>
    )
};

export default Home;