import { redirect } from "next/dist/server/api-utils";
import Button from "./Button";
import { daodeployerWallet } from "../../constant";
import React from "react";

interface SidebarProps {
    setSelectedNavItem: (selectedNavItem: number) => void; // Assuming this is a function that accepts a number
    selectedNavItem: number; // Assuming this is a number
    status: 'member' | 'admin'; // Assuming this is either 'member' or 'admin'
    ykBalance: number; // Assuming this is a number
    voterBalance: number; // Assuming this is a number
    walletAddress: string; // Assuming this is a string
    isAdmin: boolean; // Assuming this is a boolean
  }
  
  function Sidebar({
    setSelectedNavItem,
    selectedNavItem,
    status,
    ykBalance,
    voterBalance,
    walletAddress,
    isAdmin,
  }: SidebarProps) {
    return status === "member" || status === "admin" ? (
        <div className="flex flex-col p-4 bg-gray-100 w-64 min-h-screen">
          {(isAdmin || ykBalance > 0) && (
            <ul className="space-y-2">
              <li className="text-xl font-bold text-gray-900">Administrative</li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 0 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(0)}
                >
                  Create a SubDAO
                </button>
              </li>
              {(isAdmin || ykBalance > 0) && (
                <li>
                  <button
                    className={`nav-item ${selectedNavItem === 1 ? "text-blue-500" : "text-black"} cursor-pointer`}
                    onClick={() => setSelectedNavItem(1)}
                  >
                    Assign a New YK
                  </button>
                </li>
              )}
    
              {walletAddress === daodeployerWallet && (
                <li>
                  <button
                    className={`nav-item ${selectedNavItem === 2 ? "text-blue-500" : "text-black"} cursor-pointer`}
                    onClick={() => setSelectedNavItem(2)}
                  >
                    ClawBack Tokens
                  </button>
                </li>
              )}
              {isAdmin && (
                <li>
                  <button
                    className={`nav-item ${selectedNavItem === 3 ? "text-blue-500" : "text-black"} cursor-pointer`}
                    onClick={() => setSelectedNavItem(3)}
                  >
                    Send Voter Token
                  </button>
                </li>
              )}
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 4 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(4)}
                >
                  Create New Proposal
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 5 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(5)}
                >
                  Delete DAO
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 12 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(12)}
                >
                  Transfer Tokens
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 7 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(7)}
                >
                  Withdraw Tokens
                </button>
              </li>
            </ul>
          )}
          {status === "member" || status === "admin" && (
            <ul className="space-y-2">
              <li className="text-xl font-bold text-gray-900">Member Functions</li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 9 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(9)}
                >
                  Vote on Proposals
                </button>
              </li>
              <li>
                <button
                  className={`nav-item ${selectedNavItem === 6 ? "text-blue-500" : "text-black"} cursor-pointer`}
                  onClick={() => setSelectedNavItem(6)}
                >
                  Check My Tokens
                </button>
              </li>
              {/* More list items and conditional renderings could be added here */}
            </ul>
          )}
        </div>
      ) : null;
    };
    
    export default Sidebar;