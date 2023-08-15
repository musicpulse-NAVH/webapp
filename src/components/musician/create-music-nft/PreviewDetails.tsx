import React from "react";

function PreviewDetails({ setStep, step, name, description }: any) {
  return (
    <div className="w-full px-12">
      <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px]">Name</h3>
      <p className="rounded-md  mt-4">{name}</p>

      <h3 className="block text-[32px] text-[#1F1F1F] leading-[24px] mt-8">
        Description
      </h3>
      <p className="rounded-md  mt-4">
        {description}
      </p>

      <p className="rounded-md  mt-4">
        The price for each type of subscription is pre-set at the moment. As a
        model creator, you will be able to customize the prices in the near
        future when these features are released.
      </p>
    </div>
  );
}

export default PreviewDetails;
