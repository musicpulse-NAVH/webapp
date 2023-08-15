import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import App from './App.jsx';
import './index.css';

const theme = extendTheme({
  colors: {
    strongBlack: "#000000",
    lightBlack: "#616161",
  },
  fonts: {
    body: "Inter, sans-serif",
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  fontSizes: {
    "24px": "24px",
  },
  lineHeights: {
    "29.05px": "29.05px",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
