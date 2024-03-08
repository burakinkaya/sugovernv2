import React, { useRef } from "react";

interface SendVoterTokenProps {
  onSendTokens: (address: string, amount: number) => void;
}

const SendVoterToken: React.FC<SendVoterTokenProps> = ({ onSendTokens }) => {
  const info = useRef<{ address: string; amount: string }>({ address: "", amount: "" });

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Send Tokens to Address</h2>
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tokens:</label>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            info.current = { ...info.current, amount: e.target.value };
          }}
        />
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          onSendTokens(info.current.address, Number(info.current.amount));
        }}
      >
        Send Tokens
      </button>
    </>
  );
};

export default SendVoterToken;
