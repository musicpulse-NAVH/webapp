import React, { useState } from 'react'
import { Text } from '@chakra-ui/react'
import Disc from '../../../public/assets/disc.png'
import cover from '../../../public/assets/cover.png'
import { IoIosArrowBack } from 'react-icons/io'
import PreviewDetails from './PreviewDetails'
import AddDetailsForm from './AddDetailsForm'
import Popup from '../../share/Popup'

function AddDetails({
  setStep,
  image,
  name,
  setName,
  description,
  setDescription,
  storeNFT,
  connect,
  mc,
  nftId,
}: any) {
  const [isPreview, setIsPreview] = useState(false)
  const [tx, setTx] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const saveFile = async () => {
    await storeNFT()
  }
  const openPopup = () => {
    setIsPopupOpen(true)
    saveFile()
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className="p-8 h-screen">
      <Popup
        title="Minting Transaction"
        isOpen={isPopupOpen}
        onClose={closePopup}
        nftId={nftId}
        minting="true"
      />
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
        </div>
        {isPreview ? (
          <PreviewDetails name={name} description={description} />
        ) : (
          <AddDetailsForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
          />
        )}
      </div>
      <div className="flex items-center justify-center mt-12 ">
        <button
          className="flex items-center px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 mr-8 text-[#4B4B4B]"
          onClick={() => setStep(2)}
        >
          <IoIosArrowBack className="mr-2" /> Back
        </button>
        {!isPreview ? (
          <button
            className="bg-[#4B4B4B] text-white px-4 py-2 border border-[#E1E1E1
  ]  rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] hover:text-[#4B4B4B]"
            onClick={() => setIsPreview(true)}
          >
            Next
          </button>
        ) : mc ? (
          <button
            className="bg-[#4B4B4B] text-white px-4 py-2 border border-[#E1E1E1
          ]  rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] hover:text-[#4B4B4B]"
            onClick={openPopup}
          >
            Mint
          </button>
        ) : (
          <button
            className="px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 w-[160px] text-[#4B4B4B]"
            onClick={() => connect()}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  )
}

export default AddDetails
