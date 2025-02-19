"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-theme_color text-white py-1">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <Link href="/">
          Chemys
        </Link>
      </div>

      <div className="navbar-center flex gap-12">
        <div className="navbar-center hidden md:flex lg:flex">
          <ul className="flex gap-10 px-1">
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={`nav-link ${
                  pathname === "/dashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative group">
              <Link href="" className={`nav-link`}>
                Resources
              </Link>
              <ul className="absolute z-10 left-0 mt-1 w-40 bg-blue-900 border rounded-md shadow-xl hidden group-hover:block">
                <li>
                  <Link
                    href="/countries"
                    className="block px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Countries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/indian-ports"
                    className="block px-4 py-2 hover:bg-blue-800"
                  >
                    Indian Ports
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hs-codes"
                    className="block px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    HS Codes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/converter"
                    // className={`nav-link ${
                    //   pathname === "/converter" ? "active" : ""
                    // }`}
                    className="block px-4 py-2 hover:bg-blue-800 rounded-md"
                  >
                    Converter
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                href="/about-us"
                className={`nav-link ${
                  pathname === "/about-us" ? "active" : ""
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={`nav-link ${
                  pathname === "/contact-us" ? "active" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-center flex gap-5 text-xl">
          <span>EUR 1</span>
          <span>USD 1.01</span>
        </div>
      </div>

      <div className="navbar-end flex gap-8 ">
        {/* =========================THEME BUTTON============================= */}
        {/* <div>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              data-toggle-theme="dark,light"
              data-act-class="ACTIVECLASS"
            />

            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div> */}

        <Link href="/admin-dashboard" className="btn btn-sm">
          Admin
        </Link>
        <Link href="/login" className="btn btn-sm">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
