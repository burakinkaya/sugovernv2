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
      <div className="container mx-auto border border-gray-200 p-4 rounded-lg bg-white shadow-lg mt-5">
        <h3 className="text-2xl text-center font-semibold text-gray-800">Create New Proposal</h3>
        <br />
        <br />
        <form className="mt-8 space-y-6">
          <div className="form-group">
            <div className="flex flex-col">
              <label htmlFor="proposalTitle" className="block text-sm font-medium text-gray-700">
                Proposal Title
              </label>
              <input
                type="text"
                id="proposalTitle"
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Proposal Title"
                onChange={(e) => {
                  proposal.current.text = e.target.value;
                }}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="proposalDescription" className="block text-sm font-medium text-gray-700">
              Proposal Description
            </label>
            <textarea
              id="proposalDescription"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter Proposal Description"
              onChange={(e) => {
                proposal.current.desc = e.target.value;
              }}
            />
          </div>
          <br />
          <button
            type="button"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              proposal.current.options.push("");
              setInputList([
                ...inputList,
                <div key={inputList.length}>
                  <br />
                  <label>Option {inputList.length + 1}: </label>
                  <input
                    className="rounded-md appearance-none relative block px-3 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-medium text-gray-700">Voting Power: </label>
          <input
            className="rounded-md appearance-none relative block px-3 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="number"
            placeholder="Enter Voting Power"
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
