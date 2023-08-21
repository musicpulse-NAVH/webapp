import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Container, Image, Center } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import icon from "../../../public/assets/icon_upload.png";
import { IoIosArrowBack } from "react-icons/io";
import Popup from '../../share/Popup'

function Upload({ setStep, step, nftId, uploadMusic }: any) {
  const change = useNavigate()

  const [name, setName] = useState('')
  const [img, setImg] = useState()
  const [url, setUrl] = useState('')
  const [tx, setTx] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const connectLitNetwork = async () => {
    const client = new LitJsSdk.LitNodeClient();
    await client.connect();
    window.litNodeClient = client;

    document.addEventListener('lit-ready', function (e) {
      console.log('LIT network is ready');
    }, false)
  };

  const saveFile = async (event) => {
    const image = event.target.files[0];
    console.log(image.name);
    setImg(image);
    setName(image.name);
    setUrl('https://bafybeid2yogk5vt3jghzmofsydffl4a5ilmbk5tkgtqqqvsraxshqm362a.ipfs.nftstorage.link/');
  };

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const uploadToContract = async () => {
    try {
      setIsPopupOpen(true)
      const result = await uploadMusic(url)
      if (result) {
        setTx(result)
      }
      closePopup();
    } catch (error) {
      console.log(error)
      closePopup();
    }
  };

  const encrypt = async () => {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const chain = "sepolia";
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: chain,
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];

    const message = "Test"

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);

    const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });

    const result = {
      encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }

    console.log(result);
  }

  return (
    <div className="p-8 h-screen">
      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <Popup
        title="Uploading"
        isOpen={isPopupOpen}
        onClose={closePopup}
        tx={tx}
        creatingContract="true"
      />
      <div className="pt-24 flex items-center justify-center">
        <div className="relative w-[427px] h-[427px] border-4 border-dashed rounded-full">
          <img
            src={icon}
            alt="icon image"
            className="absolute inset-0 m-auto mb-[200px]"
          />
          <label
            htmlFor="music"
            className="absolute inset-0 m-auto mt-[250px] text-center font-semibold cursor-pointer"
          >
            <input type='file' id='music' onChange={saveFile} style={{ display: 'none' }} />
            <span className="text-[#2237F1] text-xl font-medium underline">
              Upload
            </span>{" "}
            your music
          </label>
          <p className="mt-[300px] text-center">{name}</p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(1)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        {tx ? (
          <button
            className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
            onClick={() => change(`/musicdetail/${nftId}`)}
          >
            Go to Dashboard
          </button>
        ): <button
          className="px-4 py-2 border border-[#E1E1E1
] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] text-[#4B4B4B]"
          onClick={uploadToContract}
          disabled={!url}
        >
          Upload
        </button>}
      </div>
    </div>
  );
}

export default Upload;
