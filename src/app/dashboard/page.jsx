"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { RxSize } from "react-icons/rx";
import { IoBarChart } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { themeChange } from "theme-change";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DataCard from "@/components/DataCard";
// import debounce from "lodash.debounce";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import axiosInstance from "@/utils/axiosInstance";
import { format } from "date-fns";
import { validationSchema } from "@/utils/validationSchemas";

import Accordion from "@/components/Accordion";
import Table from "@/components/Table";
import Filter from "@/components/Filter";

// import BarChart from "@/components/Barchart";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import RecordTable from "@/components/RecordTable";
import TestFilter from "@/components/TestFilter";

// Dynamically import BarChart and disable SSR
const BarChart = dynamic(() => import("../../components/Barchart"), {
  ssr: false,
});

const chapters = [
  { title: "28" },
  { title: "29" },
  { title: "30" },
  { title: "31" },
  { title: "32" },
  { title: "33" },
  { title: "34" },
];

export default function Dashboard() {
  const [showAllGraphs, setShowAllGraphs] = useState(false);
  const [dateDuration, setDateDuration] = useState(""); // for date duration

  // RECORD API=============
  const [recordData, setRecordData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [recordLoading, setRecordLoading] = useState(false);
  const [recordError, setRecordError] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [searchApiData, setSearchApiData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    handleSubmit,
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      info: "import",
      dataType: "",
      duration: "",
      chapter: "",
      searchType: "",
      searchValue: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("VALUES====", values);
      const sessionId = localStorage.getItem("sessionId");
      try {
        setRecordLoading(true);
        setRecordError(null);
        const response = await axiosInstance.get(`/data/records`, {
          params: {
            informationOf: values.info,
            dataType: values.dataType,
            duration: values.duration,
            chapter: values.chapter,
            searchType: values.searchType,
            searchValue: values.searchValue,
            session: sessionId,
          },
        });
        setRecordData(response.data.data);
        setFilteredData(response.data.data);

        // console.log("DISHANT CHECK============", response.data.data);

        const { data, metrics } = response.data.data || {};
        console.log("API DATA=============", data);

        setLeftFilterData(data);
        
        if (metrics) {
          const dynamicGraphsData = Object.entries(metrics).map(
            ([key, value]) => {
              const data = value.map((item) => ({
                label:
                  item.buyer ||
                  item.supplier ||
                  item.buyerCountry ||
                  item.portOfOrigin ||
                  "Unknown",
                value: item.total,
              }));
              return {
                key,
                data,
                label: key.replace(/([A-Z])/g, " $1").trim(),
              };
            }
          );

          setGraphsData(dynamicGraphsData);
        } else {
          console.error("Metrics data is missing in API response.");
        }
      } catch (err) {
        console.log("error====", err);
        const errorMessage = err.response?.data?.message || "An error occurred";
        setRecordError(errorMessage);

        if (err.response.status === 403) {
          console.log("************Inside 403 error*********");
          router.push("/login");
        }
      } finally {
        setRecordLoading(false);
      }
    },
  });

  const valuesRef = useRef(values);

  // Update the ref whenever `values` change
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  const fetchSuggestions = async (
    query,
    currentValues,
    setSearchApiData,
    setError
  ) => {
    console.log("VALUES======", currentValues);
    const sessionId = localStorage.getItem("sessionId");
    const url = `/data/suggestion?informationOf=${currentValues.info}&chapter=${
      currentValues.chapter
    }&searchType=${currentValues.searchType}&suggestion=${encodeURIComponent(
      query
    )}&session=${sessionId}`;
    try {
      const response = await axiosInstance.get(url);
      setSearchApiData(response.data.data);
    } catch (err) {
      toast.error("api failed in catch❌❌❌");
      console.error("error====", err);
      setError(err.message);
    }
  };

  // Debounced API fetch function
  const handleSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        setSearchLoading(true);
        await fetchSuggestions(
          query,
          valuesRef.current,
          setSearchApiData,
          setError
        );
        setSearchLoading(false);
      }
    }, 300), // Debounce interval in ms
    []
  );

  const customShortcuts = [
    {
      label: "1 Year",
      getValue: () => {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        return {
          startDate: oneYearAgo,
          endDate: today,
        };
      },
    },
  ];

  const [graphsData, setGraphsData] = useState([]);

  const [leftFilterData, setLeftFilterData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");
        const response = await axiosInstance.get(`/data/records`, {
          params: {
            informationOf: "export",
            dataType: "cleaned data",
            duration: "01/02/2022-01/02/2025",
            chapter: "30",
            searchType: "product name",
            searchValue: "Acetic Acid",
            session: sessionId,
          },
        });

        setRecordData(response.data.data);
        setFilteredData(response.data.data);

        const { data, metrics } = response.data.data || {};
        console.log("API DATA=============", data);

        setLeftFilterData(data);

        if (metrics) {
          // Transform each array in metrics into graph-ready data
          const dynamicGraphsData = Object.entries(metrics).map(
            ([key, value]) => {
              const data = value.map((item) => ({
                label:
                  item.buyer ||
                  item.supplier ||
                  item.buyerCountry ||
                  item.portOfOrigin ||
                  "Unknown",
                value: item.total,
              }));
              return {
                key,
                data,
                label: key.replace(/([A-Z])/g, " $1").trim(), // Format key for display
              };
            }
          );

          setGraphsData(dynamicGraphsData);
        } else {
          console.error("Metrics data is missing in API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const graphFilterHandler = (filteredData) => {
    toast.success("function called");
    console.log("graphsData=============", graphsData);
    console.log("filteredData=============", filteredData);
    setGraphsData(filteredData);
  };

  const searchOptions = [
    { title: "Product Description", value: "productDescription" },
    { title: "Product Name", value: "productName" },
    { title: "CAS Number", value: "CAS_Number" },
    { title: "HS Code (6 digit)", value: "H_S_Code" },
    {
      title: "Indian Company",
      value: values.info === "import" ? "buyer" : "supplier",
    },
    {
      title: "Foreign Company",
      value: values.info === "import" ? "buyer" : "supplier",
    },
  ];

  return (
    <div className="px-3 py-6 space-y-6 bg-gray-100">
      <form
        className="flex w-full flex-col justify-between items-center gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full justify-between gap-5">
          <div>
            <ToggleButtonGroup
              value={values.info}
              exclusive
              onChange={(event, newAlignment) =>
                setFieldValue("info", newAlignment)
              }
              aria-label="text alignment"
              size="small"
            >
              <ToggleButton
                value="import"
                aria-label="Import"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1E3A8A",
                    color: "white",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#1E3A8A",
                  },
                }}
              >
                Import
              </ToggleButton>
              <ToggleButton
                value="export"
                aria-label="Export"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#1E3A8A",
                    color: "white",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#1E3A8A",
                  },
                }}
              >
                Export
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="w-full">
            <Datepicker
              // value={values.duration}
              value={dateDuration}
              // displayFormat="DD/MM/YYYY"
              // inputId="datepicker"
              // inputName="datepicker"
              // required={true}
              inputClassName="w-full p-2 border-[1px] border-[#C4C4C4] rounded-md focus:ring-0  bg-white placeholder:text-gray text-gray dark:bg-blue-900 dark:placeholder:text-blue-100"
              onChange={(newValue) => {
                setDateDuration(newValue);
                const formattedStartDate = format(
                  newValue.startDate,
                  "dd/MM/yyyy"
                );
                const formattedEndDate = format(newValue.endDate, "dd/MM/yyyy");
                setFieldValue(
                  "duration",
                  `${formattedStartDate}-${formattedEndDate}`
                );
              }}
              // showShortcuts={true}
              primaryColor={"blue"}
              // customShortcuts={customShortcuts}
              // onChange={(newValue) => {
              //   setFieldValue("duration", newValue);
              // }}
            />
          </div>

          <div className="w-full">
            <FormControl
              className="w-full"
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <InputLabel id="data-type-label">Data Type</InputLabel>
              <Select
                label="Data Type"
                labelId="data-type-label"
                id="data-type"
                name="dataType"
                value={values.dataType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dataType && Boolean(errors.dataType)}
              >
                <MenuItem value="raw data">Raw Data</MenuItem>
                <MenuItem value="cleaned data">Cleaned Data</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-full">
            <Autocomplete
              size="small"
              id="chapter-select"
              options={chapters}
              getOptionLabel={(option) => option.title}
              value={
                chapters.find((option) => option.title === values.chapter) ||
                null
              }
              onChange={(event, newValue) => {
                setFieldValue("chapter", newValue?.title || "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chapter"
                  error={touched.chapter && !!errors.chapter}
                  helperText={touched.chapter && errors.chapter}
                />
              )}
              style={{ width: "100%", backgroundColor: "white" }}
            />
          </div>
          <div className="w-full">
            <FormControl
              className="w-full"
              size="small"
              sx={{ backgroundColor: "white", borderColor: "gray" }}
            >
              <InputLabel
                id="search-type-label"
                // sx={{ color: "black", backgroundColor: "white", paddingX: 1 }}
              >
                Search Type
              </InputLabel>
              <Select
                label="Search Type"
                labelId="search-type-label"
                id="search-type"
                name="searchType"
                value={values.searchType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.searchType && Boolean(errors.searchType)}
              >
                {searchOptions.map((item, i) => (
                  <MenuItem value={item.value} key={i}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <Stack sx={{ width: 500, marginBottom: 2 }}>
              <Autocomplete
                sx={{ backgroundColor: "white" }}
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={searchApiData}
                loading={searchLoading}
                getOptionLabel={(option) => option.title || ""}
                onInputChange={(event, value) => {
                  handleSearch(value); // Call debounced API function
                }}
                onChange={(event, value) => {
                  const selectedTitles = value
                    .map((item) => item.title)
                    .join(", ");
                  setFieldValue("searchValue", selectedTitles);
                  console.log("Selected Titles:", selectedTitles);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    placeholder="Search the product..."
                    error={!!errors.searchValue && touched.searchValue}
                    // helperText={
                    //   (touched.searchValue && errors.searchValue) ||
                    //   "Start typing to search"
                    // }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {searchLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </div>

          <div>
            <Button
              type="submit"
              className="bg-theme_color"
              variant="contained"
              sx={{
                backgroundColor: "#1E3A8A",
                "&:hover": {
                  backgroundColor: "#162F63",
                },
              }}
              endIcon={<CiSearch />}
            >
              Search
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => setShowAllGraphs(!showAllGraphs)}
              sx={{
                backgroundColor: "#1E3A8A",
                "&:hover": {
                  backgroundColor: "#162F63",
                },
              }}
            >
              {showAllGraphs ? "show data" : "show graphs"}
            </Button>
          </div>
        </div>
      </form>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4"></p>
        </div>
      </dialog>
      {recordLoading ? (
        <div>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : recordError ? (
        <div className="text-red-500 text-center">{recordError}</div>
      ) : (
        filteredData?.data?.length > 0 && (
          <div className="space-y-6">
            <DataCard />
            {/* <div>
              <HorizontalFilters leftFilterData={leftFilterData} />
            </div> */}
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: "1fr 6fr" }}
            >
              <div>
                {/* <Filter leftFilterData={leftFilterData} /> */}
                <TestFilter
                  leftFilterData={leftFilterData}
                  graphFilterHandler={graphFilterHandler}
                  recordData={recordData}
                />
              </div>
              {showAllGraphs ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="card bg-base-100  shadow-xl rounded-lg"
                      >
                        <div className="card-body p-2">
                          <div className="flex justify-between">
                            <h6 className="card-title text-xs">
                              Year/Month (5/50)
                            </h6>
                            <div className="flex gap-2">
                              <h6 className="card-title text-xs">1Y 3Y</h6>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById("my_modal_3")
                                    .showModal()
                                }
                              >
                                <IoBarChart />
                              </button>
                              <RxSize />
                            </div>
                          </div>

                          <div>
                            <label className="input input-sm input-bordered flex items-center gap-2">
                              <input
                                type="text"
                                className="grow"
                                placeholder="Search"
                              />
                              <FaChevronDown />
                            </label>
                            <Accordion />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                  {graphsData.length > 0 ? (
                    graphsData.map((graph, index) => (
                      <div
                        key={index}
                        className="card bg-base-100 w-full border-2"
                      >
                        <div className="p-3">
                          {graph.data && graph.data.length > 0 ? (
                            <BarChart data={graph.data} label={graph.label} />
                          ) : (
                            <p>No data available for the chart</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      {/* <span className="loading loading-spinner loading-lg"></span> */}
                      something went wrong
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* <BarChartWithTrendLine /> */}
            {/* <div>{recordData && <Table data={recordData?.data} />}</div> */}
            <div>
              {filteredData && <RecordTable data={filteredData?.data} />}
            </div>
          </div>
        )
      )}
    </div>
  );
}
