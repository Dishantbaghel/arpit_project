import React, { useState } from "react";
import { RiArrowUpSFill } from "react-icons/ri";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left px-1 py-1 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full text-left flex justify-start gap-1 items-center">
          <svg
            className={`w-4 h-4 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {/* <span className="font-semibold text-xs">{title}</span> */}
          <span className="font-semibold text-xs">
            2016(1,077)<span className="text-[#008000]">($ 37,218,560)</span>
          </span>
          <span className="font-semibold text-xs flex ml-2">
            46.52% <RiArrowUpSFill className="text-[#008000] text-lg" />
          </span>
        </div>
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-xs rounded-sm"
        />
      </button>
      {isOpen && <div className="px-4 ml-5 py-1">{children}</div>}
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="max-w-lg mx-auto mt-1 border border-gray-300 rounded-md max-h-24 overflow-auto">
      <AccordionItem title="2016(1,077)($ 37,218,560)">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between mb-1">
            <span className="font-semibold text-[10px]">
              Jan <span className="text-blue-900">(70)</span>
              <span className="text-[#008000]">($ 37,218,560)</span>
            </span>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs rounded-sm"
            />
          </div>
        ))}
      </AccordionItem>
      <AccordionItem title="Section 2">
      {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between mb-1">
            <span className="font-semibold text-[10px]">
              Jan <span className="text-blue-900">(70)</span>
              <span className="text-[#008000]">($ 37,218,560)</span>
            </span>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs rounded-sm"
            />
          </div>
        ))}
      </AccordionItem>
      <AccordionItem title="Section 4">
      {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between mb-1">
            <span className="font-semibold text-[10px]">
              Jan <span className="text-blue-900">(70)</span>
              <span className="text-[#008000]">($ 37,218,560)</span>
            </span>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-xs rounded-sm"
            />
          </div>
        ))}
      </AccordionItem>
      <AccordionItem title="Section 5">
        <p>This is the content for section 3.</p>
      </AccordionItem>
      <AccordionItem title="Section 6">
        <p>This is the content for section 3.</p>
      </AccordionItem>
      <AccordionItem title="Section 7">
        <p>This is the content for section 3.</p>
      </AccordionItem>
      <AccordionItem title="Section 8">
        <p>This is the content for section 3.</p>
      </AccordionItem>
    </div>
  );
};

export default Accordion;
