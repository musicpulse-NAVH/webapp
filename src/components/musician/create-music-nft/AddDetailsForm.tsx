import React, { useState } from "react";

function AddDetailsForm({ name, setName, description, setDescription }: any) {
  const checkLength = (input) => {
    if (description.length < 100) {
    }
  };

  const handleSubmit = async () => { };
  const saveFile = async () => {
    setStep(4);
  };
  return (
    <div className="w-full">
      <form className="ml-8 space-y-4 px-16" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-[32px] text-[#1F1F1F] leading-[24px]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full h-10 border border-gray-300 rounded-md px-3 mt-4 focus:ring focus:ring-blue-300 focus:border-blue-300"
            placeholder="Text Input"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="mt-8 block text-[32px] text-[#1F1F1F] leading-[24px]"
          >
            Description
          </label>
          <div className="relative w-full h-[290px]">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              className="absolute block w-full h-full  border border-gray-300 rounded-md px-3 mt-4 focus:ring focus:ring-blue-300 focus:border-blue-300"
              placeholder="Enter description"
            ></textarea>
            <p className="absolute bottom-0 right-5 z-index-10">
              {description.length}/1000
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDetailsForm;
