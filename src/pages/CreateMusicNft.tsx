import React, { useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers'
import Upload from '../components/musician/create-music-nft/Upload'
import AddCover from '../components/musician/create-music-nft/AddCover'
import AddDetails from '../components/musician/create-music-nft/AddDetails'
import PreviewDetails from '../components/musician/create-music-nft/PreviewDetails'
import Pricing from '../components/musician/create-music-nft/Pricing'
import {
  EVM_ADDRESS,
  EVM_ABI,
  Registry_ADDRESS,
  Registry_ABI,
  Account_ADDRESS,
} from '../EVMcontract'
import { NFTStorageAPIKey } from '../../apikey'

function CreateMusicNft() {
  const [step, setStep] = useState(2)
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [mc, setMC] = useState()
  const [address, setAddress] = useState()
  const { sdk, connected, connecting, provider, chainId } = useSDK()
  const [nftId, setnftId] = useState()

  const connect = async () => {
    try {
      console.log(sdk, connected, connecting, provider, chainId)
      const accounts = await sdk?.connect()
      setAddress(accounts?.[0])
      const _provider = new ethers.providers.Web3Provider(provider)
      const signer = _provider.getSigner()

      const contract = new ethers.Contract(EVM_ADDRESS, EVM_ABI, signer)
      setMC(contract)
    } catch (err) {
      console.warn(`failed to connect..`, err)
    }
  }

  async function storeNFT() {
    const nftstorage = new NFTStorage({ token: NFTStorageAPIKey })
    // call client.store, passing in the image & metadata
    const result = await nftstorage.store({
      image,
      name,
      description,
    })
    console.log(result)
    const url = result.url
    mintNFT(url)
  }

  async function mintNFT(url) {
    const transaction = await mc.mint(address, url)
    const tx = await transaction.wait()
    console.log(tx)
    console.log(tx.events[0]?.args?.tokenId?.toString())
    setnftId(tx.events[0]?.args?.tokenId?.toString())
    setStep(5)
  }

  async function deployContract() {
    const _provider = new ethers.providers.Web3Provider(provider)
    const signer = _provider.getSigner()

    const contract = new ethers.Contract(Registry_ADDRESS, Registry_ABI, signer)
    const transaction = await contract.createAccount(
      Account_ADDRESS,
      '59140',
      EVM_ADDRESS,
      nftId,
      '1',
      '0x',
    )
    const tx = await transaction.wait()
    return tx
  }

  async function createToken() {
    const _provider = new ethers.providers.Web3Provider(provider)
    const signer = _provider.getSigner()

    const contract = new ethers.Contract(Registry_ADDRESS, Registry_ABI, signer)
    const transaction2 = await contract.createAccessToken(Account_ADDRESS, "59140", EVM_ADDRESS, nftId, "1");
    const tx2 = await transaction2.wait();
    return tx2;
  }

  return (
    <div className="">
      {step === 2 && <AddCover setStep={setStep} setImage={setImage} />}
      {step === 3 && (
        <AddDetails
          setStep={setStep}
          image={image}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          storeNFT={storeNFT}
          nftId={nftId}
          connect={connect}
          mc={mc}
        />
      )}
      {step === 4 && <PreviewDetails setStep={setStep} />}
      {step === 5 && (
        <Pricing
          setStep={setStep}
          image={image}
          name={name}
          description={description}
          deployContract={deployContract}
          nftId={nftId}
          createToken={createToken}
        />
      )}
      {step === 7 && <Upload setStep={setStep} step={step} />}
    </div>
  )
}

export default CreateMusicNft
