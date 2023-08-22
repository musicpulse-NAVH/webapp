import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSDK } from '@metamask/sdk-react'
import { ethers } from 'ethers'
import { Flex, Container, Card } from '@chakra-ui/react'
import Sidebar from '../components/layout/Sidebar'
import Disc from '../public/assets/disc.png'
import cover from '../public/assets/cover.png'
import LineChart from '../components/LineChart'
import Popup from '../components/share/Popup'
import {
  Registry_ABI,
  Registry_ADDRESS,
  Account_ADDRESS,
  EVM_ADDRESS,
  EVM_ABI
} from '../EVMcontract'

function FanMusicDetail({ image }) {
  const { id } = useParams()
  const [tx, setTx] = useState(null)
  const [data, setData] = useState({})
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [musicURL, setMusicURL] = useState("")

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    getURLMusic()
  }, [])
  

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const { sdk, connected, connecting, provider, chainId } = useSDK()

  
  const connect = async () => {
    try {
      const _provider = new ethers.providers.Web3Provider(provider);
      const signer = _provider.getSigner();
      const contract = new ethers.Contract(EVM_ADDRESS, EVM_ABI, signer);
      const musicURL = await contract.musicURLList(id);
      const cid = musicURL.slice(7, 66);

      const response = await fetch(`https://nftstorage.link/ipfs/${cid}/metadata.json`);
      let mdata = await response.json();
      console.log(mdata)
      let imageCid = mdata.image.slice(7);
      mdata.image = `https://nftstorage.link/ipfs/${imageCid}`;
      setData(mdata);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const getURLMusic = async () => {
    try {
      const _provider = new ethers.providers.Web3Provider(provider);
      const signer = _provider.getSigner();

      const contract = new ethers.Contract(Registry_ADDRESS, Registry_ABI, signer)
      const url = await contract.getURL(Account_ADDRESS, "59140", EVM_ADDRESS, id, "1");
      setMusicURL(url)
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const subscribe = async () => {
    openPopup()
    const _provider = new ethers.providers.Web3Provider(provider)
    const signer = _provider.getSigner()

    const contract = new ethers.Contract(Registry_ADDRESS, Registry_ABI, signer)
    const ethToWei = ethers.utils.parseUnits('0.03', 'ether')
    const transaction = await contract.purchaseAccessToken(
      Account_ADDRESS,
      '59140',
      EVM_ADDRESS,
      id,
      '1',
      { value: ethToWei },
    )
    const tx = await transaction.wait()
    setTx(tx)
    console.log(tx)
    getURLMusic();
  }

  const handleDownload = async () => {
    try {
      const musicUrl = musicURL;
      const response = await fetch(musicUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'music.mp3'); // Customize the filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading music:', error);
    }
  };

  return (
    <Flex>
      <Sidebar />
      <Container maxW="1100px" mt="3">
        <Popup
          title="Verifying token ownership"
          isOpen={isPopupOpen}
          onClose={closePopup}
          tx={tx}
          verify="true"
        />
        <div className="flex justify-between pt-20 w-full">
          <div className="w-full mt-[-40px]">
            <div className="relative w-[300px] h-[300px] border-dashed">
              <img
                src={Disc}
                alt="icon image"
                className="absolute inset-0 m-auto ml-[130px] z-[-10] mb-4"
                width="260px"
              />
              {data.image ? (
                <img
                  src={data.image}
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
            <div>
              <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-5">
                Name
              </h3>
              <p className="rounded-md  mt-4">{data.name}</p>

              <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-8">
                Description
              </h3>
              <p className="rounded-md  mt-4">{data.description}</p>
            </div>
          </div>

          <div className="w-full px-12">
            <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">
              Pricing
            </h3>
            <div className="w-full mt-6 px-4 py-2 border border-[#E1E1E1] rounded hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300  mr-8 text-[#4B4B4B] mt-4 mb-6">
              <p className="text-[20px] text-[#15C5CE] leading-[24px] flex gap-[100px] ">
                <span className="text[#15C5CE">Full Access </span>
                <span className="text-[#4B4B4B] ">0.03ETH</span>
              </p>
            </div>
            <Card my="3">
              <LineChart />
            </Card>
            {connected ? (
              <div className="mt-8">
                <button
                  className="border border-[#4B4B4B
                  ] w-full px-4 py-2 text-black rounded-lg hover:bg-black hover:text-white m-2 disabled:text-gray-300"
                  onClick={() => subscribe()}
                  disabled={musicURL !== ""}
                >
                  Purchase token for licensing
                </button>
                <button
                  className="border border-[#4B4B4B
                  ] w-full px-4 py-2 text-black rounded-lg hover:bg-black hover:text-white m-2"
                  onClick={handleDownload}
                >
                  Decrypt and download
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 border border-[#E1E1E1
    ] rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300 bg-[#4B4B4B] text-white w-[160px]"
                onClick={() => connect()}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </Container>
    </Flex>
  )
}

export default FanMusicDetail
