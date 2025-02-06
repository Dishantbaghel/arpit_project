import Image from "next/image";
import React, { useState, useEffect } from "react";

const staticData = [
  { title: "Volume", value: 343.5, imgs: "/volume.png" },
  { title: "Value", value: 443, imgs: "/currency.png" },
  { title: "Avg Price", value: 54324, imgs: "/average.png" },
  { title: "Shipment Count", value: 75667, imgs: "/folder.png" },
  { title: "Indian Companies", value: 75667, imgs: "/folder.png" },
  { title: "Foreign Companies", value: 75667, imgs: "/folder.png" },
];

const DataCard = () => {
  const [animatedValues, setAnimatedValues] = useState(
    staticData.map(() => 0) // Initialize values to 0
  );

  useEffect(() => {
    const intervalIds = staticData.map((item, index) => {
      const step = item.value / 100; // Divide the final value into 100 steps
      let current = 0;

      const interval = setInterval(() => {
        current += step;
        if (current >= item.value) {
          current = item.value; // Ensure the number stops at the final value
          clearInterval(interval);
        }

        setAnimatedValues((prevValues) => {
          const updatedValues = [...prevValues];
          updatedValues[index] = Math.round(current * 10) / 10; // Round to 1 decimal place if needed
          return updatedValues;
        });
      }, 20); // Adjust speed as necessary

      return interval;
    });

    return () => {
      // Clear all intervals when the component unmounts
      intervalIds.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="flex gap-5">
      {staticData.map((item, i) => (
        <div key={i} className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="p-2">
            <h3 className="card-title text-sm">{item.title}:</h3>
            <div className="flex justify-between text-center">
              <h3 className="text-[#008000] text-md font-bold">
                {animatedValues[i]}
              </h3>
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
