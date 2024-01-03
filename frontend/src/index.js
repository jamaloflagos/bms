import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookContextProvider } from './contexts/bookContext';
import { UserContextProvider } from './contexts/userContext';
import { PublisherContextProvider } from './contexts/publisherContext';
import { AuthorContextProvider } from './contexts/authorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
  <AuthorContextProvider>
  <PublisherContextProvider>
  <BookContextProvider>
    <App />
  </BookContextProvider>
  </PublisherContextProvider>
  </AuthorContextProvider>
  </UserContextProvider>
);


