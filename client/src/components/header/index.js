import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <div>
                    <Link to="/profile">
                        <h1>👤</h1>
                    </Link>
                </div>
                <div>
                    <Link to='/'>
                        <h2>Paws N' Play</h2>
                    </Link>
                </div>
                <div>
                    <Link to="/chats">
                        <h1>💬</h1>
                    </Link>
                </div>
            </div>   
        </header>
    )
};

export default Header;