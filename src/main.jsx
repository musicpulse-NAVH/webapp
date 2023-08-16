import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { MetaMaskProvider } from '@metamask/sdk-react';
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
      <MetaMaskProvider debug sdkOptions={{
        logging:{
            developerMode: false,
          },
          checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
          dappMetadata: {
            name: "Music Pulse",
            url: window.location.host,
          }
      }}>
        <App />
      </MetaMaskProvider>
      
    </ChakraProvider>
  </React.StrictMode>,
);
