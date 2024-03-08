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
    <div className="row my-2">
      {/* YK Tokens Transfer Section */}
      <div className="row my-4">
        <span className="title text-white" id="inputGroup-sizing-default">
          Transfer YK Tokens to Address
        </span>
        <div className="form-group col-md-8">
          <label htmlFor="addressBoxYK" className="text-white">
            Address
          </label>
          <input
            type="text"
            id="addressBoxYK"
            className="form-control text-black"
            onChange={(e) => (info.current = { ...info.current, addressYK: e.target.value })}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="amountYK" className="text-white">
            Number of Tokens:
          </label>
          <input
            type="number"
            id="amountYK"
            className="form-control text-black"
            onChange={(e) =>
              (info.current = {
                ...info.current,
                amountYK: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary rounded"
          onClick={() => onTransferYKTokens(info.current.addressYK, info.current.amountYK)}
        >
          Send YK Tokens
        </button>
      </div>

      {/* Voter Tokens Transfer Section */}
      <div className="row my-4">
        <span className="title text-white" id="inputGroup-sizing-default">
          Transfer Voter Tokens to Address
        </span>
        <div className="form-group col-md-8">
          <label htmlFor="addressBoxVoter" className="text-white">
            Address
          </label>
          <input
            type="text"
            id="addressBoxVoter"
            className="form-control text-black"
            onChange={(e) =>
              (info.current = {
                ...info.current,
                addressVoter: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="amountVoter" className="text-white">
            Number of Tokens:
          </label>
          <input
            type="number"
            id="amountVoter"
            className="form-control text-black"
            onChange={(e) =>
              (info.current = {
                ...info.current,
                amountVoter: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-primary rounded"
          onClick={() => onTransferVoterTokens(info.current.addressVoter, info.current.amountVoter)}
        >
          Send Voter Tokens
        </button>
      </div>
    </div>
  );
};

export default TransferTokens;
