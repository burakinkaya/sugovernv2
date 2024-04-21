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
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onDeleteDAO()}
        >
          Delete DAO
        </button>
      </div>
    </div>
  );
};

export default DeleteDAO;
