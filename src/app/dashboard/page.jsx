"use client";
import React, { useEffect, useState } from "react";

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
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Filter from "@/components/Filter";
import axios from "axios";
import { useFormik } from "formik";

const chapters = [
  { title: "28" },
  { title: "29" },
  { title: "30" },
  { title: "31" },
  { title: "32" },
  { title: "33" },
  { title: "34" },
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

  useEffect(() => {
    themeChange(false);
  }, []);

  // ==========================================================

  const { handleSubmit, values, errors, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: {
        info: "",
        dataType: "",
        startDate: "",
        endDate: "",
        chapter: "",
        searchType: "",
        searchValue: "",
      },
      // validationSchema:,
      onSubmit: async (values) => {
        console.log("Form data:", values);

        const url = `http://localhost:8080/data/records?informationOf=export&dataType=raw data&duration=20/03/2022-15/11/2022&chapter=30&searchType=product name&searchValue=Sorafenib`;
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
  //       "http://localhost:8080/data/records?informationOf=export&dataType=raw data&duration=20/03/2022-15/11/2022&chapter=30&searchType=product name&searchValue=Sorafenib";
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

  return (
    <div className="px-3 py-12 space-y-6 bg-[#f0effa]">
      {/* IMPORT || EXPORT==========================  */}
      <div>
        <div className="join border border-blue-900 rounded-3xl">
          <input
            className="join-item btn btn-sm"
            type="radio"
            name="options"
            aria-label="Import"
            defaultChecked
          />
          <input
            className="join-item btn btn-sm"
            type="radio"
            name="options"
            aria-label="Export"
          />
        </div>
      </div>

      {/* SEARCH FILTERS============================= */}
      <form className="flex w-full justify-between" onSubmit={handleSubmit}>
        <div>
          <FormControl>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              name="startDate"
              value={values.startDate}
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={touched.startDate && errors.startDate}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              size="small"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ backgroundColor: "white" }}
              InputLabelProps={{
                shrink: true,
              }}
              error={touched.endDate && Boolean(errors.endDate)}
              helperText={touched.endDate && errors.endDate}
            />
          </FormControl>
        </div>
        {/* DATA TYPE FILTER ======= */}
        <div>
          <FormControl
            className="w-40"
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
              <MenuItem value="raw">Raw Data</MenuItem>
              <MenuItem value="clean">Cleaned Data</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* CHAPTER FILTER ======= */}
        <div>
          <CheckboxesTags name="Chapters" chapters={chapters} width="120px" />
        </div>
        {/* SEARCH TYPE FILTER ======= */}
        <div>
          <FormControl
            className="w-40"
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

        {/* SEARCH BOX======= */}
        <div>
          <Sizes />
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
      <div className="flex gap-3 ">
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Volume:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Value:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Avg Price:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Data Records:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
      </div>
      {/* -------------------------------------------SHOW GRAPH--------------------------------- */}
      <div className="flex justify-end">
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

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 6fr" }}>
        {/* -------------------------------------------FILTERS--------------------------------------- */}
        <div className="bg-white rounded-lg">
          <Filter />
        </div>

        {/* -------------------------------------------CARDS----------------------------------------- */}
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
            {/* ========================================================================== */}
            {/* <div className="flex gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="card bg-base-100 w-full border-2">
                  <div className="p-2">
                    <BarChart />
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        )}
      </div>
      {/* -------------------------------------------TABLE----------------------------------------- */}
      <div>{apidata && <Table apidata={apidata} />}</div>
    </div>
  );
};

export default Dashboard;
