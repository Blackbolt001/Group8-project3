import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import Messages from '../components/Messages'
const Chat = () => {

    return(
        <div>
            <Messages/>
        </div>
    )
}

export default Chat;