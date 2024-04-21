import React, { useEffect, useRef, useState } from "react";
import Spinner from "../src/components/Spinner";

interface WithdrawTokensProps {
  onVoterSharesToBeGiven: () => Promise<number>;
  onYKSharesToBeGiven: () => Promise<number>;
  onWithdrawVoterTokens: (amount: number) => void;
  onWithdrawYKTokens: (amount: number) => void;
}

interface WithdrawInfo {
  amount1: number;
  amount2: number;
}

const WithdrawTokens: React.FC<WithdrawTokensProps> = ({
  onVoterSharesToBeGiven,
  onYKSharesToBeGiven,
  onWithdrawVoterTokens,
  onWithdrawYKTokens,
}) => {
  const info = useRef<WithdrawInfo>({ amount1: 0, amount2: 0 });
  const [voterShares, setVoterShares] = useState<number>(-1);
  const [ykShares, setYKShares] = useState<number>(-1);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchShares = async () => {
      const voterSharesAmount = await onVoterSharesToBeGiven();
      const ykSharesAmount = await onYKSharesToBeGiven();
      setVoterShares(voterSharesAmount);
      setYKShares(ykSharesAmount);
      setLoaded(true);
    };
    fetchShares();
  }, [onVoterSharesToBeGiven, onYKSharesToBeGiven]);

  return !loaded ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-col items-center p-4 bg-white rounded shadow-lg w-full max-w-md">
        <span className="text-2xl font-bold text-gray-800">Withdraw YK Tokens</span>
        <span className="text-gray-600">Withdrawable Amount: {ykShares}</span>
        <div className="mt-4 w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tokens:</label>
            <input
              type="number"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-black"
              onChange={(e) => {
                info.current = { ...info.current, amount1: Number(e.target.value) };
              }}
              style={{ color: "black" }}
            />
          </div>

          <button
            disabled={ykShares === 0}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              onWithdrawYKTokens(info.current.amount1);
            }}
          >
            Withdraw Tokens
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 bg-white rounded shadow-lg w-full max-w-md">
        <span className="text-2xl font-bold text-gray-800">Withdraw Voter Tokens</span>
        <span className="text-gray-600">Withdrawable Amount: {voterShares}</span>
        <div className="mt-4 w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Tokens:</label>
            <input
              type="number"
              className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-black"
              onChange={(e) => {
                info.current = { ...info.current, amount2: Number(e.target.value) };
              }}
              style={{ color: "black" }}
            />
          </div>

          <button
            disabled={voterShares === 0}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              onWithdrawVoterTokens(info.current.amount2);
            }}
          >
            Withdraw Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTokens;
