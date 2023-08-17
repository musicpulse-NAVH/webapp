import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import Disc from "../../../public/assets/disc.png";
import cover from "../../../public/assets/cover.png";
import Success from "../../../public/assets/success.png";
import { IoIosArrowBack } from "react-icons/io";

function Pricing({ setStep, image, name, description, deployContract}: any) {
  const [tx, setTx] = useState(null);

  const createAccessToken = async () => {
   const result = await deployContract();
   if (result) setTx(result);
  };

  return (
    <div className="p-8 h-screen">
      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <div className="flex  justify-between pt-20">
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
            <p className="rounded-md  mt-4">{name}</p>

            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-8">
              Description
            </h3>
            <p className="rounded-md  mt-4">
              {description}
            </p>
          </div>
        </div>

        {!tx
          ? <div className="w-full px-12">
              <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">Pricing</h3>
              <div className="mt-3 px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]">
                <p className="text-[15px] text-[#1F1F1F] leading-[24px]">
                  Full Access - 0.03ETH
                </p>
              </div>
            </div>
          : <div className="w-full px-12">
              <img
                src={Success}
                alt="icon image"
                className=""
                width="300px"
              />
              <p className="mt-[-90px]">You’ve created your music NFT</p>
            </div>
          }
          </div>
      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(4)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        {tx
          ? <button
              className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
              
            >
              Go to Dashboard
            </button>
          : <button
              className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
              onClick={() => createAccessToken()}
            >
              Deploy contract
            </button>
          }
      </div>
    </div>
  );
}

export default Pricing;
