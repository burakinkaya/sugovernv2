import React from "react";

interface DeleteDAOProps {
  onDeleteDAO: () => void;
}

const DeleteDAO: React.FC<DeleteDAOProps> = ({ onDeleteDAO }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <br />
      <br />
      <div className="flex justify-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => onDeleteDAO()}
        >
          Delete DAO
        </button>
      </div>
    </div>
  );
};

export default DeleteDAO;
