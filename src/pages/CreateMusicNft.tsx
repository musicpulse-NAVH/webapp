import React, { useState } from "react";
import { NFTStorage, File } from 'nft.storage';
import Upload from "../components/musician/create-music-nft/Upload";
import AddCover from "../components/musician/create-music-nft/AddCover";
import AddDetails from "../components/musician/create-music-nft/AddDetails";
import PreviewDetails from "../components/musician/create-music-nft/PreviewDetails";
import Pricing from "../components/musician/create-music-nft/Pricing";

function CreateMusicNft() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
  }

  return (
    <div className="">
      {step === 1 && <Upload setStep={setStep} step={step} />}
      {step === 2 && <AddCover setStep={setStep} setImage={setImage} />}
      {step === 3 && <AddDetails setStep={setStep} image={image} name={name} setName={setName} description={description} setDescription={setDescription} storeNFT={storeNFT} />}
      {step === 4 && <PreviewDetails setStep={setStep} />}
      {step === 5 && <Pricing setStep={setStep} />}
    </div>
  );
}

export default CreateMusicNft;
