// src/Navbar.js
import React from "react";
import { Link as ReactLink } from 'react-router-dom';
import { Flex, Image, Spacer, Box, Heading, Link } from "@chakra-ui/react";
import logo from "../../public/logo.png";

const Navbar = () => {
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
      </Box>
    </Flex>
  );
};

export default Navbar;