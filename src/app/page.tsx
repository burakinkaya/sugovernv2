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
import Popup from "@/components/Popup";
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
  const [alertMessage, setAlertMessage] = useState({ text: "", title: "" }); //this is used inside Popup component, to pass a message to the inside of the popup when an error occurs, or a transaction is successful, or in a case of warning
  const [popupTrigger, setPopupTrigger] = useState(false); //this is used inside Popup component, to trigger the popup to show up

  const [daoFactoryContract, setDaoFactoryContract] = useState<
    Contract<any> | undefined
  >(undefined);

  //to store the DAOFactory contract instance
  const [daos, setDaos] = useState<Dao[]>([]); // Initialize with an empty array of Dao objects  //to store all the DAOs created by the DAOFactory contract
  const [topDAOAddress, setTopDAOAddress] = useState(""); //to store the address of the top DAO
  const [isCorrect, setIsCorrect] = useState(false); //this is used to change between the tabs, we will set it when a user clicks on the buttons on the sidebar, in default it is set to 10, which is the view proposals tab
  const [isLoaded, setIsLoaded] = useState(false); //to check if the page is loaded, i.e. all the DAOs are fetched from the blockchain

  useEffect(() => {
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
          setAlertMessage({ title: "Error", text: message });
          setPopupTrigger(true);
        } finally {
          setIsLoaded(true);
        }
      })();
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

      <Popup trigger={popupTrigger} setTrigger={setPopupTrigger}>
        <h2 className="text-black">{alertMessage.title}</h2>
        <p>{alertMessage.text}</p>
      </Popup>
    </div>
  );
}
