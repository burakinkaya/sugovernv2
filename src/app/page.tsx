"use client";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import {
  BindContract,
  WalletConnect,
  DaoIsExist,
  fetchNextDaoId,
  fetchAllDaos,
  NetworkControl,
} from "@/helpers/UserHelper";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import Web3 from "web3";
import { init } from "../../src/helpers/Inıt";
import { Contract } from "web3-eth-contract";

import {
  DAO_ADDRESS,
  DAO_JSON,
  FACTORY_JSON,
  CHAIN_ID,
  //TOKEN_ADDRESS,
  TOP_DAO,
  SUB_DAOS,
  LINE_COUNT,
} from "../../constant";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Dao {
  daoAddress: string;
  daoName: string;
  daoDescription: string;
  imageUrl: string;
  // ... include other properties that a DAO object would have
}

export default function Home() {
  const [account, setAccount] = useState(null);

  const [daoFactoryContract, setDaoFactoryContract] = useState<Contract<any> | undefined>(undefined);

  //to store the DAOFactory contract instance
  const [daos, setDaos] = useState<Dao[]>([]); // Initialize with an empty array of Dao objects  //to store all the DAOs created by the DAOFactory contract
  const [topDAOAddress, setTopDAOAddress] = useState(""); //to store the address of the top DAO
  const [isCorrect, setIsCorrect] = useState(false); //this is used to change between the tabs, we will set it when a user clicks on the buttons on the sidebar, in default it is set to 10, which is the view proposals tab
  const [isLoaded, setIsLoaded] = useState(false); //to check if the page is loaded, i.e. all the DAOs are fetched from the blockchain

  const [walletError, setWalletError] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (!window.ethereum) {
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
    } else {
      if (!isLoaded) {
        (async () => {
          try {
            const { account, daoFactoryContract, fetchedDaos } = await init();
            setAccount(account);
            setDaoFactoryContract(daoFactoryContract);
            setDaos(fetchedDaos);
          } catch (error) {
            console.error("Initialization error:", error);
            const message = (error as Error).message;
            toast.error(message);
          } finally {
            setIsLoaded(true);
          }
        })();
      }
    }
  }, [isLoaded]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      0: { value: string };
    };
    console.log(target[0].value);
    // setInp(target[0].value); // Uncomment and define setInp function or state
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

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-20 mt-20">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center md:px-10 xl:px-[10%] ">
        {!isLoaded ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap justify-between w-full">
            {daos.map((dao, index) => (
              <Card key={dao.daoAddress} address={dao.daoAddress} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full h-24 bg-[#281C2C] flex justify-center items-center">
        <div className="flex justify-around items-center w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <span className="text-white text-4xl font-bold">16</span>
            <span className="text-white text-lg">Proposals Created</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-4xl font-bold">642</span>
            <span className="text-white text-lg">Voting Made</span>
          </div>
        </div>
      </div>
    </div>
  );
}
