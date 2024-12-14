import React from "react";

const DataCard = () => {
  return (
    <div className="flex gap-3 ">
      <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
        <div className="card-body p-2">
          <h6 className="card-title text-xs">Volume:</h6>
          <p className="text-[#008000]">129</p>
        </div>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
        <div className="card-body p-2">
          <h6 className="card-title text-xs">Value:</h6>
          <p className="text-[#008000]">129</p>
        </div>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
        <div className="card-body p-2">
          <h6 className="card-title text-xs">Avg Price:</h6>
          <p className="text-[#008000]">129</p>
        </div>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
        <div className="card-body p-2">
          <h6 className="card-title text-xs">Data Records:</h6>
          <p className="text-[#008000]">129</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
