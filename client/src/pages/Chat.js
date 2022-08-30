import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';

const Chat = () => {

    return(
        <div>
            {Auth.loggedIn()
                // Displays chat info if logged in
                ? (
                    <div>
                        <h1>This is the Chat page</h1>
                    </div>
                ) : (
                    <div>
                        {/* Takes user to login page if not logged in */}
                        <Navigate to='/Login' replace={true} />
                    </div>
            )}
        </div>
    )
}

export default Chat;