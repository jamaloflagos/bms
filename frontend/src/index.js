import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookContextProvider } from './contexts/bookContext';
import { UserContextProvider } from './contexts/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
  <BookContextProvider>
    <App />
  </BookContextProvider>
  </UserContextProvider>
);


