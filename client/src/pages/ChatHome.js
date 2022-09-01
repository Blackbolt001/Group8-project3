import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';

const ChatHome = () => {
   let id = Auth.getProfile().data._id
    const { loading, data } = useQuery(QUERY_CHAT, {
        variables:{user: id}
      });
      const chatList = data?.chat || [];

    return(
        <div>
            {Auth.loggedIn()
                // Displays chat info if logged in
                ? (
                    <div>
               {loading ? (
          <div>Loading...</div>
        ) : (
          <form >
              {chatList.map((chat) => {
                           console.log(chat)      
                return (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    
                    <ListItem key={chat._id} alignItems="flex-start">
                    <Link to={{ pathname: `/chat/${chat._id}` }}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      
                      <ListItemText
                        primary="Get to know someone paw-some"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                            </Typography>
                           
                          </React.Fragment>
                        }
                      />
                      </Link>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                );
              })}
          </form>
        )}
                    </div>
                ) : (
                    <div>
                        {/* Takes user to login page if not logged in */}
                        <Navigate to='/login' replace={true} />
                    </div>
            )}
        </div>
    )
}

export default ChatHome;