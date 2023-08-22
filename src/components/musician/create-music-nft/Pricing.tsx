import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import Disc from '../../../public/assets/disc.png'
import cover from '../../../public/assets/cover.png'
import Success from '../../../public/assets/success.png'
import { IoIosArrowBack } from 'react-icons/io'
import Popup from '../../share/Popup'

function Pricing({
  setStep,
  image,
  name,
  description,
  deployContract,
  nftId,
  createToken
}: any) {
  const change = useNavigate()
  const [tx, setTx] = useState(null)
  const [tx2, setTx2] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const deployTBAContract = async () => {
    try {
      setIsPopupOpen(true)
      const result = await deployContract()
      if (result) {
        setTx(result)
      }
      closePopup();
    } catch (error) {
      closePopup();
    }
   
  }

  const createAccessToken = async () => {
    const result = await createToken()
    if (result) {
      setTx2(result)
    }
    closePopup();
  }

  return (
    <div className="p-8 h-screen ml-16">
      <Popup
        title="Creating Contract"
        isOpen={isPopupOpen}
        onClose={closePopup}
        tx={tx}
        creatingContract="true"
      />

      <Text fontWeight={400} fontSize="24px" lineHeight="38.73px">
        Create Music NFT
      </Text>
      <div className="flex justify-between pt-20">
        <div className="w-full mt-[-40px]">
          <div className="relative w-[300px] h-[300px] border-dashed">
            <img
              src={Disc}
              alt="icon image"
              className="absolute inset-0 m-auto ml-[130px] z-[-10] mb-4"
              width="260px"
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="icon image"
                className="absolute inset-0 m-auto w-full h-full object-cover mt-[10px] bg-black"
              />
            ) : (
              <img
                src={cover}
                alt="icon image"
                className="absolute inset-0 m-auto w-full h-full object-cover mt-[10px]"
              />
            )}
          </div>

          <div className="mt-16">
            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] font-bold">
              Name
            </h3>
            <p className="rounded-md  mt-4">{name}</p>

            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-8">
              Description
            </h3>
            <p className="rounded-md  mt-4 w-[440px]">{description}</p>
          </div>
        </div>

        {!tx2 ? (
          <div className="w-full px-12">
            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">
              Pricing
            </h3>
            <div className="w-[350px] mt-3 px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300   mr-8 text-[#4B4B4B]">
              <p className="text-[20px] text-[#15C5CE] leading-[24px] flex gap-[100px] p-2">
                <span className="text[#15C5CE">Full Access </span>
                <span className="text-[#4B4B4B] ">0.03ETH</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full px-12">
            <img src={Success} alt="icon image" className="" width="300px" />
            <p className="mt-[-90px]">You’ve created your music NFT and licensing plans.</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(4)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        {tx && tx2 ? (
          <button
            className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
            onClick={() => setStep(7)}
          >
            Upload media file
          </button>
        ) : tx 
          ? (
          <button
            className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
            // onClick={() => createAccessToken()}
            onClick={createAccessToken}
          >
            Create access token
          </button>
        ):
        (
          <button
            className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
            // onClick={() => createAccessToken()}
            onClick={deployTBAContract}
          >
            Convert to TBA
          </button>
        )}
      </div>
    </div>
  )
}

export default Pricing
