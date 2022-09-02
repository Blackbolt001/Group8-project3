import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MESSAGE } from '../utils/queries';
import { CREATE_MESSAGE } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
export default function Messages() {
    let { id } = useParams();
    const userlo = Auth.getProfile().data._id
    console.log(id)
    const [formData, setFormData] = useState("");
    const { loading, data } = useQuery(QUERY_MESSAGE, {
        variables: { chat: id, user: userlo },
        pollInterval:300,
      });
  const [createMessage, { error }] = useMutation(CREATE_MESSAGE);
  const messages = data?.message || [];

 
  function Messagehandler(event){
    event.preventDefault();
    const { name, value, message } = event.target
  setFormData(value)
  console.log(formData)
}
const Messagesubmit = async (event) => {
    event.preventDefault();
    try {
      const message = await createMessage({
        variables:{
        content: formData ,name:"test",user:userlo,chat:id
      }});
    } catch (err) {
      console.error(err);
    }

}
  return (
    <Box sx={{ pb: 6 }} >
      <CssBaseline />
      {loading ? (
        <div>Loading...</div>
      ) : (
      <List>
        {messages.map(({ content, _id, user, name }, index) => (
          <ListItem button key={_id}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={content}/>
          </ListItem>
        ))}
      </List>)}
      {error && <div>Something went wrong...</div>}
    
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <form  onSubmit={Messagesubmit} >
      <label>Enter your message:
      <input onChange={Messagehandler}
        type="text" 
        name="message"
      />
      </label>
        <input type="submit" />
    </form>
      </Paper>
    </Box>
  );
}

// const messageExamples = [
//   {
//     content: 'Brunch this week?',
//     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     content: 'Birthday Gift',
//     secondary: `Do you have a suggestion for a good present for John on his work
//       anniversary. I am really confused & would love your thoughts on it.`,
//     person: '/static/images/avatar/1.jpg',
//   },
// ];