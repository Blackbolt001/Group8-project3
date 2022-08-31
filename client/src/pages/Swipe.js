import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import SwipeCard from '../components/SwipeCard'
const Swipe = () => {

    return(
        
        <div className='bg-red-200'> 
        <h1 className="text-2xl underline text-cyan-100">
      Hello world!
    </h1>
        yesh
             <SwipeCard/>
        </div>
    )
};

export default Swipe;