import Web3 from "web3";
import { DAO_ADDRESS, FACTORY_JSON } from "../../constant";
import { WalletConnect, fetchAllDaos } from "./UserHelper"; // Adjust the import paths based on your project structure

interface Dao {
  daoAddress: string;
  daoName: string;
  daoDescription: string;
  imageUrl: string;
  // ... include other properties that a DAO object would have
}
export async function init() {
  try {
    const account = await WalletConnect();

    const web3 = new Web3(window.ethereum);
    const daoFactoryContract = new web3.eth.Contract(
      FACTORY_JSON.abi,
      DAO_ADDRESS
    );

    // Fetching DAOs and any other initialization logic can be moved here if needed
    const fetchedDaos: Dao[] = (await fetchAllDaos(daoFactoryContract)).filter(
      (dao): dao is Dao => dao !== null
    );

    return { account, daoFactoryContract, fetchedDaos };
  } catch (error) {
    throw error; // You can handle the error here or throw it to be handled by the calling function
  }
}
