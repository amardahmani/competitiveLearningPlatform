import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { baseTheme } from './Theme-variable';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = baseTheme;
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    
    </BrowserRouter>
    </React.StrictMode>

);

