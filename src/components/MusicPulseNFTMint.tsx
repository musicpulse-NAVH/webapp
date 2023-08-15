import { useState } from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";

/**
 * These react hooks are generated with the wagmi cli via `wagmi generate`
 * @see ROOT/wagmi.config.ts
 */
import {
  usePrepareMusicPulseNftMint,
  useMusicPulseNftMint,
  useMusicPulseNftBalanceOf,
  useMusicPulseNftSymbol,
} from "../generated";

/**
 * An example component using the attestation station
 */
export function MusicPulseNFTMint() {
  /**
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { address } = useAccount();
  /**
   * @see https://reactjs.org/docs/hooks-state.html
   */
  const [value, setValue] = useState("https://testTokenURI01");


  /**
   * Automatically generated hook to prepare the transaction
   * @see https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
   */
  const { config } = usePrepareMusicPulseNftMint({
    args: [address!, value],
  });

  /**
   * Automatically generated hook to execute the transaction
   * @see https://wagmi.sh/react/execute-hooks/useContractWrite
   */
  const { data: mintReturnedData, write } = useMusicPulseNftMint({
    ...config,
    onSuccess: () => {
      //setValue("")
      console.log("value", value);
    },
  });

  /**
   * Automatically generated hook to read the attestation
   * @see https://wagmi.sh/react/execute-hooks/useContractRead
   */
  const { refetch, data: balanceOf } = useMusicPulseNftBalanceOf({
    args: [address!],
  });
  const { refetch: refetchNftSymbol, data: nftSymbol } = useMusicPulseNftSymbol();

  /**
   * Wagmi hook to wait for the transaction to be complete
   * @see https://wagmi.sh/docs/hooks/useWaitForTransaction
   */
  const { isLoading } = useWaitForTransaction({
    hash: mintReturnedData?.hash,
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <h2>MusicPulseNFTMint</h2>
      <div>
        Current NFT symbol: {nftSymbol || "Unknown"}
      </div>
      <div>
        User address: {address || "Unknown"}
      </div>
      <div>
        Current balanceOf: {balanceOf ? balanceOf?.toString() : "none"}
      </div>
      <div>
        isLoading: {isLoading ? "true" : "false"}
      </div>
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Mint
      </button>
      {/* isLoading && <ProcessingMessage hash={mintReturnedData?.hash} /> */}
      <div>
        Gas fee: <span>{config.request?.gas?.toString()}</span>
      </div>
    </div>
  );
}

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;
  return (
    <span>
      Processing transaction...{" "}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  );
}
