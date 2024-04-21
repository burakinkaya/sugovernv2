"use client";
import { useState, useEffect } from "react";
import React from "react";
import Web3 from "web3";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import styles from "../styles/d_try.module.css";
import { useSearchParams } from "next/navigation";
import Proposals from "../../../daoTabs/Proposals";
import CreateProposal from "../../../daoTabs/CreateProposal";
import VoteOnProposals from "../../../daoTabs/VoteOnProposals";
import WithdrawTokens from "../../../daoTabs/WithdrawTokens";
import SendVoterToken from "../../../daoTabs/SendVoterToken";
import SendYKToken from "../../../daoTabs/SendYKToken";
import ViewSubDAOs from "../../../daoTabs/ViewSubDAOs";
import CreateChildDAO from "../../../daoTabs/CreateChildDAO";
import CheckMyTokens from "../../../daoTabs/CheckMyTokens";
import ClawBack from "../../../daoTabs/ClawBack";
import DeleteDAO from "../../../daoTabs/DeleteDAO";
import Sidebar from "../../components/SideBar";
import TransferTokens from "../../../daoTabs/TransferTokens";
import { DAO_JSON, TOKEN_JSON, FACTORY_JSON, DAO_ADDRESS, RPC } from "../../../constant";
import { BindContract, DaoInfo, DaoIsExist, NetworkControl, WalletConnect } from "@/helpers/UserHelper";
import { init } from "../../helpers/Inıt";
import Image from "next/image";
import dummyPhoto from "../../../public/dummyphoto.svg";
import sabanciLogo from "../../../public/sabancilogo.svg";
export default function Dao() {
  const searchParams = useSearchParams(); //next js component to take information from url

  // Ensure 'address' is treated as a string, even if it's an array
  const address = searchParams.get("address"); //address of the DAO from the URL
  const [initialized, setInitialized] = useState(false); //to check if the page is initialized, i.e. init() function is ran successfully
  const [transactionInProgress, setTransactionInProgress] = useState(false); //this is used inside LockScreen component, to show a component that covers the entire page and a spinner when a transaction is in progress
  type ContractsState = {
    daoContract: any;
    voterTokenContract: any;
    ykTokenContract: any | undefined;
    daoFactoryContract: any;
  };

  const [contracts, setContracts] = useState<ContractsState>({
    daoContract: undefined,
    voterTokenContract: undefined,
    ykTokenContract: undefined,
    daoFactoryContract: undefined,
  }); //contracts that we need in our function calls, we will set them in init() function
  const [walletAddress, setWalletAddress] = useState(undefined); //address of the wallet that is connected to the page, we will try to set it in init() function
  const [daoInfo, setDaoInfo] = useState({
    name: "",
    description: "",
    total_voter_tokens: 0,
    num_children: 0,
    total_yk_tokens: 0,
    total_proposals: 0,
    total_subdaos: 0,
    imageUrl: "",
  }); //this is used to store the information about the DAO, we will set it in init() function, we will show it on the textbox under the DAO image
  const [selectedNavItem, setSelectedNavItem] = useState(10); //this is used to change between the tabs, we will set it when a user clicks on the buttons on the sidebar, in default it is set to 10, which is the view proposals tab
  const [isCorrect, setIsCorrect] = useState(false); //this is used to change between the tabs, we will set it when a user clicks on the buttons on the sidebar, in default it is set to 10, which is the view proposals tab
  const [ykBalance, setYkBalance] = useState(0);
  const [voterBalance, setVoterBalance] = useState(0);

  const [proposalStatuses, setProposalStatuses] = useState({});

  const [isAdmin, setIsAdmin] = useState(false);
  //these are the data of the contracts that, we will use them in init() function
  //we will take the abi of the contracts from these files, and we will take the address of the contracts from the URL
  const [walletError, setWalletError] = useState<React.ReactNode | null>(null);

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
  useEffect(() => {
    if (window.ethereum) {
      WalletConnect()
        .then(setWalletAddress)
        .catch((error) => {
          console.error("Error connecting to MetaMask:", error);
        });
    } else {
      setWalletError(
        <div>
          <p>Please install an Ethereum wallet like MetaMask to interact with the SuGovern DAO.</p>
          <br />
          <p>
            If you are using Safari or any other browser that does not support MetaMask browser extension, please use a
            different browser.
          </p>
          <br />
        </div>
      );
    }
  }, []);

  useEffect(() => {
    const checkIsAdmin = async (address: string): Promise<void> => {
      // YK ayrıcalıklarını kontrol etmek için DAO kontratı kullanılıyor
      if (contracts.daoContract && address) {
        try {
          const hasPriviliges: boolean = await (contracts.daoContract as any).methods.has_yk_priviliges(address).call();
          setIsAdmin(hasPriviliges);
        } catch (error) {
          console.error("Error checking YK privileges:", error);
        }
      }
    };

    if (address) {
      if (!contracts["daoFactoryContract"]) {
        setContracts((prevState) => ({
          ...prevState,
          daoFactoryContract: BindContract(FACTORY_JSON["abi"], DAO_ADDRESS) as any,
        }));
      } else {
        if (!contracts["daoContract"]) {
          DaoIsExist(address).then((res) => {
            if (!res) {
              toast.error("DAO does not exist");
            } else {
              setContracts((prevState) => ({
                ...prevState,
                daoContract: BindContract(DAO_JSON["abi"], address) as any,
              }));
            }
            (contracts["daoFactoryContract"] as any).methods
              .num_children(String(address))
              .call()
              .then((result: any) =>
                setDaoInfo((prevState) => ({
                  ...prevState,
                  num_children: result,
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
          });
        } else {
          if (!initialized) {
            (contracts["daoContract"] as any).methods
              .dao_name()
              .call()
              .then((result: any) =>
                setDaoInfo((prevState) => ({
                  ...prevState,
                  name: result,
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
            (contracts["daoContract"] as any).methods
              .dao_description()
              .call()
              .then((result: any) =>
                setDaoInfo((prevState) => ({
                  ...prevState,
                  description: result,
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
            (contracts["daoContract"] as any).methods
              .imageUrl()
              .call()
              .then((result: any) =>
                setDaoInfo((prevState) => ({
                  ...prevState,
                  imageUrl: result,
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
            (contracts["daoContract"] as any).methods
              .getProposalName()
              .call()
              .then((result: any) =>
                setDaoInfo((prevState) => ({
                  ...prevState,
                  total_proposals: result.length,
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
            (contracts["daoContract"] as any).methods
              .yk_token()
              .call()
              .then((result: any) =>
                setContracts((prevState) => ({
                  ...prevState,
                  ykTokenContract: BindContract(TOKEN_JSON["abi"], result),
                }))
              )
              .catch((err: Error) => toast.error(err.message || err.toString()));

            (contracts["daoContract"] as any).methods
              .voter_token()
              .call()
              .then((result: any) =>
                setContracts((prevState) => ({
                  ...prevState,
                  voterTokenContract: BindContract(TOKEN_JSON["abi"], result),
                }))
              )
              .catch((err: any) => toast.error(err.toString()));
            if (contracts["voterTokenContract"] && contracts["ykTokenContract"] && walletAddress) {
              contracts["ykTokenContract"].methods
                .balanceOf(String(walletAddress))
                .call()
                .then((result: any) => {
                  const balance = parseInt(result) / Math.pow(10, 18);
                  setYkBalance(balance);
                })
                .catch((err: Error) => {
                  const errorMessage = err.message || err.toString();
                  toast.error(errorMessage);
                });

              contracts.voterTokenContract.methods
                .balanceOf(String(walletAddress))
                .call()
                .then((result: any) => {
                  const balance = parseInt(result) / Math.pow(10, 18);
                  setVoterBalance(balance);
                })
                .catch((err: any) => toast.error(err.toString()));
            }
          }
          if (typeof walletAddress === "string") {
            checkIsAdmin(walletAddress);
            initialize();
          }
        }
      }
    }
    async function initialize() {
      if (!initialized) {
        await init();
        setInitialized(true);
      }
    }
    console.log("useeffect count");
  }, [walletAddress, contracts]);

  //address_given is the address of the DAO
  //this function is used to get the name of the DAO
  //before each dao function call, we need to make sure that this page is initialized since we would need to use walletAddress and contracts
  const getDaoName = async (address: string): Promise<string> => {
    if (!initialized) {
      await init();
    }
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    const daoABI = DAO_JSON["abi"];

    try {
      const tempDaoContract = new web3.eth.Contract(daoABI, address);
      const daoName: string = await tempDaoContract.methods.dao_name().call();
      return daoName;
    } catch (err: any) {
      console.error("Error fetching DAO name:", err);
      toast.error("Failed to fetch DAO name: " + err.message);
      return ""; // Ensures a string is returned even on error
    }
  };

  //address_given is the address of the DAO
  //this function is used to get the description of the DAO
  const getDaoDescription = async (address_given: string) => {
    if (!initialized) {
      await init();
    }
    let provider = window.ethereum;
    const web3 = new Web3(provider);
    let daoABI = DAO_JSON["abi"];

    let tempDaoContract = new web3.eth.Contract(daoABI, address_given);

    //get the description of the DAO, set the return value to daoDescription, give out a popup alert if there is an error, and return the value if there is no error
    let daoDescription: string = "";
    try {
      daoDescription = await tempDaoContract.methods.dao_description().call();
    } catch (err: any) {
      toast.error(err.toString());
    }

    return daoDescription;
  };

  //create new proposal, passed into CreateProposal.js tab
  //name is the name of the proposal, description is the description of the proposal, vote is an array of strings (options), power is the voting power of the proposal, type is the type of the proposal (weighted or normal)
  //calling this function requires the user to be a YK, but we handle the error if the user is not a YK
  const createNewProposal = async (name: any, description: any, vote: any, power: any, type: any) => {
    if (!initialized) {
      await init();
    }

    //We can set initial votes even before the proposal is created, but to make it fair we set it to 0
    //But there is an implementation in the contract that allows us to set initial votes something other than 0
    var initial_votes = [];
    for (var i = 0; i < vote.length; i++) {
      initial_votes.push("0");
    }
    vote.forEach((element: string) => {
      element = String(element);
    });

    setTransactionInProgress(true); //set the transactionInProgress to true, activate the screenlock component, so that the user cannot send another transaction while the current transaction is in progress
    await contracts.daoContract.methods
      .createProposal(String(name), String(description), vote, initial_votes, parseInt(power), parseInt(type))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully created a proposal");
      })
      .catch((err: any) => toast.error(err.toString()));
    return 0;
  };

  //delete the DAO, passed into DeleteDAO.js tab
  //calling this function requires the user to be a YK, but we handle the error if the user is not a YK
  const deleteThisDAO = async () => {
    if (!initialized) {
      await init();
    }

    setTransactionInProgress(true); //set the transactionInProgress to true, activate the screenlock component, so that the user cannot send another transaction while the current transaction is in progress
    await contracts.daoContract.methods
      .delete_this_dao()
      .send({ from: walletAddress })
      .then(() => {
        toast.success("Successfully deleted the DAO");
      })
      .catch((err: any) => toast.error(err.toString()));
    return 0;
  };

  //vote on a normal proposal, passed into VoteOnProposals.js tab
  //votes are not multiplied by the amount of voter tokens that user has
  //id is the id of the proposal, vote is an array of strings (options), vote_power is an array of integers (voting power distribution)
  const voteOnNormalProposal = async (id: any, vote: any, vote_power: any) => {
    //to make sure the inputs are in the correct format
    vote.forEach((element: any) => {
      element = String(element);
    });
    vote_power.forEach((element: any) => {
      element = parseInt(element);
    });

    //get the gas limit for the transaction, and send the transaction
    setTransactionInProgress(true); //set transactionInProgress to true, activate the screenlock component, so that the user cannot do anything else while the transaction is in progress
    await contracts.daoContract.methods
      .vote_power(parseInt(id), vote, vote_power)
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully voted on the proposal");
      })
      .catch((err: any) => toast.error(err.toString()));

    return 0;
  };

  //vote on a weighted proposal, passed into VoteOnProposals.js tab
  //votes are multiplied by the amount of voter tokens that user has
  //id is the id of the proposal, vote is an array of strings (options), vote_power is an array of integers (voting power distribution), weight is the amount of voter tokens that user wants to use (at max the amount of tokens that user has)
  const voteOnWeightedProposal = async (id: any, vote: any, vote_power: any, weight: any) => {
    parseInt(weight);

    vote.forEach((element: any) => {
      element = String(element);
    });
    vote_power.forEach((element: any) => {
      element = parseInt(element);
    });
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .vote_power_weighted(parseInt(id), vote, vote_power, weight)
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully voted on the proposal");
      })
      .catch((err: any) => toast.error(err.toString()));

    return 0;
  };

  //get proposal information, passed into ViewProposals.js tab, and the VoteOnProposals.js tab
  //returns an array of objects, where each object is a proposal, and the object has the proposal id as the key, and the proposal name, vote names, vote numbers, and proposal power in an array as the value
  const getAllProposals = async (): Promise<Proposal[]> => {
    let proposalNames: string[];
    try {
      const result = await contracts.daoContract.methods.getProposalName().call();
      proposalNames = result;
    } catch (err: any) {
      console.error(err.toString());
      return []; // Return an empty array on error
    }

    const proposals: (Proposal | null)[] = await Promise.all(
      proposalNames.map(async (name, index) => {
        try {
          const voteNames = await contracts.daoContract.methods.getProposalVoteNames(index).call();
          const voteNumbers = await contracts.daoContract.methods.getProposalVoteNumbers(index).call();
          const proposalPower = parseInt(await contracts.daoContract.methods.getProposalPower(index).call(), 10);
          const proposalType = await contracts.daoContract.methods.getProposalType(index).call();
          const voted = (await contracts.daoContract.methods.votes(String(walletAddress), index).call()) === "true";
          const description = await contracts.daoContract.methods.getProposalDescription().call();
          const status = parseInt(
            await contracts.daoContract.methods
              .proposals(index)
              .call()
              .then((proposal: any) => proposal.status),
            10
          );

          const proposal = {
            title: name,
            description: description[index], // Make sure this indexing is correct
            votingPower: proposalPower,
            choices: voteNames,
            type: proposalType,
            voted,
            status,
            voteNumbers,
          };

          // Log each proposal to console
          console.log(`Fetched proposal ${index}:`, proposal);

          return proposal;
        } catch (err) {
          console.error(`Error fetching proposal ${index}:`, err);
          return null; // Mark faulty data with null
        }
      })
    );

    return proposals.filter((proposal): proposal is Proposal => proposal !== null); // Filter out null values and ensure type is correct
  };

  // Function to accept a proposal
  async function acceptProposal(daoAddress: any, proposalId: any) {
    const contract = BindContract(DAO_JSON.abi, daoAddress);
    return contract.methods.accept_proposal(proposalId).send({ from: walletAddress });
  }

  // Function to reject a proposal
  async function rejectProposal(daoAddress: any, proposalId: any) {
    const contract = BindContract(DAO_JSON.abi, daoAddress);
    return contract.methods.reject_proposal(proposalId).send({ from: walletAddress });
  }

  // Function to set a proposal to pending
  async function pendingProposal(daoAddress: any, proposalId: any) {
    const contract = BindContract(DAO_JSON.abi, daoAddress);
    return contract.methods.pending_proposal(proposalId).send({ from: walletAddress });
  }

  const handleAcceptClick = async (proposalId: any) => {
    setTransactionInProgress(true);
    try {
      await acceptProposal(address, proposalId);
      toast.success("Successfully accepted proposal");

      // You might want to update the state or re-fetch proposals here
    } catch (err: any) {
      toast.error(err.toString());

      return; // Exit the function if there's an error
    }
    setTransactionInProgress(false);
  };

  const handleRejectClick = async (proposalId: any) => {
    setTransactionInProgress(true);
    try {
      await rejectProposal(address, proposalId);
      toast.success("Successfully rejected proposal");
      // You might want to update the state or re-fetch proposals here
    } catch (err: any) {
      toast.error(err.toString());
      return; // Exit the function if there's an error
    }
    setTransactionInProgress(false);
  };

  const handlePendingClick = async (proposalId: any) => {
    setTransactionInProgress(true);
    try {
      await pendingProposal(address, proposalId);
      toast.success("Successfully set proposal to pending");
      // You might want to update the state or re-fetch proposals here
    } catch (err: any) {
      toast.error(err.toString());
      return; // Exit the function if there's an error
    }
    setTransactionInProgress(false);
  };

  //send voter tokens of given amount to another address, passed into SendVoterTokens.js tab
  //tokens are sent from the DAO contract to the given address, (dao to user transfer)
  //YK privilages are required to call send_voter_tokens_to_address_yk_directly() function, but the errors are handled if the user is not a YK
  const sendVoterTokens = async (address: any, amount: any) => {
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .send_voter_tokens_to_address_yk_directly(String(address), parseInt(amount))
      .send({ from: walletAddress })
      .then(() => {
        toast.success("Successfully sent tokens"); // Ensure this is called on success
        console.log("Successfully sent tokens");
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Failed to send tokens: " + err.message); // Ensure error details are shown
      });
  };

  //send YK tokens of given amount to another address, passed into SendYKTokens.js tab
  //tokens are sent from the DAO contract to the given address, (dao to user transfer)
  //YK privilages are required to call send_yk_tokens_to_address_yk_directly() function, but the errors are handled if the user is not a YK
  const sendYKTokens = async (address: any, amount: any) => {
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .send_yk_tokens_to_address_yk_directly(String(address), parseInt(amount))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully sent tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //get voter balance from the voter token contract

  //transfer voter tokens of given amount to another address, passed into TransferTokens.js tab
  //tokens are sent from the wallet address to the given address (peer to peer transfer)
  const transferVoterTokens = async (address: any, amount: any) => {
    //add 18 zeros to the end of the amount to convert it from wei
    let zero = "0";
    setTransactionInProgress(true);
    await contracts.voterTokenContract.methods
      .transfer(String(address), String(amount) + zero.repeat(18))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully transferred tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //transfer YK tokens of given amount to another address, passed into TransferTokens.js tab
  //tokens are sent from the wallet address to the given address (peer to peer transfer)
  const transferYKTokens = async (address: any, amount: any) => {
    if (!initialized) {
      await init();
    }
    //add 18 zeros to the end of the amount to convert it from wei
    let zero = "0";
    setTransactionInProgress(true);
    if (!contracts.ykTokenContract) {
      //await ykTokenAdd();
    }
    await contracts.ykTokenContract.methods
      .transfer(String(address), String(amount) + zero.repeat(18))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully transferred tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //get YK balance from the YK token contract

  //get child DAOs of the current DAO
  const getSubDAOs = async (): Promise<any[]> => {
    if (!initialized) {
      await init();
    }
    //get number of child DAOs
    let numChildren: number | undefined;
    await contracts.daoFactoryContract.methods
      .num_children(String(address))
      .call()
      .then((result: any) => {
        numChildren = result;
      })
      .catch((err: any) => toast.error(err.toString()));

    //iteratively get child DAO addresses
    let subDAOs: any[] = [];
    if (numChildren !== undefined) {
      for (var i = 0; i < numChildren; i++) {
        await contracts.daoFactoryContract.methods
          .parent_child_daos(String(address), i.toString())
          .call()
          .then((result: any) => {
            subDAOs.push(result);
          })
          .catch((err: any) => toast.error(err.toString()));
      }
    }
    return subDAOs;
  };

  //get parent DAO of the current DAO

  const getDaoImage = async (address: any) => {
    if (!initialized) {
      await init();
    }
    const web3 = new Web3(RPC);
    const daoABI = DAO_JSON["abi"];
    let daoContract = new web3.eth.Contract(daoABI, address);

    const retVal = await daoContract.methods
      .imageUrl()
      .call()
      .then((result: any) => {
        return result;
      });

    return await retVal;
  };
  const getParentDAO = async (): Promise<string> => {
    if (!initialized) {
      await init();
    }
    try {
      const parentDAOAddress = await contracts.daoFactoryContract.methods.child_parent(String(address)).call();
      return parentDAOAddress || ""; // Ensure a string is returned even if the call returns null or undefined
    } catch (err: any) {
      console.error("Error fetching parent DAO:", err);
      toast.error("Failed to fetch parent DAO: " + err.message);
      return ""; // Return an empty string or default value on error
    }
  };
  //withdraw YK tokens from the DAO
  //Only used when the DAO mints the user YK tokens, but not directly sending them to the user
  //Example use case: when this user creates a child DAO, the parent DAO mints 1 child DAO YK token, and the user can withdraw it inside the child DAO
  const withdrawYKTokens = async (amount: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .withdraw_yk_tokens(parseInt(amount))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully withdrawn tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //withdraw voter tokens from the DAO
  //Only used when the DAO mints the user voter tokens, but not directly sending them to the user
  const withdrawVoterTokens = async (amount: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .withdraw_voter_tokens(parseInt(amount))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully withdrawn tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //get the number of YK tokens that the user can withdraw from the DAO
  const getYKSharesToBeGiven = async (): Promise<number> => {
    if (!initialized) {
      await init();
    }
    let shares = 0; // Initialize shares with a default value
    await contracts.daoContract.methods
      .yk_shares_to_be_given(String(walletAddress))
      .call()
      .then((result: any) => {
        const parsedShares = parseFloat(result) / Math.pow(10, 18);
        if (!isNaN(parsedShares)) {
          shares = parsedShares; // Update shares only if parsed value is a valid number
        }
      })
      .catch((err: any) => {
        console.error(err); // Log or handle the error as appropriate
        toast.error("Failed to fetch YK shares: " + err.message);
      });
    return shares;
  };

  //get the number of voter tokens that the user can withdraw from the DAO
  const getVoterSharesToBeGiven = async (): Promise<number> => {
    if (!initialized) {
      await init();
    }
    let shares = 0; // Initialize shares with a default value
    await contracts.daoContract.methods
      .voter_shares_to_be_given(String(walletAddress))
      .call()
      .then((result: any) => {
        const parsedShares = parseFloat(result) / Math.pow(10, 18);
        if (!isNaN(parsedShares)) {
          shares = parsedShares; // Update shares only if parsed value is a valid number
        }
      })
      .catch((err: any) => {
        console.error(err); // Log or handle the error as appropriate
        toast.error("Failed to fetch voter shares: " + err.message);
      });
    return shares;
  };

  //create a child DAO, in our smart contract we need to create new voter and YK tokens for the child DAO
  //in order to deploy nw voter token and YK contracts we need to pass in the name and symbol of the tokens
  const createChildDAOFunc = async (
    dao_name: any,
    dao_description: any,
    image: any,
    yk_token_name: any,
    yk_token_symbol: any,
    voter_token_name: any,
    voter_token_symbol: any
  ) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoFactoryContract.methods
      .createChildDAO(
        address,
        String(dao_name),
        String(image),
        String(dao_description),
        String(yk_token_name),
        String(yk_token_symbol),
        String(voter_token_name),
        String(voter_token_symbol)
      )
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully created child DAO");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back YK tokens from all of your delegates to your wallet
  const delegateAllYK = async () => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delagation_multiple_getback_all_yk()
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated all YK tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back voter tokens from all of your delegates to your wallet
  const delegateAllVoter = async () => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delagation_multiple_getback_all_voter()
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated all Voter tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };
  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back YK tokens from a specific delegate to your wallet
  const delegateAllFromAddressYK = async (address_wallet: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delegation_single_getback_all_yk(String(address_wallet))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated all YK tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };
  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back voter tokens from a specific delegate to your wallet
  const delegateAllFromAddressVoter = async (address_wallet: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delegation_single_getback_all_voter(String(address_wallet))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated all Voter tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };
  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back a specific amount of YK tokens from a specific delegate to your wallet
  const delegateSomeFromAddressYK = async (address_wallet: any, amount_token: any) => {
    if (!initialized) {
      await init();
    }
    let zero = "0";
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delegation_single_getback_amount_yk(String(address_wallet), String(amount_token + zero.repeat(18)))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated some YK tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };
  //delegate = transfer back, there is a misnamed function in the smart contract
  //transfer back a specific amount of voter tokens from a specific delegate to your wallet
  const delegateSomeFromAddressVoter = async (address_wallet: any, amount_token: any) => {
    if (!initialized) {
      await init();
    }
    let zero = "0";
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_delegation_single_getback_amount_voter(String(address_wallet), String(amount_token + zero.repeat(18)))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully delegated some Voter tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //dao clawback, clawback YK tokens from all possible YK token holders
  const clawBackYKFromAll = async () => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_clawback_all_yk()
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully clawed back all YK tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //dao clawback, clawback voter tokens from all possible voter token holders
  const clawBackVoterFromAll = async () => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_clawback_all_voter()
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully clawed back all voter tokens");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //dao clawback, clawback YK tokens from a specific YK token holder
  const clawBackYKFromSingleAddress = async (address_wallet: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_clawback_single_yk(String(address_wallet))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully clawed back YK tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //dao clawback, clawback voter tokens from a specific voter token holder
  const clawBackVoterFromSingleAddress = async (address_wallet: any) => {
    if (!initialized) {
      await init();
    }
    setTransactionInProgress(true);
    await contracts.daoContract.methods
      .dao_clawback_single_voter(String(address_wallet))
      .send({
        from: walletAddress,
      })
      .then(() => {
        toast.success("Successfully clawed back voter tokens from address");
      })
      .catch((err: any) => toast.error(err.toString()));
  };

  //return dao page body with respect to the selected nav item state
  //we should add a state that when the dao does not exist, we should not return any of these tabs
  const getHTMLBody = () => {
    return selectedNavItem === 0 ? (
      <CreateChildDAO onCreateChildDAO={createChildDAOFunc}></CreateChildDAO>
    ) : selectedNavItem === 1 ? (
      <SendYKToken onSendTokens={sendYKTokens}></SendYKToken>
    ) : selectedNavItem === 2 ? (
      <ClawBack
        onClawBackYKFromAll={clawBackYKFromAll}
        onClawBackYKFromSingleAddress={clawBackYKFromSingleAddress}
        onClawBackVoterFromAll={clawBackVoterFromAll}
        onClawBackVoterFromSingleAddress={clawBackVoterFromSingleAddress}
      ></ClawBack>
    ) : selectedNavItem === 3 ? (
      <SendVoterToken onSendTokens={sendVoterTokens}></SendVoterToken>
    ) : selectedNavItem === 4 ? (
      <CreateProposal onCreateProposal={createNewProposal}></CreateProposal>
    ) : selectedNavItem === 5 ? (
      <DeleteDAO onDeleteDAO={deleteThisDAO}></DeleteDAO>
    ) : selectedNavItem === 6 ? (
      <CheckMyTokens _ykBalance={ykBalance} _voterBalance={voterBalance}></CheckMyTokens>
    ) : selectedNavItem === 7 ? (
      <WithdrawTokens
        onWithdrawVoterTokens={withdrawVoterTokens}
        onWithdrawYKTokens={withdrawYKTokens}
        onVoterSharesToBeGiven={getVoterSharesToBeGiven}
        onYKSharesToBeGiven={getYKSharesToBeGiven}
      ></WithdrawTokens>
    ) : selectedNavItem === 8 ? (
      <></>
    ) : //   <Delegate
    //     onDelegateAllYK={delegateAllYK}
    //     onDelegateAllTokensFromAddressYK={delegateAllFromAddressYK}
    //     onDelegateSomeTokensFromAddressYK={delegateSomeFromAddressYK}
    //     onDelegateAllVoter={delegateAllVoter}
    //     onDelegateAllTokensFromAddressVoter={delegateAllFromAddressVoter}
    //     onDelegateSomeTokensFromAddressVoter={delegateSomeFromAddressVoter}
    //   ></Delegate>
    selectedNavItem === 9 ? (
      <VoteOnProposals
        voterBalance={voterBalance}
        onVoteOnNormalProposals={voteOnNormalProposal}
        onVoteOnWeightedProposals={voteOnWeightedProposal}
        onGetAllProposals={getAllProposals}
      ></VoteOnProposals>
    ) : selectedNavItem === 10 ? (
      <Proposals
        ykBalance={ykBalance}
        voterBalance={voterBalance}
        onGetAllProposals={getAllProposals}
        onhandleAcceptClick={handleAcceptClick}
        onhandleRejectClick={handleRejectClick}
        onhandlePendingClick={handlePendingClick}
        isAdmin={isAdmin}
      ></Proposals>
    ) : selectedNavItem === 11 ? (
      <ViewSubDAOs
        onGetDAODescription={getDaoDescription}
        onGetDAOName={getDaoName}
        onGetSubDAOs={getSubDAOs}
        onGetParentDAO={getParentDAO}
        onGetDAOImage={getDaoImage}
      ></ViewSubDAOs>
    ) : selectedNavItem === 12 ? (
      <TransferTokens
        onTransferVoterTokens={transferVoterTokens}
        onTransferYKTokens={transferYKTokens}
      ></TransferTokens>
    ) : (
      <></>
    );
  };

  if (walletError) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>{walletError}</p>
        <p>
          You can find needed information in our{" "}
          <a
            href="https://sugovern.github.io/sugovern-user-docs/what-is-sugovern/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            User Docs
          </a>
        </p>
      </div>
    );
  }

  if (!walletAddress) {
    return (
      <div>
        <p>Please connect your wallet to interact with the DAO.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#16141D]">
      <div className="relative w-full h-[200px] bg-black bg-transparent">
        <Image
          src={dummyPhoto}
          alt="Sabanci University"
          layout="fill"
          objectFit="cover"
          className="w-full object-cover bg-opacity-25"
        />
        <div className="absolute top-0 left-1/4 right-0 bottom-0 flex justify-between items-center px-16">
          <div className="flex items-center gap-8">
            <Image src={sabanciLogo} alt="Sabanci University Logo" width={350} height={150} objectFit="contain" />
            <div className="text-white text-center w-[300px]">
              <h1 className="text-4xl font-bold">{daoInfo.name}</h1>
              <p className="text-xl text-[#D7D7D7]">{daoInfo.description}</p>
            </div>
          </div>
          {/* <div className="flex flex-col items-center text-white text-2xl gap-3">
            <h2>SubDAOs</h2>
            <div className="flex gap-4">
              <div className="flex flex-col items-center text-sm">
                <div className="border border-gray-300 bg-[#004288] rounded-full w-10 h-10"></div>
                <p>FENS</p>
              </div>
              <div className="flex flex-col items-center text-sm">
                <div className="border border-gray-300 bg-[#004288] rounded-full w-10 h-10"></div>
                <p>FASS</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="fixed top-0 left-32 h-screen w-64 bg-[#281C2C] bg-opacity-80 p-4 z-50">
        <Sidebar
          setSelectedNavItem={setSelectedNavItem}
          selectedNavItem={selectedNavItem}
          status="admin"
          ykBalance={ykBalance}
          voterBalance={voterBalance}
          walletAddress={walletAddress}
          isAdmin={isAdmin}
        />
      </div>
      <div className="ml-[400px] mt-[50px] p-4 flex-grow">{getHTMLBody()}</div>
    </div>
  );
}
