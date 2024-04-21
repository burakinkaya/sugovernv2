import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";
import PieChart from "../src/components/PieChart";
import BarChart from "../src/components/BarChart";

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
interface ProposalsProps {
  ykBalance: number;
  voterBalance: number;
  onGetAllProposals: () => Promise<Proposal[]>;
  onhandleAcceptClick: (index: number) => void;
  onhandleRejectClick: (index: number) => void;
  onhandlePendingClick: (index: number) => void;
  isAdmin: boolean;
}

const Proposals: React.FC<ProposalsProps> = ({
  ykBalance,
  voterBalance,
  onGetAllProposals,
  onhandleAcceptClick,
  onhandleRejectClick,
  onhandlePendingClick,
  isAdmin,
}) => {
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isCollapsed, setCollapsed] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchAllProposals = async () => {
      setLoaded(false);
      try {
        const proposals = await onGetAllProposals();
        setAllProposals(proposals);
        setCollapsed(new Array(proposals.length).fill(true));
      } catch (err) {
        console.error("Error fetching proposalsssss:", err);
      } finally {
        setLoaded(true);
      }
    };

    fetchAllProposals();
  }, [onGetAllProposals]);

  const toggleCollapse = (index: number) => {
    const newCollapsed = [...isCollapsed];
    newCollapsed[index] = !newCollapsed[index];
    setCollapsed(newCollapsed);
  };

  const renderProposalCard = (proposal: Proposal, index: number) => {
    let statusText = proposal.status === 0 ? "Accepted" : proposal.status === 1 ? "Rejected" : "Pending";

    let votesAsNumbers = proposal.voteNumbers.map((voteCount) => Number(voteCount));
    console.log("votes as numbers ", votesAsNumbers);

    return (
      <div key={index} className="border border-black p-5 my-5 mx-5 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between p-4">
          <div className="flex flex-row justify-between p-4">
            <h4 className="text-lg font-bold">{proposal.title}</h4>
            <button
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => toggleCollapse(index)}
            >
              {isCollapsed[index] ? "Expand" : "Collapse"}
            </button>
          </div>
          <br />
          <div className="space-x-2">
            {(isAdmin || ykBalance > 0) && (
              <div className="flex flex-row gap-4 px-4">
                <div className="font-bold">Status: {statusText}</div>
                <button
                  className="items-center group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onhandleAcceptClick(index)}
                >
                  Accept
                </button>
                <button
                  className="items-center group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onhandleRejectClick(index)}
                >
                  Reject
                </button>
                <button
                  className="items-center group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onhandlePendingClick(index)}
                >
                  Pending
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="truncate max-h-[5em] p-4">{proposal.description}</p>
        <div className="italic p-4">Voting Power: {proposal.votingPower}</div>

        <div className="flex flex-row justify-center items-center space-x-4 ">
          <div className="w-64 h-64">
            <PieChart
              chartData={{
                labels: proposal.choices,
                datasets: [
                  {
                    label: "Votes",
                    data: votesAsNumbers,
                    backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
                    borderColor: "black",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <div className="w-64 h-64">
            <BarChart
              chartData={{
                labels: proposal.choices,
                datasets: [
                  {
                    label: "Votes",
                    data: votesAsNumbers,
                    backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
                    borderColor: "black",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
        <br />
      </div>
    );
  };
  const collapsedProposalCard = (proposal: Proposal, index: number) => (
    <div key={index} className="border border-black p-5 my-5 mx-5 rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h4 className="text-lg font-bold">{proposal.title}</h4>
        <button
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => toggleCollapse(index)}
        >
          Expand
        </button>
      </div>
    </div>
  );

  return !loaded ? (
    <Spinner />
  ) : allProposals.length === 0 ? (
    <div className="text-center text-dark mt-5">There is no proposal</div>
  ) : (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Proposals</h2>
      <div className="flex flex-col gap-4">
        {allProposals.map((proposal, index) =>
          isCollapsed[index] ? collapsedProposalCard(proposal, index) : renderProposalCard(proposal, index)
        )}
      </div>
    </div>
  );
};

export default Proposals;
