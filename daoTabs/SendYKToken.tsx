import React, { useRef } from "react";

interface SendYKTokenProps {
  onSendTokens: (address: string, amount: number) => void;
}

const SendYKToken: React.FC<SendYKTokenProps> = ({ onSendTokens }) => {
  const info = useRef({ address: "", amount: 0 });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Mint YK Tokens to Address</h2>

      <div className="mb-4">
        <label htmlFor="addressInput" className="block text-gray-700 text-sm font-bold mb-2">
          Address
        </label>
        <input
          id="addressInput"
          type="text"
          className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Wallet Address"
          onChange={(e) => {
            info.current = { ...info.current, address: e.target.value };
          }}
          style={{ color: "black" }}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amountInput" className="block text-gray-700 text-sm font-bold mb-2">
          Number of Tokens
        </label>
        <input
          id="amountInput"
          type="number"
          className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Number of Tokens"
          onChange={(e) => {
            info.current = { ...info.current, amount: Number(e.target.value) };
          }}
          style={{ color: "black" }}
        />
      </div>

      <button
        type="button"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
