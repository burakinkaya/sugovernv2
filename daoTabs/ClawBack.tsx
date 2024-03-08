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
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Clawback YK Tokens</h2>
      <label className="switch">
        <input type="checkbox" checked={clawBackAllYK} onChange={() => setClawBackAllYK(!clawBackAllYK)} />
        <span className="slider round"></span>
      </label>
      {!clawBackAllYK && (
        <input
          type="text"
          className="input-field text-black"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, addressYK: e.target.value };
          }}
        />
      )}
      <button
        className="action-button"
        onClick={() => {
          clawBackAllYK ? onClawBackYKFromAll() : onClawBackYKFromSingleAddress(info.current.addressYK);
        }}
      >
        ClawBack YK Tokens
      </button>

      <h2 className="text-2xl font-bold text-gray-800">Clawback Voter Tokens</h2>
      <label className="switch">
        <input type="checkbox" checked={clawBackAllVoter} onChange={() => setClawBackAllVoter(!clawBackAllVoter)} />
        <span className="slider round"></span>
      </label>
      {!clawBackAllVoter && (
        <input
          type="text"
          className="input-field text-black"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, addressVoter: e.target.value };
          }}
        />
      )}
      <button
        className="action-button"
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
