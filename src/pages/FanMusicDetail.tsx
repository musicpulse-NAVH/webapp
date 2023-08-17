import React, { useState } from "react";
import { Flex, Container, Card } from "@chakra-ui/react";
import Sidebar from "../components/layout/Sidebar";
import Disc from "../public/assets/disc.png";
import cover from "../public/assets/cover.png";
import { IoIosArrowBack } from "react-icons/io";
import LineChart from "../components/LineChart";

function FanMusicDetail({ image }) {
  const [tx, setTx] = useState(null);

  const subscribe = async () => {
  
  };

  return (
    <Flex>
      <Sidebar />
      <Container maxW='1100px' mt='3'>
        <div className="flex justify-between pt-20 w-full">
          <div className="w-full mt-[-40px]">
            <div className="relative w-[300px] h-[300px] border-dashed">
              <img
                src={Disc}
                alt="icon image"
                className="absolute inset-0 m-auto ml-[130px] z-[-10] mb-4"
                width="260px"
              />
              {image
                ? <img
                  src={URL.createObjectURL(image)}
                  alt="icon image"
                  className="absolute inset-0 m-auto w-full h-full object-cover mt-[10px] bg-black"
                />
                : <img
                  src={cover}
                  alt="icon image"
                  className="absolute inset-0 m-auto w-full h-full object-cover mt-[10px]"
                />}
            </div>
            <div>
              <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">Name</h3>
              <p className="rounded-md  mt-4">Name</p>

              <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-8">
                Description
              </h3>
              <p className="rounded-md  mt-4">
                Description
              </p>
            </div>
          </div>

          <div className="w-full px-12">
            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">Pricing</h3>
            <div className="mt-3 px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]">
              <p className="text-[15px] text-[#1F1F1F] leading-[24px]">
                Full Access - 0.03ETH
              </p>
            </div>
            <Card my='3'>
              <LineChart />
            </Card>
            <button
              className="mt-4 px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
              onClick={() => subscribe()}
            >
              Subscribe
            </button>
          </div>
        </div>
      </Container>
    </Flex>
  );
}

export default FanMusicDetail;
