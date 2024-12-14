"use client";
import React, { useCallback, useEffect, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { FaFolderOpen } from "react-icons/fa";

import { FaFileCircleMinus } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaSave } from "react-icons/fa";

import { RxSize } from "react-icons/rx";
import { IoBarChart } from "react-icons/io5";

import { FaChevronDown } from "react-icons/fa";
import TabsComponent from "@/components/Tabs";
import BarChart from "@/components/Barchart";
import Accordion from "@/components/Accordion";
import Table from "@/components/Table";

// import Accordion from "../../components/Accordion";
// import TabsComponent from "../../components/Tabs";
// import Modal from "../../components/Modal";
// import BarChart from "../../components/Barchart";

import { themeChange } from "theme-change";
import AutocompleteWithBadge from "@/components/test";
import CheckboxesTags from "@/components/CheckboxDropdown";
import Sizes from "@/components/SearchboxDropdown";
import DateRange from "@/components/DateRange";
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Filter from "@/components/Filter";
import axios from "axios";
import { useFormik } from "formik";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { validationSchema } from "@/utils/validationSchemas";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DataCard from "@/components/DataCard";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import HorizontalTabs from "@/components/HorizontalTabs";
import VerticalTabs from "@/components/VerticalTabs";
// import debounce from "lodash.debounce";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";

const chapters = [
  { title: "28" },
  { title: "29" },
  { title: "30" },
  { title: "31" },
  { title: "32" },
  { title: "33" },
  { title: "34" },
];

const top100Films = [
  { title: "Sorafenib", year: 1994 },
  { title: "Benzyl Alcohol", year: 1994 },
];

const searchOptions = [
  { title: "Product Description" },
  { title: "Product Name" },
  { title: "CAS Number" },
  { title: "HS Code (6 digit)" },
  { title: "Indian Company" },
  { title: "Foreign Company" },
];

