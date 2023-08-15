import React from "react";
import { Flex, Box, Text, Container, Image, Center } from "@chakra-ui/react";
import icon from "../../../public/assets/icon_upload.png";

function Upload({ setStep, step }: any) {
  const saveFile = async () => {
    setStep(2);
  };
  return (
    <div className="p-8 h-screen">
      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <div className="pt-24 flex items-center justify-center">
        <div className="relative w-[427px] h-[427px] border-4 border-dashed rounded-full">
          
          <img
            src={icon}
            alt="icon image"
            className="absolute inset-0 m-auto mb-[200px]"
          />
          <p
            className="absolute inset-0 m-auto mt-[250px] text-center font-semibold"
            onClick={saveFile}
          >
            <span className="text-[#2237F1] text-xl font-medium underline">
              Upload
            </span>{" "}
            your music
          </p>
        </div>
      </div>
    </div>
  );
}

export default Upload;
