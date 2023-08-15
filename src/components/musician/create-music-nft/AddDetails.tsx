import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import Disc from "../../../public/assets/disc.png";
import cover from "../../../public/assets/cover.png";
import { IoIosArrowBack } from "react-icons/io";
import PreviewDetails from "./PreviewDetails";
import AddDetailsForm from "./AddDetailsForm";

function AddDetails({ setStep, image, name, setName, description, setDescription, storeNFT }: any) {
  const [isPreview, setIsPreview] = useState(false);

  const saveFile = async () => {
    await storeNFT();
    //setStep(4);
  };
  return (
    <div className="p-8 h-screen">
      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <div className="flex  justify-between pt-20">
        <div className="w-full mt-[-40px]">
          <div className="relative w-[500px] h-[500px] border-dashed ">
            <img
              src={Disc}
              alt="icon image"
              className="absolute inset-0 m-auto ml-[210px] z-[-10]"
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
        </div>
        {isPreview
          ? <PreviewDetails name={name} description={description} />
          : <AddDetailsForm name={name} setName={setName} description={description} setDescription={setDescription} />}
      </div>
      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(2)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        {!isPreview
          ? <button
            className="px-4 py-2 border border-[#E1E1E1
  ] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] text-[#4B4B4B]"
            onClick={() => setIsPreview(true)}
          >
            Next
          </button>
          : <button
            className="px-4 py-2 border border-[#E1E1E1
] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] text-[#4B4B4B]"
            onClick={() => saveFile()}
          >
            Mint
          </button>}
      </div>
    </div>
  );
}

export default AddDetails;
