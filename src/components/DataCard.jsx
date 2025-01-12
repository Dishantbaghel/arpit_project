import Image from "next/image";
import React from "react";

const staticData = [
  { title: "Volume", value: "343.5", imgs: "/volume.png" },
  { title: "Value", value: "443", imgs: "/currency.png" },
  { title: "Avg Price", value: "54324", imgs: "/average.png" },
  { title: "Data Records", value: "75667", imgs: "/folder.png" },
];

const DataCard = () => {
  return (
    <div className="flex gap-5 ">
      {staticData.map((item, i) => (
        <div key={i} className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="p-3 flex justify-between">
            <div>
              <h3 className="card-title">{item.title}:</h3>
              <h3 className="text-[#008000] text-3xl font-bold">
                {item.value}
              </h3>
            </div>
            <Image src={item.imgs} alt="volume" title="volume" width={60} height={60} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
