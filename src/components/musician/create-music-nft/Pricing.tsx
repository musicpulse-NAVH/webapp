import React from "react";

function Pricing({ setStep, step }: any) {
  return (
    <div>
      <button onClick={() => setStep(6)}>Pricing Btn</button>
    </div>
  );
}

export default Pricing;
