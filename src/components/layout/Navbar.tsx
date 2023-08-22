// src/Navbar.js
import React, { useState } from "react";
import { useSDK } from '@metamask/sdk-react';
import { Link as ReactLink } from 'react-router-dom';
import { Flex, Image, Spacer, Box, Heading, Button, Link } from "@chakra-ui/react";
import logo from "../../public/logo.png";

const Navbar = () => {
  const {sdk, connected, connecting, provider, chainId} = useSDK();
  const [account, setAccount] = useState<string>();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const terminate = () => {
    sdk?.terminate();
  }

  return (
    <Flex p={4} bg="white" align="center" mb='1' style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.4)" }}>
      <Image src={logo} alt="logo" width="40px" height="40px" />
      <Box ml="4">
        <Heading
          color="black"
          size="md"
          fontFamily="body"
          fontWeight={700}
          fontSize="24px"
          lineHeight="29.05px"
        >
          MusicPulse
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          as={ReactLink}
          to="/"
          fontFamily="body"
          mr={4}
          color="lightBlack"
          fontWeight={500}
          fontSize="20px"
          lineHeight="28.05px"
        >
          Home
        </Link>
        <Link
          as={ReactLink}
          to="/create"
          fontFamily="body"
          mr={4}
          color="lightBlack"
          fontWeight={500}
          fontSize="20px"
          lineHeight="28.05px"
        >
          Create
        </Link>
        <Link
          as={ReactLink}
          to="/collection"
          fontFamily="body"
          mr={4}
          color="lightBlack"
          fontWeight={500}
          fontSize="20px"
          lineHeight="28.05px"
        >
          My collection
        </Link>
        <Link
          fontFamily="body"
          mr={4}
          color="lightBlack"
          fontWeight={500}
          fontSize="20px"
          lineHeight="28.05px"
        >
          Liked songs
        </Link>
        {!connected
          ? <Button style={{ padding: 10, margin: 10 }} bg="green.300" onClick={connect}>
          Connect
        </Button>
        : <Button style={{ padding: 10, margin: 10, }} bg="red.200" onClick={terminate} >
          Disconnect
      </Button>}
      </Box>
    </Flex>
  );
};

export default Navbar;