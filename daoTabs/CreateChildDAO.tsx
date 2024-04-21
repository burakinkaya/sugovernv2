import React from "react";
import { useRef } from "react";

interface CreateChildDAOProps {
  onCreateChildDAO: (
    name: string,
    desc: string,
    image: string,
    YKTokenName: string,
    YKTokenSymbol: string,
    voterTokenName: string,
    voterTokenSymbol: string
  ) => void;
}

const CreateChildDAO: React.FC<CreateChildDAOProps> = ({ onCreateChildDAO }) => {
  const daoInfo = useRef({
    name: "",
    image: "",
    desc: "",
    YKTokenName: "",
    YKTokenSymbol: "",
    voterTokenName: "",
    voterTokenSymbol: "",
  });
  return (
    <div className="container mx-auto border border-gray-200 p-4 rounded-lg bg-white shadow-lg mt-5">
      <h3 className="text-2xl text-center font-semibold text-gray-800">Create a subDAO</h3>
      <br />
      <br />
      <form className="mt-8 space-y-6">
        <div className="form-group">
          <label htmlFor="daoName" className="block text-sm font-medium text-gray-700">
            DAO Name
          </label>
          <input
            type="text"
            id="daoName"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter DAO Name"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, name: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="daoDescription" className="block text-sm font-medium text-gray-700">
            DAO Description
          </label>
          <input
            type="text"
            id="daoDescription"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter DAO Description"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, desc: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="daoImage" className="block text-sm font-medium text-gray-700">
            DAO Image
          </label>
          <input
            type="text"
            id="daoImage"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter DAO Image URL"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, image: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="ykToken" className="block text-sm font-medium text-gray-700">
            YK Token
          </label>
          <input
            type="text"
            id="ykToken"
            className="appearance-none rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter YK Token Name"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, YKTokenName: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="ykSymbol" className="block text-sm font-medium text-gray-700">
            YK Token
          </label>
          <input
            type="text"
            id="ykSymbol"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter YK Token Symbol"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, YKTokenSymbol: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="voterToken" className="block text-sm font-medium text-gray-700">
            Voter Token
          </label>
          <input
            type="text"
            id="voterToken"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter Voter Token Name"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, voterTokenName: e.target.value };
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="voterSymbol" className="block text-sm font-medium text-gray-700">
            Voter Symbol
          </label>
          <input
            type="text"
            id="voterSymbol"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter Voter Token Symbol"
            onChange={(e) => {
              daoInfo.current = { ...daoInfo.current, voterTokenSymbol: e.target.value };
            }}
          />
        </div>
        <br />
        <br />
        <button
          type="button"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            onCreateChildDAO(
              daoInfo.current.name,
              daoInfo.current.desc,
              daoInfo.current.image,
              daoInfo.current.YKTokenName,
              daoInfo.current.YKTokenSymbol,
              daoInfo.current.voterTokenName,
              daoInfo.current.voterTokenSymbol
            );
          }}
        >
          Create subDAO
        </button>
      </form>
    </div>
  );
};

export default CreateChildDAO;
