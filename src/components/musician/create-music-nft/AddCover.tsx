import React from "react";
import { Flex, Box, Text, Container, Image, Center } from "@chakra-ui/react";
import Disc from "../../../public/assets/disc.png";
import Vector from "../../../public/assets/Vector.png";
import { IoIosArrowBack } from "react-icons/io";

function AddCover({ setStep, step, setImage }: any) {
  const saveFile = async (event) => {
    const image = event.target.files[0];
    setImage(image);
    setStep(3);
  };
  return (
    <div className="p-8 h-screen">
      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <div className="pt-20 flex items-center justify-center">
        <div className="relative w-[427px] h-[427px] border-4 border-dashed bg-white">
          <img
            src={Disc}
            alt="icon image"
            className="absolute inset-0 m-auto ml-[200px] z-[-10]"
          />
          <img
            src={Vector}
            alt="icon image"
            className="absolute inset-0 m-auto w-[71px] h-[62.13px
            ]"
          />
          <label
            htmlFor="photo"
            className="absolute inset-0 m-auto mt-[250px] text-center font-semibold cursor-pointer"
          >
            <span className="text-[#2237F1] text-xl font-medium underline" >
              Add
            </span>{" "}
            album cover
          </label>
          <input type='file' id='photo' onChange={saveFile} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(1)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        <button
          className="px-4 py-2 border border-[#E1E1E1
] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] text-[#4B4B4B]"
          onClick={() => setStep(3)}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default AddCover;
