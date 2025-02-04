"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Chip } from "@mui/material";

const TestFilter2 = ({ leftFilterData, graphFilterHandler, recordData }) => {
  console.log("LEFT FILTER==========", leftFilterData);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    const keys = Array.from(
      new Set(leftFilterData?.flatMap((item) => Object.keys(item)))
    );

    const initialCheckboxes = {};
    keys.forEach((key) => {
      const values = uniqueValues(key);
      initialCheckboxes[key] = {
        items: values.map((value) => ({ value, checked: true })),
      };
    });

    console.log("initialCheckboxes======", initialCheckboxes);

    setCheckboxes(initialCheckboxes);
  }, [leftFilterData]);

  const handleCheckboxChange = (key, index) => {
    setCheckboxes((prev) => {
      // Clone the previous state deeply
      const updatedItems = prev[key]?.items.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      );

      return {
        ...prev,
        [key]: {
          items: updatedItems,
        },
      };
    });
  };

  const handleSelectAllChange = (key) => {
    const allSelected = !checkboxes[key]?.selectAll;
    const items = uniqueValues(key).map((value) => ({
      value,
      checked: allSelected,
    })); // Set all items' checked to match selectAll

    setCheckboxes((prev) => ({
      ...prev,
      [key]: {
        selectAll: allSelected,
        items,
      },
    }));
  };

  const uniqueKeys = Array.from(
    new Set(
      leftFilterData
        .flatMap((item) => Object.keys(item))
        .filter((key) => key !== "dateOfShipment") // Exclude "dateofshipment"
    )
  );

  const uniqueValues = (key) => {
    if (key === "dateOfShipment") return []; // Ensure no values for "dateofshipment"
    const values = leftFilterData.map((item) => item[key]);
    return Array.from(new Set(values)); // Remove duplicate values for the given key
  };

  const formatKey = (key) => {
    // Replace underscores with spaces, capitalize the first letter of each word
    return key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/([A-Z])/g, " $1") // Add spaces before uppercase letters in camelCase
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize each word
      .trim(); // Remove extra spaces
  };

  // ===========================================================

  const aggregate = (arr, query) => {
    console.log("INSIDE AGGREGATE===========", arr, query, uncheckedItems);
    // if (query) {
    //   arr = arr.filter((item) => !query?.value.includes(item[query.key]));
    // }
    uncheckedItems.push({
      key: query.key,
      value: query.value[0],
    });

    const filteredList = arr.filter(
      (item) =>
        !uncheckedItems.some((unchecked) => {
          let keyName = unchecked.key;
          return item[keyName] === unchecked.value;
        })
    );

    console.log(filteredList);
    // console.log("list:::::::::::::::", filteredList, uncheckedItems);
    console.log("list:::::::::arrarr::::::", filteredList, recordData);
    return testingFun(filteredList);
  };

  const testingFun = (arr) => {
    let result = {
      topBuyerByQuantity: {},
      topSupplierByQuantity: {},
      topIndianPortByQuantity: {},
      topCountryByQuantity: {},
      topBuyerByValue: {},
      topSupplierByValue: {},
      topIndianPortByValue: {},
      topCountryByValue: {},
      totalQuantity: 0,
      totalValue: 0,
    };

    arr.forEach((item) => {
      // Aggregate buyers by quantity and value
      if (result.topBuyerByQuantity[item.indianCompany]) {
        result.topBuyerByQuantity[item.indianCompany] += parseFloat(
          item.quantity
        );
        result.topBuyerByValue[item.indianCompany] +=
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      } else {
        result.topBuyerByQuantity[item.indianCompany] = parseFloat(
          item.quantity
        );
        result.topBuyerByValue[item.indianCompany] =
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      }

      // Aggregate suppliers by quantity and value
      if (result.topSupplierByQuantity[item.foreignCompany]) {
        result.topSupplierByQuantity[item.foreignCompany] += parseFloat(
          item.quantity
        );
        result.topSupplierByValue[item.foreignCompany] +=
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      } else {
        result.topSupplierByQuantity[item.foreignCompany] = parseFloat(
          item.quantity
        );
        result.topSupplierByValue[item.foreignCompany] =
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      }

      // Aggregate Indian ports by quantity and value
      if (result.topIndianPortByQuantity[item.indianPort]) {
        result.topIndianPortByQuantity[item.indianPort] += parseFloat(
          item.quantity
        );
        result.topIndianPortByValue[item.indianPort] +=
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      } else {
        result.topIndianPortByQuantity[item.indianPort] = parseFloat(
          item.quantity
        );
        result.topIndianPortByValue[item.indianPort] =
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      }

      // Aggregate countries by quantity and value
      if (result.topCountryByQuantity[item.foreignCountry]) {
        result.topCountryByQuantity[item.foreignCountry] += parseFloat(
          item.quantity
        );
        result.topCountryByValue[item.foreignCountry] +=
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      } else {
        result.topCountryByQuantity[item.foreignCountry] = parseFloat(
          item.quantity
        );
        result.topCountryByValue[item.foreignCountry] =
          parseFloat(item.quantity) * parseFloat(item.unitPrice);
      }

      // Update total quantity and value
      result.totalQuantity += parseFloat(item.quantity);
      result.totalValue +=
        parseFloat(item.quantity) * parseFloat(item.unitPrice);
    });

    // Convert the aggregated data into the API response format
    const transformToAPIFormat = (data, key) => {
      const formattedData = Object.keys(data)
        .map((label) => ({
          label,
          value: data[label],
        }))
        .sort((a, b) => b.value - a.value); // Sort by value in descending order

      return {
        key,
        data: formattedData,
        label: key.replace(/([A-Z])/g, " $1").trim(), // Format the key for display
      };
    };

    const apiResponse = [
      transformToAPIFormat(result.topBuyerByQuantity, "topBuyerByQuantity"),
      transformToAPIFormat(
        result.topSupplierByQuantity,
        "topSupplierByQuantity"
      ),
      transformToAPIFormat(
        result.topIndianPortByQuantity,
        "topIndianPortByQuantity"
      ),
      transformToAPIFormat(result.topCountryByQuantity, "topCountryByQuantity"),
      transformToAPIFormat(result.topBuyerByValue, "topBuyerByValue"),
      transformToAPIFormat(result.topSupplierByValue, "topSupplierByValue"),
      transformToAPIFormat(result.topIndianPortByValue, "topIndianPortByValue"),
      transformToAPIFormat(result.topCountryByValue, "topCountryByValue"),
    ];

    // Assuming graphFilterHandler is a function that handles the API response
    graphFilterHandler(apiResponse);
    return apiResponse;
  };

  const handleDelete = (key, value) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: {
        items: prev[key].items.map((item) =>
          item.value === value ? { ...item, checked: true } : item
        ),
      },
    }));

    const list = uncheckedItems.filter((item) => item.value != value);
    const filteredList = recordData.data.filter(
      (item) =>
        !list.some((unchecked) => {
          let keyName = unchecked.key;
          return item[keyName] === unchecked.value;
        })
    );
    console.log("delete unchecked::::::::::", filteredList, list);
    return testingFun(filteredList);
  };

  console.log("checkboxes==========", checkboxes);

  const uncheckedItems = Object.entries(checkboxes).flatMap(([key, data]) =>
    data.items.filter((item) => !item.checked).map((item) => ({ key, ...item }))
  );

  const dummyData = [
    {
      name: "HS_Code",
      items: [
        { value: 29152100, checked: true },
        { value: 29189990, checked: false },
        { value: 29339990, checked: true },
        { value: 29224990, checked: false },
        { value: 29212100, checked: true },
        { value: 29242990, checked: true },
        { value: 29269000, checked: false },
        { value: 29163990, checked: true },
        { value: 29333919, checked: true },
        { value: 29332990, checked: false },
        { value: 29309099, checked: true },
      ],
    },
    {
      name: "CAS_Number",
      items: [
        { value: "546-67-8", checked: true },
        { value: "110-82-7", checked: false },
        { value: "67-64-1", checked: true },
        { value: "50-00-0", checked: true },
        { value: "75-09-2", checked: false },
        { value: "107-21-1", checked: true },
        { value: "7782-42-5", checked: true },
        { value: "1333-86-4", checked: false },
      ],
    },
    {
      name: "Product_Code",
      items: [
        { value: "P-001", checked: true },
        { value: "P-002", checked: false },
        { value: "P-003", checked: true },
        { value: "P-004", checked: false },
        { value: "P-005", checked: true },
        { value: "P-006", checked: true },
        { value: "P-007", checked: false },
        { value: "P-008", checked: true },
        { value: "P-009", checked: false },
        { value: "P-010", checked: true },
      ],
    },
    {
      name: "Batch_Number",
      items: [
        { value: "BATCH-001", checked: true },
        { value: "BATCH-002", checked: true },
        { value: "BATCH-003", checked: false },
        { value: "BATCH-004", checked: true },
        { value: "BATCH-005", checked: true },
        { value: "BATCH-006", checked: false },
        { value: "BATCH-007", checked: true },
        { value: "BATCH-008", checked: false },
      ],
    },
  ];

  return (
    <div
      className="w-full rounded-md flex bg-white relative shadow-xl"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="w-full flex flex-col justify-between rounded-md">
        <div className="p-3 border-b-2">
          <h4 className="font-semibold text-xl">Filters</h4>
          <div className="flex flex-wrap gap-2">
            {uncheckedItems.map((item, index) => (
              <Chip
                key={index}
                size="small"
                label={item.value}
                onDelete={() => handleDelete(item.key, item.value)}
              />
            ))}
          </div>
        </div>

        {leftFilterData.length > 0 && (
          <>
            {/* <div>
            {Object.keys(leftFilterData[0])
              .filter((key) => key !== "dateOfShipment" && key !== "checked")
              .map((key, index) => (
                <div key={key} className="relative">
                  <div
                    className={`p-3 flex justify-between items-center cursor-pointer hover:bg-gray-300 ${
                      index === Object.keys(leftFilterData[0]).length - 2
                        ? ""
                        : "border-b-2"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {formatKey(key)}
                  </div>
                  {activeIndex === index && (
                    <div
                      className="z-10 absolute w-56 bg-white border-gray-300 rounded-lg p-2 border-2"
                      style={{ top: `${-5}px`, left: "100%" }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <div className="border-b-2 border-black flex justify-center items-center gap-2">
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
                      <label className="flex items-center gap-2 my-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={
                            checkboxes[uniqueKeys[index]]?.selectAll || false
                          }
                          onChange={() =>
                            handleSelectAllChange(uniqueKeys[index])
                          }
                        />
                        <span>Select All</span>
                      </label>
                      <div className="flex flex-col gap-1">
                        {uniqueValues(uniqueKeys[index])
                          .filter((value) =>
                            String(value)
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                          )
                          .map((value, i) => (
                            <div key={i}>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-sm"
                                  checked={
                                    checkboxes[uniqueKeys[index]]?.items?.[i]
                                      ?.checked ?? true
                                  }
                                  onChange={() => {
                                    handleCheckboxChange(uniqueKeys[index], i);
                                    aggregate(leftFilterData, {
                                      key: uniqueKeys[index],
                                      value: [value],
                                    });
                                  }}
                                />
                                <span>{value}</span>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div> */}
            <div>
              {dummyData.map((key, index) => (
                <div key={key} className="relative">
                  <div
                    className={`p-3 flex justify-between items-center cursor-pointer hover:bg-gray-300 "border-b-2`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {key.name}
                  </div>
                  {activeIndex === index && (
                    <div
                      className="z-10 absolute w-56 bg-white border-gray-300 rounded-lg p-2 border-2"
                      style={{ top: `${-5}px`, left: "100%" }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <div className="border-b-2 border-black flex justify-center items-center gap-2">
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
                      <label className="flex items-center gap-2 my-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={false}
                          onChange={() =>
                            handleSelectAllChange(uniqueKeys[index])
                          }
                        />
                        <span>Select All</span>
                      </label>
                      <div className="flex flex-col gap-1">
                        {key.items.map((value, i) => (
                          <div key={i}>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={value.checked ?? false}
                                onChange={() => {
                                  handleCheckboxChange(uniqueKeys[index], i);
                                  aggregate(leftFilterData, {
                                    key: uniqueKeys[index],
                                    value: [value],
                                  });
                                }}
                              />
                              <span>{value.value}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestFilter2;
