import React from "react";

interface CheckMyTokensProps {
  _ykBalance: number;
  _voterBalance: number;
}

const CheckMyTokens: React.FC<CheckMyTokensProps> = ({ _ykBalance, _voterBalance }) => {
  return (
    <div className="container m-3 text-center">
      <br />
      <label className="text-white">Voter Balance: {_voterBalance} Token</label>
      <br />
      <br />
      <label className="text-white">YK Balance: {_ykBalance} Token</label>
    </div>
  );
};

export default CheckMyTokens;
