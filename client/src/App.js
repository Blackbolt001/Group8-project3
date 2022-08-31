import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatHome from './pages/ChatHome';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Swipe from './pages/Swipe';

// Constructs main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <div className="container">
            <Routes>
              {/* Home page with profile cards */}
              <Route 
                path="/" 
                element={<>
                  <Header />
                  <Home />
                </>}
              />
              {/* Login page */}
              <Route 
                path="/login" 
                element={<Login />}
              />
              {/* Signup page */}
              <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route 
                path="/swipe" 
                element={<>
                  <Header />
                  <Swipe />
                </>}
              />
              {/* Shows all chats with user's matches */}
              <Route 
                path="/chats"
                element={<>
                  <Header />
                  <ChatHome />
                </>}
              />
              {/* Specific chats with other users */}
              <Route 
                path="/chat/:ownerid" 
                element={<>
                  <Header />
                  <Chat />
                </>}
              />
              {/* User's profile. Can update info here */}
              <Route 
                path="/profile" 
                element={<>
                  <Header />
                  <Profile />
                </>}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
