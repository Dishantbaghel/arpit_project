"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Chip } from "@mui/material";

const TestFilter = ({
  leftFilterData,
  graphFilterHandler,
  recordData,
  setLeftFilterData,
  setLeftFilterData2,
}) => {
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

    testingFun(leftFilterData);
  }, [leftFilterData]);

  const handleCheckboxChange = (key, index) => {
    setCheckboxes((prev) => {
      const updatedItems = prev[key]?.items.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      );

      const newState = {
        ...prev,
        [key]: { items: updatedItems },
      };

      // (newState); // Call your function with the updated state
      return newState;
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
    setLeftFilterData2(filteredList);
    // console.log("list:::::::::::::::", filteredList, uncheckedItems);
    console.log("list:::::::::arrarr::::::", filteredList, recordData);
    return testingFun(filteredList);
    // let result = {
    //   topBuyerByQuantity: {},
    //   topSupplierByQuantity: {},
    //   topIndianPortByQuantity: {},
    //   topCountryByQuantity: {},
    //   topBuyerByValue: {},
    //   topSupplierByValue: {},
    //   topIndianPortByValue: {},
    //   topCountryByValue: {},
    //   totalQuantity: 0,
    //   totalValue: 0,
    // };

    // arr.forEach((item) => {
    //   // Aggregate buyers by quantity and value
    //   if (result.topBuyerByQuantity[item.indianCompany]) {
    //     result.topBuyerByQuantity[item.indianCompany] += parseFloat(
    //       item.quantity
    //     );
    //     result.topBuyerByValue[item.indianCompany] +=
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   } else {
    //     result.topBuyerByQuantity[item.indianCompany] = parseFloat(
    //       item.quantity
    //     );
    //     result.topBuyerByValue[item.indianCompany] =
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   }

    //   // Aggregate suppliers by quantity and value
    //   if (result.topSupplierByQuantity[item.foreignCompany]) {
    //     result.topSupplierByQuantity[item.foreignCompany] += parseFloat(
    //       item.quantity
    //     );
    //     result.topSupplierByValue[item.foreignCompany] +=
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   } else {
    //     result.topSupplierByQuantity[item.foreignCompany] = parseFloat(
    //       item.quantity
    //     );
    //     result.topSupplierByValue[item.foreignCompany] =
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   }

    //   // Aggregate Indian ports by quantity and value
    //   if (result.topIndianPortByQuantity[item.indianPort]) {
    //     result.topIndianPortByQuantity[item.indianPort] += parseFloat(
    //       item.quantity
    //     );
    //     result.topIndianPortByValue[item.indianPort] +=
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   } else {
    //     result.topIndianPortByQuantity[item.indianPort] = parseFloat(
    //       item.quantity
    //     );
    //     result.topIndianPortByValue[item.indianPort] =
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   }

    //   // Aggregate countries by quantity and value
    //   if (result.topCountryByQuantity[item.foreignCountry]) {
    //     result.topCountryByQuantity[item.foreignCountry] += parseFloat(
    //       item.quantity
    //     );
    //     result.topCountryByValue[item.foreignCountry] +=
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   } else {
    //     result.topCountryByQuantity[item.foreignCountry] = parseFloat(
    //       item.quantity
    //     );
    //     result.topCountryByValue[item.foreignCountry] =
    //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
    //   }

    //   // Update total quantity and value
    //   result.totalQuantity += parseFloat(item.quantity);
    //   result.totalValue +=
    //     parseFloat(item.quantity) * parseFloat(item.unitPrice);
    // });

    // // Convert the aggregated data into the API response format
    // const transformToAPIFormat = (data, key) => {
    //   const formattedData = Object.keys(data)
    //     .map((label) => ({
    //       label,
    //       value: data[label],
    //     }))
    //     .sort((a, b) => b.value - a.value); // Sort by value in descending order

    //   return {
    //     key,
    //     data: formattedData,
    //     label: key.replace(/([A-Z])/g, " $1").trim(), // Format the key for display
    //   };
    // };

    // const apiResponse = [
    //   transformToAPIFormat(result.topBuyerByQuantity, "topBuyerByQuantity"),
    //   transformToAPIFormat(
    //     result.topSupplierByQuantity,
    //     "topSupplierByQuantity"
    //   ),
    //   transformToAPIFormat(
    //     result.topIndianPortByQuantity,
    //     "topIndianPortByQuantity"
    //   ),
    //   transformToAPIFormat(result.topCountryByQuantity, "topCountryByQuantity"),
    //   transformToAPIFormat(result.topBuyerByValue, "topBuyerByValue"),
    //   transformToAPIFormat(result.topSupplierByValue, "topSupplierByValue"),
    //   transformToAPIFormat(result.topIndianPortByValue, "topIndianPortByValue"),
    //   transformToAPIFormat(result.topCountryByValue, "topCountryByValue"),
    // ];

    // // Assuming graphFilterHandler is a function that handles the API response
    // graphFilterHandler(apiResponse);
    // return apiResponse;
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
    setLeftFilterData2(filteredList);
    return testingFun(filteredList);
  };

  console.log("checkboxes==========", checkboxes);

  const uncheckedItems = Object.entries(checkboxes).flatMap(([key, data]) =>
    data.items.filter((item) => !item.checked).map((item) => ({ key, ...item }))
  );

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
          <div>
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
                      {/* Select All Checkbox */}
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
                      {/* Render Unique Values for the Active Key */}
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
          </div>
        )}

        {/* Filters Section */}
        {/* {activeIndex !== null && (
          <div
            className="z-10 absolute w-56 bg-white border-gray-300 shadow-2xl rounded-lg p-2 border-2"
            style={{ top: `${activeIndex * 55}px`, left: "100%" }}
            onMouseEnter={() => setActiveIndex(activeIndex)} // Keep modal open on hover
            onMouseLeave={() => setActiveIndex(null)} // Close modal when mouse leaves modal area
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
                  checkboxes[uniqueKeys[activeIndex]]?.selectAll || false
                }
                onChange={() => handleSelectAllChange(uniqueKeys[activeIndex])}
              />
              <span>Select All</span>
            </label>

            <div className="flex flex-col gap-1">
              {activeIndex !== null &&
                uniqueValues(uniqueKeys[activeIndex])
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
                            checkboxes[uniqueKeys[activeIndex]]?.items?.[i]
                              ?.checked ?? true
                          }
                          onChange={() => {
                            handleCheckboxChange(uniqueKeys[activeIndex], i);
                            aggregate(leftFilterData, {
                              key: uniqueKeys[activeIndex],
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
        )} */}
      </div>
    </div>
  );
};

export default TestFilter;
