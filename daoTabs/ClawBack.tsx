import React, { useState, useRef } from "react";

interface ClawBackProps {
  onClawBackYKFromAll: () => void;
  onClawBackYKFromSingleAddress: (address: string) => void;
  onClawBackVoterFromAll: () => void;
  onClawBackVoterFromSingleAddress: (address: string) => void;
}

const ClawBack: React.FC<ClawBackProps> = ({
  onClawBackYKFromAll,
  onClawBackYKFromSingleAddress,
  onClawBackVoterFromAll,
  onClawBackVoterFromSingleAddress,
}) => {
  const [clawBackAllYK, setClawBackAllYK] = useState(false);
  const [clawBackAllVoter, setClawBackAllVoter] = useState(false);
  const info = useRef({ addressYK: "", addressVoter: "" });

  return (
    <div className="flex flex-col items-center space-y-6 gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Clawback YK Tokens</h2>
      <div className="flex flex-row items-center gap-4">
        <span>Withdraw from all wallets</span>
        <label className="switch relative">
          <input
            type="checkbox"
            checked={clawBackAllYK}
            onChange={() => setClawBackAllYK(!clawBackAllYK)}
            className="opacity-0 w-0 h-0"
          />
          <span className="slider round"></span>
        </label>
      </div>

      {!clawBackAllYK && (
        <input
          type="text"
          className="input-field text-black rounded-md w-full h-10"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, addressYK: e.target.value };
          }}
          style={{ color: "black" }}
        />
      )}
      <button
        type="button"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          clawBackAllYK ? onClawBackYKFromAll() : onClawBackYKFromSingleAddress(info.current.addressYK);
        }}
      >
        ClawBack YK Tokens
      </button>
      <h2 className="text-2xl font-bold text-gray-800">Clawback Voter Tokens</h2>

      <div className="flex flex-row items-center gap-4">
        <span>Withdraw from all wallets</span>
        <label className="switch">
          <input type="checkbox" checked={clawBackAllVoter} onChange={() => setClawBackAllVoter(!clawBackAllVoter)} />
          <span className="slider round"></span>
        </label>
      </div>

      {!clawBackAllVoter && (
        <input
          type="text"
          className="input-field text-black rounded-md w-full h-10"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, addressVoter: e.target.value };
          }}
          style={{ color: "black" }}
        />
      )}
      <button
        type="button"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          clawBackAllVoter ? onClawBackVoterFromAll() : onClawBackVoterFromSingleAddress(info.current.addressVoter);
        }}
      >
        ClawBack Voter Tokens
      </button>
    </div>
  );
};

export default ClawBack;
