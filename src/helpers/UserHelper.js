import Web3 from "web3";
import { DAO_ADDRESS, DAO_JSON, FACTORY_JSON, params } from "../../constant";

async function NetworkControl() {
  const chainId = 80001;
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Mumbai Testnet",
              chainId: "0x13881",
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: [
                "https://polygon-mumbai.g.alchemy.com/v2/qk87xs0xeViFziM8xyAckMpVat-e_32T",
              ],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        });
      }
    }
  }
}

async function addNetworkToMetamask() {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params[0]],
    });
    console.log("Network added to MetaMask");
  } catch (error) {
    console.error("Error adding network to MetaMask:", error);
  }
}

async function WalletConnect() {
  let account = null;

  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];

      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (chainId !== params[0].chainId) {
        console.log("Adding the required network to MetaMask");
        await addNetworkToMetamask();
      }

      window.ethereum.on("chainChanged", async () => {
        const updatedChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (updatedChainId !== params[0].chainId) {
          console.log("Adding the required network to MetaMask");
          await addNetworkToMetamask();
        }
      });

      window.ethereum.on("accountsChanged", (newAccounts) => {
        account = newAccounts[0];
        console.log("Account changed:", account);
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask not detected. Please install MetaMask extension.");
  }

  return account;
}

async function DaoIsExist(address) {
  const web3 = new Web3(window.ethereum);
  const factoryContract = new web3.eth.Contract(
    FACTORY_JSON["abi"],
    DAO_ADDRESS
  );
  let retVal = false;
  await factoryContract.methods
    .dao_exists(address)
    .call()
    .then((result) => {
      retVal = result;
    })
    .catch((err) => alert(err));
  return retVal;
}

function BindContract(abi, address) {
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
}

async function fetchNextDaoId(contract) {
  let nextDaoId;
  if (contract) {
    await contract.methods
      .next_dao_id()
      .call()
      .then((result) => {
        nextDaoId = result;
      });
  }
  return nextDaoId;
}

async function fetchAllDaos(contract) {
  const web3 = new Web3(window.ethereum);
  let topDaoAddress;

  try {
    topDaoAddress = await contract.methods.top_dao().call();
  } catch (error) {
    console.error("Error fetching top DAO address:", error);
    // Handle the error appropriately
  }

  const numOfDaos = await contract.methods.next_dao_id().call();
  const daoFetchPromises = [];

  for (let i = 0; i < numOfDaos; i++) {
    daoFetchPromises.push(fetchDaoData(contract, i, web3));
  }

  const daos = await Promise.all(daoFetchPromises);
  return daos.filter((dao) => dao); // Filter out null entries (deleted DAOs)
}

async function fetchDaoData(contract, index, web3) {
  try {
    const daoAddress = await contract.methods.all_daos(index).call();
    if (!(await DaoIsExist(daoAddress))) {
      return null; // DAO is deleted, so we return null to filter it out later
    }

    const daoContract = new web3.eth.Contract(DAO_JSON["abi"], daoAddress);
    const [daoName, daoDescription, imageUrl] = await Promise.all([
      daoContract.methods.dao_name().call(),
      daoContract.methods.dao_description().call(),
      daoContract.methods.imageUrl().call(),
    ]);

    return { daoAddress, daoName, daoDescription, imageUrl };
  } catch (error) {
    console.error(`Error fetching data for DAO at index ${index}:`, error);
    return null; // In case of an error, return null to indicate failure
  }
}

async function DaoInfo(contract, address) {
  var retVal = [0, 0, 0, 0, 0]; // Children Num, Name, Description, Proposal Names,img
  contract.methods
    .num_children(String(address))
    .call()
    .then((result) => {
      retVal[0] = result;
    });
  contract.methods
    .dao_name()
    .call()
    .then((result) => {
      retVal[1] = result;
    });
  contract.methods
    .dao_description()
    .call()
    .then((result) => {
      retVal[2] = result;
    });
  contract.methods
    .getProposalName()
    .call()
    .then((result) => {
      retVal[3] = result;
    });
  contract.methods
    .imageUrl()
    .call()
    .then((result) => {
      retVal[4] = result;
    });

  return retVal;
}
export {
  WalletConnect,
  DaoIsExist,
  BindContract,
  fetchNextDaoId,
  fetchAllDaos,
  DaoInfo,
  NetworkControl,
};
