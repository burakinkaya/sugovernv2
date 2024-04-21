import React, { useRef } from "react";

interface TransferTokensProps {
  onTransferVoterTokens: (address: string, amount: number) => void;
  onTransferYKTokens: (address: string, amount: number) => void;
}

interface TokenInfo {
  addressYK: string;
  amountYK: number;
  addressVoter: string;
  amountVoter: number;
}

const TransferTokens: React.FC<TransferTokensProps> = ({ onTransferVoterTokens, onTransferYKTokens }) => {
  const info = useRef<TokenInfo>({
    addressYK: "",
    amountYK: 0,
    addressVoter: "",
    amountVoter: 0,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* YK Tokens Transfer Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Transfer YK Tokens to Address</h2>
        <div className="mb-4">
          <label htmlFor="addressBoxYK" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="addressBoxYK"
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => (info.current = { ...info.current, addressYK: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amountYK" className="block text-gray-700 text-sm font-bold mb-2">
            Number of Tokens:
          </label>
          <input
            type="number"
            id="amountYK"
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => (info.current = { ...info.current, amountYK: parseInt(e.target.value) || 0 })}
          />
        </div>
        <button
          type="button"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onTransferYKTokens(info.current.addressYK, info.current.amountYK)}
        >
          Send YK Tokens
        </button>
      </div>

      {/* Voter Tokens Transfer Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Transfer Voter Tokens to Address</h2>
        <div className="mb-4">
          <label htmlFor="addressBoxVoter" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="addressBoxVoter"
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => (info.current = { ...info.current, addressVoter: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amountVoter" className="block text-gray-700 text-sm font-bold mb-2">
            Number of Tokens:
          </label>
          <input
            type="number"
            id="amountVoter"
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => (info.current = { ...info.current, amountVoter: parseInt(e.target.value) || 0 })}
          />
        </div>
        <button
          type="button"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onTransferVoterTokens(info.current.addressVoter, info.current.amountVoter)}
        >
          Send Voter Tokens
        </button>
      </div>
    </div>
  );
};

export default TransferTokens;
