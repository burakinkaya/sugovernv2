import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";

interface Proposal {
  title: string;
  description: string;
  votingPower: number;
  choices: string[];
  type: string;
  voted: boolean;
  status: number;
  voteNumbers: number[];
}

interface VoteOnProposalsProps {
  onGetAllProposals: () => Promise<Proposal[]>;
  onVoteOnNormalProposals: (index: string, choices: string[], votes: number[]) => void;
  onVoteOnWeightedProposals: (index: string, choices: string[], votes: number[], weight: number) => void;
  voterBalance: number;
}

const VoteOnProposals: React.FC<VoteOnProposalsProps> = ({
  onGetAllProposals,
  onVoteOnNormalProposals,
  onVoteOnWeightedProposals,
  voterBalance,
}) => {
  const [allProps, setAllProps] = useState<Proposal[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [currAmountOfVotes, setCurrAmountOfVotes] = useState<number[][]>([]);
  const [weights, setWeights] = useState<number[]>([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposals = await onGetAllProposals();
        setAllProps(proposals);
        setCurrAmountOfVotes(initializeVotesArray(proposals));
        setWeights(new Array(proposals.length).fill(voterBalance));
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProposals();
  }, [onGetAllProposals, voterBalance]);

  const initializeVotesArray = (proposals: Proposal[]): number[][] =>
    proposals.map((proposal) => new Array(proposal.choices.length).fill(0));

  const getTotalCount = (votes: number[]): number => votes.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      {!loaded ? (
        <Spinner />
      ) : allProps.length === 0 ? (
        <div className="container mx-auto mt-5 text-center">
          <label className="text-white">There is no proposal</label>
        </div>
      ) : (
        allProps.map((proposal, index) => (
          <div key={index} className="p-5 my-4 bg-white text-white rounded-lg shadow border border-gray-200 py-2 px-4">
            <div className="font-bold text-xl">{proposal.title}</div>
            <br />
            <p className="truncate max-h-[5em] leading-tight">{proposal.description}</p>
            <br />
            <div className="italic">Voting Power: {proposal.votingPower}</div>
            <br />
            {proposal.choices.map((choice, choiceIndex) => (
              <div
                key={choiceIndex}
                className="flex items-center space-x-4 py-2 bg-gray-100 rounded-lg shadow my-2 gap-4"
              >
                <h1 className="flex-auto text-lg font-semibold">Vote for {choice}</h1>
                <div className="flex flex-row items-center space-x-2 gap-4">
                  <button
                    className="px-3 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    disabled={proposal.voted || currAmountOfVotes[index][choiceIndex] === 0}
                    onClick={() => {
                      const newVotes = [...currAmountOfVotes];
                      newVotes[index][choiceIndex]--;
                      setCurrAmountOfVotes(newVotes);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center bg-white text-black border border-gray-300 shadow-inner rounded-lg"
                    disabled={proposal.voted}
                    value={currAmountOfVotes[index][choiceIndex]}
                    style={{ color: "black" }}
                  />
                  <button
                    className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={
                      proposal.voted ||
                      getTotalCount(currAmountOfVotes[index]) === proposal.votingPower ||
                      voterBalance <= 0
                    }
                    onClick={() => {
                      const newVotes = [...currAmountOfVotes];
                      newVotes[index][choiceIndex]++;
                      setCurrAmountOfVotes(newVotes);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-2">
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={proposal.voted || voterBalance <= 0}
                onClick={() => {
                  proposal.type === "normal"
                    ? onVoteOnNormalProposals(index.toString(), proposal.choices, currAmountOfVotes[index])
                    : onVoteOnWeightedProposals(
                        index.toString(),
                        proposal.choices,
                        currAmountOfVotes[index],
                        weights[index]
                      );
                }}
              >
                {proposal.voted ? "You already Voted" : "Vote"}
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default VoteOnProposals;
