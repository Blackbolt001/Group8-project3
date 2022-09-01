import React from 'react';
import { Navigate } from "react-router-dom";
import Auth from '../utils/auth';
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
   
    const { loading, data } = useQuery(QUERY_CHAT, {
        variables:{user:"63110f093cd88a1f51ec2a1f"}
      });
      const techList = data?.chat || [];

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
              {techList.map((tech) => {
                return (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                          </React.Fragment>
                        }
                      />
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