import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header className="">
            <div className="">
                <div>
                    <Link to="/profile">
                        <h4>👤</h4>
                    </Link>
                </div>
                <div>
                    <h2>Paws N' Play</h2>
                </div>
                <div>
                    <Link to="/chats">
                        <h4>💬</h4>
                    </Link>
                </div>
            </div>   
        </header>
    )
};

export default Header;