import { useNavigate } from 'react-router-dom';
import { Container, GridItem, InputGroup, Stack, Box, Flex, Heading, Input, InputRightElement, Image, Text } from '@chakra-ui/react';
import { HiSearch } from "react-icons/hi";

const DATA = [
  {
    id: 1,
    name: "Sadye",
    title: "TONGUE TIED",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    name: "Sadye",
    title: "Otro Ambie",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
]

function Sidebar() {
  const changePage = useNavigate();

  return (
    <GridItem rowSpan={2} colSpan={1} bg='#FAFAFA' width="300px" height="800px">
      <Container>
        <InputGroup bg='white' mt='4'>
          <Input placeholder='Search' />
          <InputRightElement>
            <HiSearch />
          </InputRightElement>
        </InputGroup>

        <Text fontSize='lg' mt='5'>
          Recent viewed
        </Text>

        {DATA.map(d => (
          <Flex mt='3' key={d.id}>
            <Image
              width="70px"
              height="70px"
              src={d.cover}
              alt='Cover'
              mr='3'
              p='1'
              bg='white'
            />

            <Stack>
              <Box>
                <Heading size='sm' mb='1' mt='4'>{d.title}</Heading>
                <Text fontSize='xs'>
                  {d.name}
                </Text>
              </Box>
            </Stack>
          </Flex>
        ))}

      </Container>
    </GridItem>
  )
}

export default Sidebar