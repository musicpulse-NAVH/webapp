import React, { useState } from "react";
import { MetaMaskSDK } from '@metamask/sdk';
import { NFTStorage, File } from 'nft.storage';
import { ethers } from 'ethers';
import Upload from "../components/musician/create-music-nft/Upload";
import AddCover from "../components/musician/create-music-nft/AddCover";
import AddDetails from "../components/musician/create-music-nft/AddDetails";
import PreviewDetails from "../components/musician/create-music-nft/PreviewDetails";
import Pricing from "../components/musician/create-music-nft/Pricing";
import { EVM_ADDRESS, EVM_ABI } from "../EVMcontract";

const options = {
  useDeeplink: false,
  communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/',
  autoConnect: {
    enable: true
  },
  dappMetadata: {
    name: "Music Pulse",
    url: window.location.host,
  },
  logging: {
    developerMode: false,
  },
  storage: {
    enabled: true,
  }
};

function CreateMusicNft() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mc, setMC] = useState();
  const [address, setAddress] = useState();

  async function connect(){
    // const MMSDK = new MetaMaskSDK(options);
    // const ethereum = MMSDK.getProvider();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
    setAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(EVM_ADDRESS, EVM_ABI, signer);
    setMC(contract);
  }

  async function storeNFT() {
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: "" });

    // call client.store, passing in the image & metadata
    const result = await nftstorage.store({
      image,
      name,
      description,
    });

    console.log(result);
    const url = result.url;
    mintNFT(url);
  }

  async function mintNFT(url){
    const transaction = await mc.mint(address, url);
    const tx = await transaction.wait();
    console.log(tx);
  }

  return (
    <div className="">
      {step === 1 && <Upload setStep={setStep} step={step} />}
      {step === 2 && <AddCover setStep={setStep} setImage={setImage} />}
      {step === 3 && <AddDetails setStep={setStep} image={image} name={name} setName={setName} description={description} setDescription={setDescription} storeNFT={storeNFT} connect={connect} mc={mc} />}
      {step === 4 && <PreviewDetails setStep={setStep} />}
      {step === 5 && <Pricing setStep={setStep} />}
    </div>
  );
}

export default CreateMusicNft;
