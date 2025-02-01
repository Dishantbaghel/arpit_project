"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaAngleDoubleRight } from "react-icons/fa";

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

const TestFilter = ({ leftFilterData, graphFilterHandler, recordData }) => {
  // console.log("FiLTER DATA========", recordData);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [checkboxes, setCheckboxes] = useState({}); // Store checkboxes state for each key

  // Initialize checkbox state when `leftFilterData` changes
  useEffect(() => {
    const initialCheckboxes = {};
    const uniqueKeys = Array.from(
      new Set(leftFilterData.flatMap((item) => Object.keys(item)))
    );

    uniqueKeys.forEach((key) => {
      const values = uniqueValues(key);
      initialCheckboxes[key] = {
        selectAll: true,
        items: values.map(() => true), // Default all items to selected
      };
    });

    setCheckboxes(initialCheckboxes);
  }, [leftFilterData]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleSelectAllChange = (key) => {
    const allSelected = !checkboxes[key]?.selectAll;
    const items = uniqueValues(key).map(() => allSelected);

    setCheckboxes((prev) => ({
      ...prev,
      [key]: {
        selectAll: allSelected,
        items,
      },
    }));
  };

  const handleCheckboxChange = (key, index) => {
    setCheckboxes((prev) => {
      const updatedItems = [...(prev[key]?.items || [])];
      updatedItems[index] = !updatedItems[index];

      return {
        ...prev,
        [key]: {
          selectAll: updatedItems.every((checked) => checked),
          items: updatedItems,
        },
      };
    });
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

  // const aggregate = (arr, query) => {
  //   console.log("INSIDE AGGREGATE===========", arr, query);
  //   if (query) {
  //     arr = arr.filter((item) => query?.value.includes(item[query.key]));
  //   }

  //   let result = {
  //     topBuyerByQuantity: {},
  //     topSupplierByQuantity: {},
  //     topIndianPortByQuantity: {},
  //     topCountryByQuantity: {},
  //     topBuyerByValue: {},
  //     topSupplierByValue: {},
  //     topIndianPortByValue: {},
  //     topCountryByValue: {},
  //     totalQuantity: 0,
  //     totalValue: 0,
  //   };

  //   arr.forEach((item) => {
  //     if (result.topBuyerByQuantity[item.indianCompany]) {
  //       result.topBuyerByQuantity[item.indianCompany] =
  //         result.topBuyerByQuantity[item.indianCompany] +
  //         parseFloat(item.quantity);
  //       result.topBuyerByValue[item.indianCompany] =
  //         result.topBuyerByValue[item.indianCompany] +
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     } else {
  //       result.topBuyerByQuantity[item.indianCompany] = parseFloat(
  //         item.quantity
  //       );
  //       result.topBuyerByValue[item.indianCompany] =
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     }

  //     if (result.topSupplierByQuantity[item.foreignCompany]) {
  //       result.topSupplierByQuantity[item.foreignCompany] =
  //         result.topSupplierByQuantity[item.foreignCompany] +
  //         parseFloat(item.quantity);
  //       result.topSupplierByValue[item.foreignCompany] =
  //         result.topSupplierByValue[item.foreignCompany] +
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     } else {
  //       result.topSupplierByQuantity[item.foreignCompany] = parseFloat(
  //         item.quantity
  //       );
  //       result.topSupplierByValue[item.foreignCompany] =
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     }

  //     if (result.topIndianPortByQuantity[item.indianPort]) {
  //       result.topIndianPortByQuantity[item.indianPort] =
  //         result.topIndianPortByQuantity[item.indianPort] +
  //         parseFloat(item.quantity);
  //       result.topIndianPortByValue[item.indianPort] =
  //         result.topIndianPortByValue[item.indianPort] +
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     } else {
  //       result.topIndianPortByQuantity[item.indianPort] = parseFloat(
  //         item.quantity
  //       );
  //       result.topIndianPortByValue[item.indianPort] =
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     }

  //     if (result.topCountryByQuantity[item.foreignCountry]) {
  //       result.topCountryByQuantity[item.foreignCountry] =
  //         result.topCountryByQuantity[item.foreignCountry] +
  //         parseFloat(item.quantity);
  //       result.topCountryByValue[item.foreignCountry] =
  //         result.topCountryByValue[item.foreignCountry] +
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     } else {
  //       result.topCountryByQuantity[item.foreignCountry] = parseFloat(
  //         item.quantity
  //       );
  //       result.topCountryByValue[item.foreignCountry] =
  //         parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //     }
  //     result.totalQuantity = result.totalQuantity + parseFloat(item.quantity);
  //     result.totalValue =
  //       result.totalValue +
  //       parseFloat(item.quantity) * parseFloat(item.unitPrice);
  //   });

  //   result.totalRecords = arr.length;

  //   console.log("=======>", result);

  //   // graphFilterHandler(result);

  //   // return result;
  // };

  const aggregate = (arr, query) => {
    console.log("INSIDE AGGREGATE===========", arr, query);
    if (query) {
      arr = arr.filter((item) => query?.value.includes(item[query.key]));
    }

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
      transformToAPIFormat(result.topSupplierByQuantity, "topSupplierByQuantity"),
      transformToAPIFormat(result.topIndianPortByQuantity, "topIndianPortByQuantity"),
      transformToAPIFormat(result.topCountryByQuantity, "topCountryByQuantity"),
      transformToAPIFormat(result.topBuyerByValue, "topBuyerByValue"),
      transformToAPIFormat(result.topSupplierByValue, "topSupplierByValue"),
      transformToAPIFormat(result.topIndianPortByValue, "topIndianPortByValue"),
      transformToAPIFormat(result.topCountryByValue, "topCountryByValue"),
    ];

    console.log("=======>", apiResponse);

    // Assuming graphFilterHandler is a function that handles the API response
    graphFilterHandler(apiResponse);
    return apiResponse;
  };

  return (
    <div
      className="rounded-md flex bg-white relative shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex flex-col justify-between bg-white rounded-md">
        {leftFilterData.length > 0 && (
          <div>
            {Object.keys(leftFilterData[0])
              .filter((key) => key !== "dateOfShipment")
              .map((key, index) => (
                <div
                  key={index}
                  className={`p-2 flex justify-between items-center ${
                    index === Object.keys(leftFilterData[0]).length - 2
                      ? ""
                      : "border-b-2"
                  } border-gray-400 cursor-pointer hover:bg-gray-300`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {formatKey(key)}
                </div>
              ))}
          </div>
        )}

        {/* Filters Section */}
        {activeIndex !== null && (
          <div
            className="z-10 absolute w-56 bg-white border-gray-300 shadow-2xl rounded-lg p-2 border-2"
            style={{ left: "100%" }}
            onMouseEnter={() => setActiveIndex(activeIndex)} // Keep modal open on hover
            onMouseLeave={handleMouseLeave} // Close modal when mouse leaves modal area
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
                  checkboxes[uniqueKeys[activeIndex]]?.selectAll || false
                }
                onChange={() => handleSelectAllChange(uniqueKeys[activeIndex])}
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
                        checked={
                          checkboxes[uniqueKeys[activeIndex]]?.items?.[i] ||
                          false
                        }
                        onChange={() => {
                          handleCheckboxChange(uniqueKeys[activeIndex], i);
                          aggregate(
                            // recordData.metrics,
                            leftFilterData,
                            {
                              key: uniqueKeys[activeIndex],
                              value: [value],
                            }
                          );
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
    </div>
  );
};

export default TestFilter;
