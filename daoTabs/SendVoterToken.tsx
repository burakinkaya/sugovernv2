import React, { useRef } from "react";

interface SendVoterTokenProps {
  onSendTokens: (address: string, amount: number) => void;
}

const SendVoterToken: React.FC<SendVoterTokenProps> = ({ onSendTokens }) => {
  const info = useRef<{ address: string; amount: string }>({ address: "", amount: "" });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Mint Voter Tokens to Address</h2>
      <div className="mb-4">
        <label htmlFor="addressBox" className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <input
          type="text"
          id="addressBox"
          onChange={(e) => {
            info.current = { ...info.current, address: e.target.value };
          }}
          className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          placeholder="Wallet Address"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tokens</label>
        <input
          type="number"
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            info.current = { ...info.current, amount: e.target.value };
          }}
          placeholder="Enter Number of Tokens"
        />
      </div>
      <button
        type="button"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          onSendTokens(info.current.address, Number(info.current.amount));
        }}
      >
        Send Tokens
      </button>
    </div>
  );
};

export default SendVoterToken;
