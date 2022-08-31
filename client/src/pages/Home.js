import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import SwipeCard from '../components/SwipeCard'
const Home = () => {
console.log("seeing home")
    return(
        <div> 
            <div>
             <SwipeCard/>
                    </div>
            {Auth.loggedIn()
                // Displays page info if logged in
                ? (
                    <div>
                        <h1>This is the Home page</h1>
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
