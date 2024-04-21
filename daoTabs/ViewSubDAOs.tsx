import React, { useEffect, useState } from "react";
import Spinner from "../src/components/Spinner";
import Image from "next/image";

interface DAOInfo {
  address: string;
  name: string;
  description: string;
  image: string;
}

interface ViewSubDAOsProps {
  onGetSubDAOs: () => Promise<string[]>;
  onGetParentDAO: () => Promise<string>;
  onGetDAODescription: (address: string) => Promise<string>;
  onGetDAOName: (address: string) => Promise<string>;
  onGetDAOImage: (address: string) => Promise<string>;
}

const ViewSubDAOs: React.FC<ViewSubDAOsProps> = ({
  onGetSubDAOs,
  onGetParentDAO,
  onGetDAODescription,
  onGetDAOName,
  onGetDAOImage,
}) => {
  const [subDAOs, setSubDAOs] = useState<DAOInfo[]>([]);
  const [parentDAO, setParentDAO] = useState<DAOInfo | null>(null);
  const [loadedParent, setLoadedParent] = useState(false);
  const [loadedSubs, setLoadedSubs] = useState(false);

  useEffect(() => {
    const fetchSubDAOs = async () => {
      const subDAOAddresses = await onGetSubDAOs();
      if (subDAOAddresses.length === 0) {
        setLoadedSubs(true);
      } else {
        const daos = await Promise.all(
          subDAOAddresses.map(async (address) => ({
            address,
            name: await onGetDAOName(address),
            description: await onGetDAODescription(address),
            image: await onGetDAOImage(address),
          }))
        );
        setSubDAOs(daos);
        setLoadedSubs(true);
      }
    };

    const fetchParentDAO = async () => {
      const parentDAOAddress = await onGetParentDAO();
      if (parentDAOAddress === "0x0000000000000000000000000000000000000000") {
        setParentDAO(null);
      } else {
        const daoInfo = {
          address: parentDAOAddress,
          name: await onGetDAOName(parentDAOAddress),
          description: await onGetDAODescription(parentDAOAddress),
          image: await onGetDAOImage(parentDAOAddress),
        };
        setParentDAO(daoInfo);
      }
      setLoadedParent(true);
    };

    fetchSubDAOs();
    fetchParentDAO();
  }, []);

  return !loadedParent || !loadedSubs ? (
    <Spinner />
  ) : (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Parent DAO</h2>
      {parentDAO ? (
        <div className="flex">
          <a className="w-64 bg-white shadow rounded-lg border items-center" href={`/dao?address=${parentDAO.address}`}>
            <img className="w-full h-32 object-fill rounded-t-lg" src={parentDAO.image} alt="Parent DAO" />
            <div className="p-4">
              <h5 className="text-lg font-bold">{parentDAO.name}</h5>
              <p className="text-sm">{parentDAO.description}</p>
            </div>
          </a>
        </div>
      ) : (
        <div className="w-full text-center p-4">
          <label className="text-gray-500">There is no parent DAO</label>
        </div>
      )}
      <hr className="border-t border-white my-8" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">subDAOs</h2>
      {subDAOs.length > 0 ? (
        <div className="flex flex-row gap-4">
          {subDAOs.map((dao, index) => (
            <a
              key={index}
              href={`/dao?address=${dao.address}`}
              className="w-64 bg-white shadow rounded-lg border items-center"
            >
              <img className="w-full h-32 object-fill rounded-t-lg" src={dao.image} alt={dao.name} />
              <div className="p-4">
                <h5 className="text-lg font-bold">{dao.name}</h5>
                <p className="text-sm">{dao.description}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <label className="text-gray-500">There is no sub DAO</label>
        </div>
      )}
    </div>
  );
};

export default ViewSubDAOs;
