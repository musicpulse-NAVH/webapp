import React, { useEffect, useState } from "react";
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import { Container, SimpleGrid, Center, IconButton, Stack, Box, Flex, Heading, Skeleton, Spacer, Input, Image, Text } from '@chakra-ui/react';
import Sidebar from "../components/layout/Sidebar";
import { HiOutlineFilter, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Cover from "../public/assets/examplecover.png";
import {EVM_ABI, EVM_ADDRESS } from "../EVMcontract";

const DATA = [
  {
    id: 1,
    name: "Sadye",
    title: "TONGUE TIED",
    mints: "1097",
    timeLeft: "18",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Malik Naim",
    title: "Keep It To Myself",
    mints: "932",
    timeLeft: "18",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    name: "Malik Naim",
    title: "Hali",
    mints: "1083",
    timeLeft: "18",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
]

function Fans() {
  const change = useNavigate();
  const {sdk, connected, connecting, provider, chainId} = useSDK();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if(connected) connect()
  }, [connected])
  

  const connect = async () => {
    try {
      const _provider = new ethers.providers.Web3Provider(provider);
      const signer = _provider.getSigner();

      const contract = new ethers.Contract(EVM_ADDRESS, EVM_ABI, signer);
      const musics = await contract.getMusicURLList();
      let newMusic = [];
      for(let m of musics){
        const cid = m.slice(7, 66);

        const response = await fetch(`https://nftstorage.link/ipfs/${cid}/metadata.json`);
        let data = await response.json();
        data.id = newMusic.length;
        let imageCid = data.image.slice(7);
        data.image = `https://nftstorage.link/ipfs/${imageCid}`;
        newMusic.push(data);
      }
      setSongs(newMusic);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <Flex>
      <Sidebar />
      <Container maxW='1200px' mt='3'>
        <Image
          width="100%"
          height="400px"
          src={Cover}
          alt='Image'
          mr='3'
          p='1'
          bg='white'
        />

        <Flex alignItems='center' mt='2'>
          <Flex>
            <Center>
              <HiOutlineFilter />
            </Center>

            <Text fontSize='16px' color='#4B4B4B' ml='1'>
              Music filters
            </Text>
          </Flex>
          <Spacer />
          <Flex>
            <IconButton aria-label='Left' bg='white' fontSize="30px" icon={<HiChevronLeft />} />
          </Flex>
          <Input width='50px' size='sm' value="1" ml='1' mr="3" />
          <Text mr='3'>/</Text>
          <Text mr='1'>1</Text>
          <Flex>
            <IconButton aria-label='Left' bg='white' fontSize="30px" icon={<HiChevronRight />} />
          </Flex>
        </Flex>

        <SimpleGrid columns={3} spacing={10}  mt='3' >
          {songs.map(d => (
            <Flex key={d.id} cursor="pointer" onClick={() => change(`/musicdetail/${d.id}`)}>
              <Image
                width="100px"
                height="100px"
                src={d.image}
                alt='Cover'
                mr='3'
                p='1'
                bg='white'
                border='1px'
                borderColor='gray.200'
              />

              <Stack>
                <Box>
                  <Text fontSize='xs' mt='3' color='#8E8E8E'>
                    {d.name}
                  </Text>
                  <Heading size='sm' mb='2' mt='2'>
                    {d.description}
                  </Heading>
                  <Text fontSize='xs' color='#8E8E8E'>
                    0 mints • Ends in 48 h
                  </Text>
                </Box>
              </Stack>
            </Flex>
          ))}
        </SimpleGrid>
        {!connected && <Text mt="5" align="center" fontSize="2xl">Please connect to your wallet</Text>}
      </Container>

      <SimpleGrid columns={3} spacing={10}>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </SimpleGrid>


    </Flex>
  );
}

export default Fans;
