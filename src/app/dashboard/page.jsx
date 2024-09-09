"use client";
import React, { useEffect } from "react";

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

const Dashboard = () => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="p-3 space-y-5">
      <div className="flex w-full justify-between">
        <select className="select select-bordered select-sm w-full max-w-[130px] rounded-3xl">
          <option disabled selected>
            Small
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <select className="select select-bordered select-sm w-full max-w-[130px] rounded-3xl">
          <option disabled selected>
            Small
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <select className="select select-bordered select-sm w-full max-w-[130px] rounded-3xl">
          <option disabled selected>
            Export
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <select className="select select-bordered select-sm w-full max-w-[200px] rounded-3xl">
          <option disabled selected>
            Product
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <select className="select select-bordered select-sm w-full max-w-[350px] rounded-3xl">
          <option disabled selected>
            Search Product
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>

        <button className="btn btn-sm btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button className="btn btn-sm text-white bg-blue-800 hover:bg-blue-900 ">
          Search
          <CiSearch />
        </button>
        <button className="btn btn-sm text-white bg-blue-800 hover:bg-blue-900">
          Saved
          <FaFolderOpen />
        </button>
      </div>
      {/* ---------------------------------TABS------------------------------  */}
      {/* <div className="flex justify-between">
        <div role="tablist" className="tabs tabs-lifted">
          <a role="tab" className="tab">
            Tab 1
          </a>
          <a role="tab" className="tab tab-active">
            Tab 2
          </a>
          <a role="tab" className="tab">
            Tab 3
          </a>
        </div>
        <div className="flex justify-around items-center">
          <div className=" btn-sm text-center items-center">
            <FaFileCircleMinus />
          </div>
          <div className=" btn-sm">
            <CiStar />
          </div>
          <div className=" btn-sm">
            <FaSave />
          </div>

          <button className="btn btn-sm">Magic Search</button>
          <button className="btn btn-sm">Apply Filter</button>
        </div>
      </div> */}
      {/* <TabsComponent /> */}
      {/* -----------------------------BREADCRUMB-------------------------------- */}
      <div className="breadcrumbs text-xs">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      {/* <Modal/> */}

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
      {/* -------------------------------------------BUTTONS--------------------------------- */}
      <div className="flex gap-5">
        <button className="btn btn-outline btn-sm btn-info">Volume</button>
        <button className="btn btn-outline btn-sm btn-info">Value</button>
        <button className="btn btn-outline btn-sm btn-info">Avg Price</button>
        <button className="btn btn-outline btn-sm btn-info">Data Record</button>
        <button className="btn btn-outline btn-sm btn-info">
          Save to Dashboard
        </button>
      </div>
      {/* -------------------------------------------TITLE CARDS--------------------------------- */}
      <div className="flex gap-3 ">
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Exporters:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Exporters:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Exporters:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl rounded-lg">
          <div className="card-body p-2">
            <h6 className="card-title text-xs">Exporters:</h6>
            <p className="text-[#008000]">129</p>
          </div>
        </div>
      </div>
      {/* -------------------------------------------CARDS----------------------------------------- */}
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 w-96 shadow-xl rounded-lg"
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
                  <input type="text" className="grow" placeholder="Search" />
                  <FaChevronDown />
                </label>

                {/* -----------------------------------ACCORDIAN------------------------------- */}
                <Accordion />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 w-96 shadow-xl rounded-lg"
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
                  <input type="text" className="grow" placeholder="Search" />
                  <FaChevronDown />
                </label>

                {/* -----------------------------------ACCORDIAN------------------------------- */}
                <Accordion />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* -------------------------------------------TABLE----------------------------------------- */}
      <div>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
