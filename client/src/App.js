import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import Header from './components/header';
=======
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components';
>>>>>>> 7ca59ad8982b82d7438c827a4e6fa0b615e3d880
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatHome from './pages/ChatHome';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
<<<<<<< HEAD

import SavedOwners from './pages/SavedOwners';
import SearchOwners from './pages/SearchOwners';
import SearchPets from './pages/SearchPets';
import SavedPets from './pages/SavedPets';

const httplink = createHttpLink({uri:'/graphql',});

const authLink = setContext((_,{headers}) => {
const token = localStorage.getItem('id_token');
return{
  headers:{...headers,authorization:token?`Bearer $(token)`:'',}
}
},
);

=======
import Swipe from './pages/Swipe';
>>>>>>> 7ca59ad8982b82d7438c827a4e6fa0b615e3d880
const client = new ApolloClient({
  link:authLink.concat(httplink),
  
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          {
            // Header doesn't show on login page
            window.location.pathname!=='/login' || '/signup' ? <Header/> : null
          }
          <div className="container">
            <Routes>
              {/* Home page with profile cards */}
              <Route 
                path="/" 
                element={<Home />}
              />
              {/* Login page */}
              <Route 
                path="/login" 
                element={<Login />}
              />

              {/* Login page */}
              <Route 
                path="/signup" 
                element={<Signup />}
                <Route 
                path="/swipe" 
                element={<Swipe />}
              />
              {/* Shows all chats with user's matches */}
              <Route 
                path="/chats"
                element={<ChatHome />}
              />
              {/* Specific chats with other users */}
              <Route 
                path="/chat/:ownerid" 
                element={<Chat />}
              />
              {/* User's profile. Can update info here */}
              <Route 
                path="/profile/:ownerId" 
                element={<Profile />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
