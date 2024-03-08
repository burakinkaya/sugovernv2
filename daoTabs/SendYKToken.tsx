import React, { useRef } from "react";

interface SendYKTokenProps {
  onSendTokens: (address: string, amount: number) => void;
}

const SendYKToken: React.FC<SendYKTokenProps> = ({ onSendTokens }) => {
  const info = useRef({ address: "", amount: 0 });

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-center text-2xl font-bold text-gray-800">Transfer YK Tokens to Address</div>
      <div className="form-group">
        <input
          type="text"
          className="form-input mt-1 block w-80 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, address: e.target.value };
          }}
        />
        <input
          type="number"
          className="form-input mt-1 block w-80 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
          placeholder="Number of Tokens"
          onChange={(e) => {
            info.current = { ...info.current, amount: Number(e.target.value) };
          }}
        />
      </div>
      <button
        type="button"
        className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        onClick={() => {
          onSendTokens(info.current.address, info.current.amount);
        }}
      >
        Send YK Tokens
      </button>
    </div>
  );
};

export default SendYKToken;
