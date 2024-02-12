export const DAO_ADDRESS = "0x32659e469f74e65A7C3fcAea1fcA56042Cedff44";
export const FACTORY_JSON = require("./blockchain1/build/contracts/DAOFactory.json");
export const DAO_JSON = require("./blockchain1/build/contracts/MyDAO.json");
export const TOKEN_JSON = require("./blockchain1/build/contracts/SUToken.json");
export const LINE_COUNT = 4;
export const RPC =
  "https://polygon-mumbai.g.alchemy.com/v2/qk87xs0xeViFziM8xyAckMpVat-e_32T";
export const TOP_DAO = "0x619141AC44a77B126B774a40a966891ca7754937";
export const SUB_DAOS = [];
export const daodeployerWallet = "0x8ca0b191825f09252117932a23331f40b1bde09c";
export const params = [
  {
    chainName: "Mumbai Testnet",
    chainId: "0x13881",
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
    rpcUrls: [
      "https://polygon-mumbai.g.alchemy.com/v2/qk87xs0xeViFziM8xyAckMpVat-e_32T",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
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
