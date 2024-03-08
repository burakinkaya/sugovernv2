import React, { useState, useRef } from "react";

interface CreateProposalProps {
  onCreateProposal: (title: string, description: string, options: string[], votingPower: number, type: number) => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({ onCreateProposal }) => {
  const [inputList, setInputList] = useState<JSX.Element[]>([]);
  const [type, setType] = useState<number>(0);
  const proposal = useRef<{ text: string; desc: string; options: string[]; voting_power: number }>({
    text: "",
    desc: "",
    options: [],
    voting_power: 0,
  });

  return (
    <>
      <div className="col-span-2"></div>
      <div className="col-span-8 border border-dark text-white p-5">
        <h2 className="title text-white">
          <u>CREATE NEW PROPOSAL</u>
        </h2>
        <form>
          <label>Proposal Title: </label>
          <br />
          <textarea
            className="text-black"
            onChange={(e) => {
              proposal.current.text = e.target.value;
            }}
            style={{ width: "80%", padding: "5px" }}
          />
          <br />
          <br />
          <label>Proposal Description: </label>
          <br />
          <textarea
            className="text-black"
            onChange={(e) => {
              proposal.current.desc = e.target.value;
            }}
            style={{ width: "80%", padding: "5px" }}
          />
          <br />
          <br />
          <button
            type="button"
            className="btn btn-secondary rounded-0"
            onClick={() => {
              proposal.current.options.push("");
              setInputList([
                ...inputList,
                <div key={inputList.length}>
                  <br />
                  <label>Option {inputList.length + 1}: </label>
                  <input
                    className="text-black"
                    required
                    onChange={(e) => {
                      proposal.current.options[inputList.length] = e.target.value;
                    }}
                  />
                </div>,
              ]);
            }}
          >
            Add New Option
          </button>
          {inputList}
          <br />
          {inputList.length === 0 ? (
            <></>
          ) : (
            <button
              type="button"
              className="btn btn-danger rounded-0"
              onClick={() => {
                proposal.current.options.pop();
                setInputList(inputList.slice(0, -1));
              }}
            >
              Remove Last Option
            </button>
          )}
          <br />
          <br />
          <label>Voting Power: </label>
          <input
            className="text-black"
            type="number"
            onChange={(e) => {
              proposal.current.voting_power = Number(e.target.value);
            }}
          />
          <br />
          <br />
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckType"
              onClick={() => {
                setType(type === 0 ? 1 : 0);
              }}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckType">
              {type === 0 ? "Proposal Type: Normal" : "Proposal Type: Weighted"}
            </label>
          </div>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-primary rounded-0"
            onClick={() => {
              onCreateProposal(
                proposal.current.text,
                proposal.current.desc,
                proposal.current.options,
                proposal.current.voting_power,
                type
              );
            }}
          >
            Create This Proposal
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProposal;
