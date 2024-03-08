// Sidebar.tsx
import React from "react";
import { daodeployerWallet } from "../../constant";

interface SidebarProps {
  setSelectedNavItem: (item: number) => void;
  selectedNavItem: number;
  status: "member" | "admin";
  ykBalance: number;
  voterBalance: number;
  walletAddress: string;
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  setSelectedNavItem,
  selectedNavItem,
  status,
  ykBalance,
  voterBalance,
  walletAddress,
  isAdmin,
}) => {
  const isActive = (item: number) => (selectedNavItem === item ? "bg-[#16141D]" : "");

  return status === "member" || status === "admin" ? (
    <div className="fixed top-20 left-32 h-screen w-64 text-white overflow-y-auto text-center">
      {(isAdmin || ykBalance > 0) && (
        <div className="my-4">
          <h3 className="px-4 py-2 text-lg font-semibold text-[#973B82]">Administrative</h3>
          <ul className="flex flex-col">
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(0)}`} onClick={() => setSelectedNavItem(0)}>
                Create a SubDAO
              </p>
            </li>
            {(isAdmin || ykBalance > 0) && (
              <li className="nav-item">
                <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(1)}`} onClick={() => setSelectedNavItem(1)}>
                  Assign a New YK
                </p>
              </li>
            )}
            {walletAddress === daodeployerWallet && (
              <li className="nav-item">
                <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(2)}`} onClick={() => setSelectedNavItem(2)}>
                  ClawBack Tokens
                </p>
              </li>
            )}
            {(isAdmin || ykBalance > 0) && (
              <li className="nav-item">
                <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(3)}`} onClick={() => setSelectedNavItem(3)}>
                  Send Voter Token
                </p>
              </li>
            )}
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(4)}`} onClick={() => setSelectedNavItem(4)}>
                Create New Proposal
              </p>
            </li>
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(5)}`} onClick={() => setSelectedNavItem(5)}>
                Delete DAO
              </p>
            </li>
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(12)}`} onClick={() => setSelectedNavItem(12)}>
                Transfer Tokens
              </p>
            </li>
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(7)}`} onClick={() => setSelectedNavItem(7)}>
                Withdraw Tokens
              </p>
            </li>
          </ul>
        </div>
      )}
      {status === "member" || status === "admin" ? (
        <div className="my-4">
          <h2 className="px-4 py-2 text-lg font-semibold text-[#973B82]">Member Functions</h2>
          <ul className="flex flex-col">
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(9)}`} onClick={() => setSelectedNavItem(9)}>
                Vote on Proposals
              </p>
            </li>
            <li className="nav-item">
              <p className={`nav-link px-4 py-2 cursor-pointer ${isActive(6)}`} onClick={() => setSelectedNavItem(6)}>
                Check My Tokens
              </p>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Sidebar;
