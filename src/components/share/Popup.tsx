import React from 'react'
import { Link } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
import Success from '../../public/assets/success.png'

const Popup = ({
  isOpen,
  onClose,
  minting,
  tx,
  title,
  nftId,
  verify,
  creatingContract,
}: any) => {
  if (!isOpen) return null
  const txId =
    '0x6b6330e9e6ffd5db28fb95861f2b8b682ec0868e78b5b4d071e9fbe473fa8bec'

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-[100]">
      <div className="bg-white p-8 rounded shadow-md">
        {!tx && (
          <>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="mb-8">
              Please wait while processing your transaction...
            </p>
            <LoadingComponent />
          </>
        )}

        {nftId && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Transaction successful.
            </h2>
            <p className="mb-4">Here are the details of your transaction.</p>
            <p className="mb-4">NFT Id: {nftId}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              >
                Close Popup
              </button>
            </div>
          </>
        )}

        {verify && tx && (
          <div className="text-center">
            <div className="flex justify-center mt-20">
              <img src={Success} alt="icon image" className="" width="100px" />
            </div>
            <p className="mb-4 text-center">Verification successful</p>
            <button
              onClick={onClose}
              className="border border-[#4B4B4B
              ] bg-gray-500 text-white w-full px-4 py-2 rounded-lg hover:bg-black hover:text-white m-2"
            >
              Download
            </button>
          </div>
        )}

        {minting && tx && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Transaction successful.
            </h2>
            <p className="mb-4">Here are the details of your transaction.</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              >
                Close Popup
              </button>

              <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                <Link
                  to={`https://goerli.lineascan.build/tx/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Details
                </Link>
              </button>
            </div>
          </>
        )}

        {creatingContract && tx && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Transaction successful.
            </h2>
            <p className="mb-4">Here are the details of your transaction.</p>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 "
              >
                Close Popup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Popup
