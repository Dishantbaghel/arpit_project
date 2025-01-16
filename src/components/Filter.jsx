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

  const uniqueKeys = Array.from(
    new Set(leftFilterData.flatMap((item) => Object.keys(item)))
  );

  const uniqueValues = (key) => {
    const values = leftFilterData.map((item) => item[key]);
    return Array.from(new Set(values)); // Remove duplicate values for the given key
  };

  const filteredData = leftFilterData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return (
    <div
      className="rounded-md flex bg-white relative shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
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
            className="z-10 absolute w-48 bg-white border-gray-300 shadow-2xl rounded-lg p-2 border-2"
            style={{ top: `${activeIndex * 40}px`, left: "100%" }}
            onMouseEnter={() => setActiveIndex(activeIndex)} // Keep modal open on hover
            onMouseLeave={handleMouseLeave} // Close modal when mouse leaves modal area
          >
            <div className="border-b-2 border-black flex justify-center items-center gap-2 ">
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
            <label className="flex items-center gap-2 my-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={checkboxes.selectAll}
                onChange={handleSelectAllChange}
              />
              <span>Select All</span>
            </label>

            {/* Render Unique Values for the Active Key */}
            <div className="flex flex-col gap-1">
              {uniqueValues(uniqueKeys[activeIndex])
                .filter((value) => {
                  const valueString = String(value); // Convert value to a string
                  return valueString
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map((value, i) => (
                  <div key={i}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={checkboxes.items[i] || false}
                        onChange={() => handleCheckboxChange(i, activeIndex)}
                      />
                      <span>{value}</span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
