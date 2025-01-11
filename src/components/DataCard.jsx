import Image from "next/image";
import React from "react";

const staticData = [
  { title: "Volume", value: "343.5", img: "/volume.png" },
  { title: "Value", value: "443", img: "/currency.png" },
  { title: "Avg Price", value: "54324", img: "/average.png" },
  { title: "Data Records", value: "75667", img: "/folder.png" },
];

const DataCard = () => {
  return (
    <div className="flex gap-5 ">
      {/* <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
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
      </div> */}

      {/* {staticData.map((item, i) => (
        <div className="bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="p-4 flex text-center items-center gap-2">
            <h6 className="text-lg font-semibold">{item.title}:</h6>
            <div>
              <div className="text-[#008000] text-lg border-2 border-black p-2 rounded-[50%]">
                {item.value}
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {staticData.map((item, i) => (
        <div key={i} className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="p-3 flex justify-between">
            <div>
              <h3 className="card-title">{item.title}:</h3>
              <h3 className="text-[#008000] text-3xl font-bold">
                {item.value}
              </h3>
            </div>
            <Image src={item.img} alt="volume" title="volume" width={60} height={60} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
