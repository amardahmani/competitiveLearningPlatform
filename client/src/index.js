import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { baseTheme } from './Theme-variable';
import { ToastContainer, toast } from 'react-toastify';
import ChallengesProvider from './hooks/ChallengesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = baseTheme;

root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </React.StrictMode>
);