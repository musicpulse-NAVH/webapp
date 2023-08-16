import React, { useEffect } from "react";
import { Flex, Box, Text, Container, Image, Center } from "@chakra-ui/react";
import icon from "../../../public/assets/icon_upload.png";

function Upload({ setStep, step }: any) {
  // useEffect(() => {
  //   connectLitNetwork();
  // }, [])

  // const connectLitNetwork = async () => {
  //   const client = new LitJsSdk.LitNodeClient();
  //   await client.connect();
  //   window.litNodeClient = client;

  //   document.addEventListener('lit-ready', function (e) {
  //     console.log('LIT network is ready');
  //   }, false)
  // };

  const saveFile = async () => {
    setStep(2);
  };

  // const encrypt = async () => {
  //   if (!this.litNodeClient) {
  //     await this.connect();
  //   }

  //   const chain = "sepolia";
  //   const accessControlConditions = [
  //     {
  //       contractAddress: "",
  //       standardContractType: "",
  //       chain: chain,
  //       method: "eth_getBalance",
  //       parameters: [":userAddress", "latest"],
  //       returnValueTest: {
  //         comparator: ">=",
  //         value: "1000000000000", // 0.000001 ETH
  //       },
  //     },
  //   ];

  //   const message = "Test"
    
  //   const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
  //   const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);

  //   const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  //     accessControlConditions,
  //     symmetricKey,
  //     authSig,
  //     chain,
  //   });

  //   const result = {
  //     encryptedString,
  //     encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
  //   }

  //   console.log(result);
  // }

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
