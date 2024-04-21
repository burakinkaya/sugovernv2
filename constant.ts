export const DAO_ADDRESS = "0xC81272b02750Ef06F22908ff50dd2C95Be4BAACF";
export const FACTORY_JSON = require("./blockchain1/build/contracts/DAOFactory.json");
export const DAO_JSON = require("./blockchain1/build/contracts/MyDAO.json");
export const TOKEN_JSON = require("./blockchain1/build/contracts/SUToken.json");
export const LINE_COUNT = 4;
export const RPC = "https://polygon-amoy.g.alchemy.com/v2/sKY-3irlCflk8GD0bZFMjAicdwR8ngNe";
export const TOP_DAO = "0xEf137c67a9f967b8015d893a8590A1c994BabbaE";
export const SUB_DAOS = [];
export const daodeployerWallet = "0x8ca0b191825f09252117932a23331f40b1bde09c";
export const params = [
  {
    chainName: "Amoy Testnet",
    chainId: "0x13882",
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
    rpcUrls: ["https://polygon-amoy.g.alchemy.com/v2/sKY-3irlCflk8GD0bZFMjAicdwR8ngNe"],
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
];
export const CHAIN_ID = 8001;
export const CONSTANT_DICT = {
  DAO_ADDRESS: DAO_ADDRESS,
  FACTORY_JSON: FACTORY_JSON,
  DAO_JSON: DAO_JSON,
  TOKEN_JSON: TOKEN_JSON,
  LINE_COUNT: LINE_COUNT,
  RPC: RPC,
  TOP_DAO: TOP_DAO,
  SUB_DAOS: SUB_DAOS,
  params: params,
  CHAIN_ID: CHAIN_ID,
  daodeployerWallet: daodeployerWallet,
};
