import { WalletConnect } from "./UserHelper";

export const init = async () => {
  try {
    const account = await WalletConnect();
    setAccount(account);

    const web3 = new Web3(window.ethereum);
    const daoFactoryContract = new web3.eth.Contract(
      FACTORY_JSON.abi,
      DAO_ADDRESS
    );

    const fetchedDaos = (await fetchAllDaos(daoFactoryContract)).filter(
      (dao): dao is Dao => dao !== null
    );
    setDaos(fetchedDaos);
  } catch (error) {
    console.error("Initialization error:", error);
    const message = (error as Error).message;
    setAlertMessage({ title: "Error", text: message });
    setPopupTrigger(true);
  } finally {
    setIsLoaded(true);
  }
};
