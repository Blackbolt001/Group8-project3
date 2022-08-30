import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header classNme="">
            <div className="">
                <div>
                    <Link to="/profile">
                        {/* Change to profile Icon later */}
                        <h4>Profile</h4>
                    </Link>
                </div>
                <div>
                    <h2>Paws N' Play</h2>
                </div>
                <div>
                    <Link to="/chats">
                        {/* Change to chat Icon later */}
                        <h4>Chats</h4>
                    </Link>
                </div>
            </div>   
        </header>
    )
};

export default Header