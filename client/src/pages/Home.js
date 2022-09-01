import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import SwipeCard from '../components/SwipeCard'
import Info from '../components/info'

const Home = () => {
    return(
        <div> 
            <div>
                <SwipeCard/>
            </div>

            {Auth.loggedIn()
                // Displays page info if logged in
                ? (
                    <div>
                    </div>
                ) : (
                    <div>
                        {/* Takes user to login page if not logged in */}
                        <Navigate to='/login' replace={true} />
                    </div>
            )}
        </div>
    )
};

export default Home;
