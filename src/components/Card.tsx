import { DAO_JSON, RPC } from "../../constant";
import Web3 from "web3";
import { useEffect, useState } from "react";

import dummyPhoto from "../../public/dummyphoto.svg";
import Image from "next/image";

function Card({ address, key }: { address: string; key?: string }) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const web3 = new Web3(RPC);
  const daoContract = new web3.eth.Contract(DAO_JSON["abi"], address);

  const getName = async () => {
    const result = (await daoContract.methods.dao_name().call()) as string;
    setTitle(result ?? "");
  };
  const getDescription = async () => {
    const result = (await daoContract.methods
      .dao_description()
      .call()) as string;
    setText(result ?? ""); // Assuming that result is of type string | undefined | null
  };

  const getImageUrl = async () => {
    const result = (await daoContract.methods.imageUrl().call()) as string;
    setImageUrl(result ?? ""); // Assuming that result is of type string | undefined | null
  };
  useEffect(() => {
    getName();
    getDescription();
    getImageUrl();
  }, []);
  return (
    <div className="flex justify-center gap-4">
      <a href={`dao?address=${address}`}>
        <div className="w-60 h-80 bg-[#281C2C] rounded-lg shadow overflow-hidden">
          <Image
            src={dummyPhoto}
            alt=""
            className="w-full h-1/3 object-cover"
          />
          <div className="text-white p-4 gap-4">
            <h3 className="card-title text-lg font-bold ">{title}</h3>
            <p className="card-desc text-sm">{text}</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="border border-gray-300 bg-[#004288] rounded-full inline-block w-20 h-20 overflow-hidden"></div>
            <div className="border border-gray-300 bg-[#004288] rounded-full inline-block w-20 h-20 overflow-hidden"></div>
          </div>
        </div>
      </a>
    </div>
  );
}
export default Card;
