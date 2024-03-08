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
    <div className="justify-content-center">
      <br />
      <br />
      <div className="row">
        <div className="col-6">
          <span className="title text-white" id="inputGroup-sizing-default">
            Withdraw YK Tokens
          </span>
          <br />
          <br />
          <label className="text-white">Withdrawable Amount: {ykShares}</label>
          <br />
          <br />
          <div className="input-group mb-3">
            <label className="text-white" style={{ marginRight: "5px" }}>
              Number of Tokens:{" "}
            </label>
            <input
              type="number"
              className="text-black"
              onChange={(e) => {
                info.current = { ...info.current, amount1: Number(e.target.value) };
              }}
            />
            <button
              disabled={ykShares === 0}
              type="button"
              className="btn btn-primary rounded-0"
              onClick={() => {
                onWithdrawYKTokens(info.current.amount1);
              }}
            >
              Withdraw Tokens
            </button>
          </div>
        </div>
        <div className="col-6">
          <span className="title text-white mt-5" id="inputGroup-sizing-default">
            Withdraw Voter Tokens
          </span>
          <br />
          <br />
          <label className="text-white">Withdrawable Amount: {voterShares}</label>
          <br />
          <br />
          <div className="input-group mb-3">
            <label className="text-white" style={{ marginRight: "5px" }}>
              Number of Tokens:{" "}
            </label>
            <input
              type="number"
              className="text-black"
              onChange={(e) => {
                info.current = { ...info.current, amount2: Number(e.target.value) };
              }}
            />
            <button
              disabled={voterShares === 0}
              type="button"
              className="btn btn-primary rounded-0"
              onClick={() => {
                onWithdrawVoterTokens(info.current.amount2);
              }}
            >
              Withdraw Tokens
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default WithdrawTokens;
