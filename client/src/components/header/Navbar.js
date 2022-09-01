import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Typography } from "@material-ui/core";
import "./Navbar.css";
export const Navbar = () => {
    const [activeNav,setActiveNav] = useState('#')

    return(
    <nav>
    <div>
    <ol>
    <li><Link to="/profile"><Typography>Profile</Typography></Link></li>
    <li><Link to="/chats"><Typography>Chats</Typography></Link></li>
    <li><Link to ="/swipe"><Typography>Swipe</Typography></Link></li>
    <li><Link to ="/home"><Typography>Home</Typography></Link></li>
    </ol>

    </div>
 </nav>
    )
};

