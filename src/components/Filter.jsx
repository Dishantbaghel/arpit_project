import React, { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";

const filterData = [
  { title: "Product Name" },
  { title: "CAS Numbers" },
  { title: "Product Description" },
  { title: "Region" },
  { title: "Country" },
  { title: "Indian Port" },
  { title: "Indian Company" },
  { title: "Foreign Company" },
];

const Filter = () => {
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
      <div className="w-full flex flex-col justify-between bg-gray-100 rounded-md">
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
      </div>

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

          {/* Individual Checkboxes */}
          {checkboxes.items.map((isChecked, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={isChecked}
                onChange={() => handleCheckboxChange(i)}
              />
              <span>Product Name {i + 1}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
