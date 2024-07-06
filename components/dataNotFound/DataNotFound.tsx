import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./DataNotFound.scss";

const DataNotFound: React.FC = () => {
  return (
    <div className="no-data-container">
      <AiOutlineExclamationCircle size={50} className="no-data-icon" />
      <p className="no-data-text">no data recorded</p>
    </div>
  );
};

export default DataNotFound;
