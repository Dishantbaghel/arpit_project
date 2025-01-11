import React, { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";

const filterData = [
  { title: "Product Name", apiName: "productName" },
  { title: "CAS Numbers", apiName: "product_name" },
  { title: "Product Description", apiName: "productDescription" },
  { title: "Region", apiName: "product_name" },
  { title: "Country", apiName: "product_name" },
  { title: "Indian Port", apiName: "indianPort" },
  { title: "Indian Company", apiName: "indianCompany" },
  { title: "Foreign Company", apiName: "foreignCompany" },
];

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

const Filter = ({ leftFilterData }) => {
  console.log("filter DATA=============", leftFilterData);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    selectAll: false,
    items: Array(4).fill(false), // Assume there are 4 checkboxes initially
  });

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleSelectAllChange = () => {
    const newState = !checkboxes.selectAll;
    setCheckboxes({
      selectAll: newState,
      items: checkboxes.items.map(() => newState), // Update all checkboxes
    });
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...checkboxes.items];
    updatedItems[index] = !updatedItems[index];

    setCheckboxes({
      selectAll: updatedItems.every((checked) => checked), // Update Select All status
      items: updatedItems,
    });
  };

  return (
    <div
      className="rounded-md flex bg-white relative shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
      {/* Titles Section */}
      {/* <div className="w-full flex flex-col justify-between bg-gray-100 rounded-md">
        {filterData.map((item, index) => (
          <div
            key={index}
            className={`p-2 ${
              index === filterData.length - 1 ? "" : "border-b-2"
            } border-gray-400 cursor-pointer hover:bg-gray-300 ${
              activeIndex === index ? "bg-gray-300" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {item.title}
          </div>
        ))}
      </div> */}
      {/* ======================= */}
      <div className="w-full flex flex-col justify-between bg-gray-100 rounded-md">
        {leftFilterData.length > 0 && (
          <div>
            {Object.keys(leftFilterData[0]).map((key, index) => (
              <div
                key={index}
                className={`p-2 ${
                  index === Object.keys(leftFilterData[0]).length - 1
                    ? ""
                    : "border-b-2"
                } border-gray-400 cursor-pointer hover:bg-gray-300`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {key}
              </div>
            ))}
          </div>
        )}

        {/* Filters Section */}
        {activeIndex !== null && (
          <div
            className="z-10 absolute w-48 bg-white border-gray-300 shadow-2xl rounded-lg p-3 border-2"
            style={{ top: `${activeIndex * 40}px`, left: "100%" }}
            onMouseEnter={() => setActiveIndex(activeIndex)} // Keep modal open on hover
            onMouseLeave={handleMouseLeave} // Close modal when mouse leaves modal area
          >
            <div className="border-b-2 border-black flex justify-center items-center gap-2 p-1">
              <IoIosSearch size={30} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type here"
                className="w-full focus:outline-none focus:ring-0"
              />
              <IoMdClose
                size={30}
                className="cursor-pointer"
                onClick={() => setSearchValue("")}
              />
            </div>

            {/* Select All Checkbox */}
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={checkboxes.selectAll}
                onChange={handleSelectAllChange}
              />
              <span>Select All</span>
            </label>

            {leftFilterData.map((item, i) => (
              <div key={i} className="mb-4">
                <div className="flex flex-col gap-2">
                  {Object.keys(item).map(
                    (key, index) =>
                      // Only show values when the hovered key matches the current key
                      activeIndex === index && (
                        <label key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={checkboxes.items[index] || false} // Ensure checkbox state matches
                            onChange={() => handleCheckboxChange(index, i)} // Handle state changes
                          />
                          <span>{item[key]}</span>{" "}
                          {/* Display the value corresponding to the key */}
                        </label>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
