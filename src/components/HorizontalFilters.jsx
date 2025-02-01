"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";

const apiResponse = [
  {
    HS_Code: 29242990,
    currency: "USD",
    dateOfShipment: "2022-06-20 00:00:00",
    foreignCompany: "To,",
    foreignCountry: "China",
    indianCompany: "Bdr Pharmaceuticals International Private Limited",
    indianPort: "Sahar Air Cargo Air",
    productDescription: "DB-624 (30m0.53mm, 3.0m) Sorafenib C",
    quantity: "1.00",
    quantityUnits: "Nos",
    unitPrice: "1000.00000",
  },
  {
    HS_Code: 29242990,
    currency: "USD",
    dateOfShipment: "2022-06-20 00:00:00",
    foreignCompany: "To,",
    foreignCountry: "China",
    indianCompany: "Bdr Pharmaceuticals International Private Limited",
    indianPort: "Sahar Air Cargo Air",
    productDescription: "DB-624 (30m0.53mm, 3.0m) Sorafenib C",
    quantity: "1.00",
    quantityUnits: "Nos",
    unitPrice: "1000.00000",
  },
];

const HorizontalFilters = ({ leftFilterData }) => {
  console.log("LEFT FILTER===============", leftFilterData);
  const items = Array(10).fill("Item");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full bg-blue-900 text-white">
      <div className="flex items-center relative">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-full text-xl min-w-40 p-2 text-center cursor-pointer">
                {item} {index + 1}
              </div>
              <div
                className={`p-4 absolute bg-white text-red-500 shadow-xl z-20 min-w-40 transition-all duration-300 ease-in-out transform ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  top: "100%",
                }}
              >
                {items.map((value, i) => (
                  <div key={i}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        // checked={checkboxes.items[i] || false}
                        // onChange={() => handleCheckboxChange(i, activeIndex)}
                      />
                      <span>hiiiii</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {index < items.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: "white",
                  width: "2px",
                  margin: "7px 0",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HorizontalFilters;