const Dashboard = () => {
  const [showAllGraphs, setShowAllGraphs] = useState(false);

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  // ==========================================================

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
      startDate: "",
      endDate: "",
      chapter: "",
      searchType: "",
      searchValue: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data:", values);

      const url = `http://localhost:8080/data/records?informationOf=${values.info}&dataType=${values.dataType}&duration=20/03/2022-15/11/2022&chapter=${values.chapter}&searchType=${values.searchType}&searchValue=${values.searchValue}`;
      // const url = `http://localhost:8080/data/records?informationOf=export&dataType=cleaned data&duration=20/03/2022-15/11/2022&chapter=30&searchType=product name&searchValue=Sorafenib,Tacrolimus`;
      try {
        const response = await axios.get(url);
        setApiData(response.data.data);
        console.log("DATA=====", response.data);
      } catch (err) {
        console.log("error====", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // ==========================================================

  const [apidata, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url =
  //       // "http://localhost:8080/data/records?informationOf=export&dataType=raw data&duration=20/03/2022-15/11/2022&chapter=30&searchType=product name&searchValue=Sorafenib";
  //       "http://localhost:8080/data/records?informationOf=export&dataType=cleaned data&duration=20/03/2022-15/11/2022&chapter=30&searchType=product name&searchValue=Sorafenib";
  //     try {
  //       const response = await axios.get(url);
  //       setApiData(response.data.data);
  //       console.log("DATA=====", response.data);
  //     } catch (err) {
  //       console.log("error====", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // =========================handle change====================

  // const handleSearch = async () => {
  //   const url =
  //     "http://localhost:8080/data/suggestion?informationOf=export&chapter=30&searchType=product description&suggestion=SULPHONE";
  //   try {
  //     const response = await axios.get(url);
  //     setApiData(response.data.data);
  //     console.log("DATA=====", response.data);
  //   } catch (err) {
  //     console.log("error====", err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [open, setOpen] = useState(false); // For managing the dropdown state
  const [searchApiData, setSearchApiData] = useState([]); // Renamed to searchApiData
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchSuggestions = async (query, setSearchApiData, setError) => {
    const url = `http://localhost:8080/data/suggestion?informationOf=export&chapter=30&searchType=product%20description&suggestion=${encodeURIComponent(
      query
    )}`;
    try {
      const response = await axios.get(url);
      setSearchApiData(response.data.data);
    } catch (err) {
      toast.error("api failed in catch❌❌❌❌");
      console.error("error====", err);
      setError(err.message);
    }
  };

  // Debounced API fetch function
  const handleSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        setSearchLoading(true);
        await fetchSuggestions(query, setSearchApiData, setError);
        setSearchLoading(false);
      }
    }, 300), // Debounce interval in ms
    []
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [dateValue, setDateValue] = useState({ 
    startDate: null, 
    endDate: null
});

  return (
    <div className="px-3 py-12 space-y-6 bg-gray-100">
      {/* SEARCH FILTERS============================= */}
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
          {/* DATES FILTER ======= */}
          {/* <div className="w-full">
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              name="startDate"
              value={values.startDate}
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ backgroundColor: "white", width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={touched.startDate && errors.startDate}
            />
          </div>
          <div className="w-full">
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ backgroundColor: "white", width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.endDate && Boolean(errors.endDate)}
              helperText={touched.endDate && errors.endDate}
            />
          </div> */}

          {/* <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["SingleInputDateRangeField"]}
                sx={{ width: "100%" }}
              >
                <DateRangePicker
                  slots={{ field: SingleInputDateRangeField }}
                  name="allowedRange"
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div> */}

          <Datepicker
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
            showShortcuts={true}
            primaryColor={"blue"}
          />

          {/* DATA TYPE FILTER ======= */}
          <div className="w-full">
            <FormControl
              className="w-full"
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <InputLabel id="data-type-label">Data Type</InputLabel>
              <Select
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
          {/* CHAPTER FILTER ======= */}
          <div className="w-full">
            {/* <CheckboxesTags name="Chapters" chapters={chapters} width="100%" /> */}
            <Autocomplete
              size="small"
              id="chapter-select"
              options={chapters} // Assuming chapters is an array of objects
              getOptionLabel={(option) => option.title}
              value={
                chapters.find((option) => option.title === values.chapter) ||
                null
              } // Match Formik value with the option
              onChange={(event, newValue) => {
                setFieldValue("chapter", newValue?.title || ""); // Set value or fallback to empty string
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
          {/* SEARCH TYPE FILTER ======= */}
          <div className="w-full">
            <FormControl
              className="w-full"
              size="small"
              sx={{ backgroundColor: "white" }}
            >
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                name="searchType"
                value={values.searchType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.searchType && Boolean(errors.searchType)}
              >
                {searchOptions.map((item, i) => (
                  <MenuItem value={item.title} key={i}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex gap-5">
          {/* SEARCH BOX======= */}
          <div>
            {/* <Sizes /> */}

            <Stack sx={{ width: 500, marginBottom: 2 }}>
              <Autocomplete
                sx={{ backgroundColor: "white" }}
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={searchApiData}
                loading={searchLoading}
                getOptionLabel={(option) => option.productDescription}
                onInputChange={(event, value) => {
                  handleSearch(value); // Call debounced API function
                }}
                onChange={(event, value) => {
                  const selectedTitles = value
                    .map((item) => item.productDescription) // Use the correct field
                    .join(", ");
                  console.log("Selected Titles:", selectedTitles);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    placeholder="Search the product..."
                    error={!!error}
                    // helperText={error || "Start typing to search"}
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

            {/* ==============================================================  */}

            {/* <Stack sx={{ width: 500, marginBottom: 2 }}>
              <Autocomplete
                sx={{ backgroundColor: "white" }}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                size="small"
                options={searchApiData}
                loading={searchLoading}
                isOptionEqualToValue={(option, value) =>
                  option.productDescription === value.productDescription
                }
                getOptionLabel={(option) => option.productDescription || ""}
                onInputChange={(event, value) => {
                  handleSearch(value); // Fetch options based on input
                }}
                onChange={(event, value) => {
                  const selectedTitles = value
                    .map((item) => item.productDescription) // Map selected descriptions
                    .join(", ");
                  console.log("Selected Titles:", selectedTitles);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    placeholder="Search the product..."
                    error={!!error}
                    // helperText={error || "Start typing to search"}
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
            </Stack> */}
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
          {/* -------------------------------------------SHOW GRAPH--------------------------------- */}
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

      {/* =========================================== */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4"></p>
          <BarChart />
          {/* <DonutChart /> */}
        </div>
      </dialog>
      {/* -------------------------------------------TITLE CARDS--------------------------------- */}
      <DataCard />

      {/* <HorizontalTabs /> */}

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 6fr" }}>
        {/* FILTERS******** */}
        <div>
          <Filter />
        </div>
        {/* ------------------CARDS----------------------------------------- */}
        {!showAllGraphs ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-100  shadow-xl rounded-lg"
                >
                  <div className="card-body p-2">
                    <div className="flex justify-between">
                      <h6 className="card-title text-xs">Year/Month (5/50)</h6>
                      <div className="flex gap-2">
                        <h6 className="card-title text-xs">1Y 3Y</h6>
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
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

                      {/* -----------------------------------ACCORDIAN------------------------------- */}
                      <Accordion />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* -------------------------------------------ALL GRAPHS----------------------------------------- */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="card bg-base-100 w-full border-2">
                  <div className="p-3">
                    <BarChart />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* TABLE************  */}
      <div>{apidata && <Table apidata={apidata} />}</div>
    </div>
  );
};

export default Dashboard;
