import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import SwipeCard from '../components/SwipeCard'
import Info from '../components/info'

const Home = () => {

    // useState to hold visibility
    const [isVisible, setIsVisible] = useState(true);

    // function to change visibility
    const showInfo = event => {
        setIsVisible(current => !current);
    };

    return(
        <div> 
            <div>
                <SwipeCard/>
                <div className={`editPetForm ${isVisible ? 'hidden' : 'visible'}`}>
                    <Info />
                </div>
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
