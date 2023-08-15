import React, { useState } from "react";
import { Container, SimpleGrid, Grid, Card, Stack, Box, Flex, Heading, IconButton, Input, Image, Text } from '@chakra-ui/react';
import Sidebar from "../components/layout/Sidebar";
import LineChart from "../components/LineChart";
import { FiArrowRight } from "react-icons/fi";

const DATA = [
  {
    id: 1,
    name: "Sadye",
    title: "TONGUE TIED",
    canUpgrade: true,
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Malik Naim",
    title: "Keep It To Myself",
    canUpgrade: false,
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    name: "Malik Naim",
    title: "Hali",
    canUpgrade: false,
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
]

function Collection() {
  return (
    <Flex>
      <Sidebar />
      <Container maxW='1000px' mt='3'>
        <Box mb='3'>
          <LineChart />
        </Box>

        {DATA.map(d => (
          <Card key={d.id} p='3' mb='2'>
            <Grid templateColumns='2fr 2fr 2fr 1fr' gap={10} mt='3'>
              <Flex>
                <Image
                  width="70px"
                  height="70px"
                  src={d.cover}
                  alt='Cover'
                  mr='3'
                  p='1'
                  bg='white'
                  border='1px'
                  borderColor='gray.200'
                />
                <Box>
                  <Heading fontSize='21.97px' mt='2'>
                    {d.title}
                  </Heading>
                  <Text fontSize='14px' color='#8E8E8E'>
                    {d.name}
                  </Text>
                </Box>
              </Flex>

              <Box ml='10'>
                <Heading fontSize='24px' color='#15C5CE' mb='2'>
                  Current plan
                </Heading>
                <Text fontSize='16px' color='#8E8E8E'>
                  {d.canUpgrade ? "7-day Free trial " : " Full access"}
                </Text>
              </Box>

              <Box>
                <Text size='sm' color='#7D81F2' mt='5'>
                  {d.canUpgrade && "Upgrade to full acccess"}
                </Text>
              </Box>

              <IconButton aria-label='Right' bg='white' mt='3' icon={<FiArrowRight />} fontSize="30px" />
            </Grid>
          </Card>
        ))}
      </Container>


    </Flex >
  );
}

export default Collection;
