import Image from "next/image";

const DataCard = ({ totalData }) => {
  const {
    totalQuantity,
    totalValue,
    totalIndianCompanies,
    totalForeignCompanies,
    shipmentCount,
  } = totalData || {};

  const avgPrice =
    totalQuantity > 0 ? (totalValue / totalQuantity).toFixed(2) : "0";

  const staticData = [
    {
      title: "Volume",
      value: 343.5,
      imgs: "/volume.png",
      value: totalQuantity.toFixed(2) || "0",
    },
    {
      title: "Value",
      value: 443,
      imgs: "/currency.png",
      value: totalValue.toFixed(2) || "0",
    },
    {
      title: "Avg Price",
      value: 54324,
      imgs: "/average.png",
      value: avgPrice,
    },
    {
      title: "Shipment Count",
      value: 75667,
      imgs: "/folder.png",
      value: shipmentCount || "0",
    },
    {
      title: "Indian Companies",
      value: 75667,
      imgs: "/folder.png",
      value: totalIndianCompanies || "",
    },
    {
      title: "Foreign Companies",
      value: 75667,
      imgs: "/folder.png",
      value: totalForeignCompanies || "",
    },
  ];

  return (
    <div className="flex gap-5">
      {staticData.map((item, i) => (
        <div key={i} className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="p-2">
            <h3 className="card-title text-sm">{item.title}:</h3>
            <div className="flex justify-between text-center">
              <h3 className="text-[#008000] text-md font-bold">{item.value}</h3>
              <div>
                <Image
                  src={item.imgs}
                  alt={item.title}
                  title={item.title}
                  width={20}
                  height={5}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
