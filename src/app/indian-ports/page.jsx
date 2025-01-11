import IndianPortTable from "@/components/IndianPortTable";
import React from "react";

export default function page() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-5">
        MAJOR PORTS, AIRPORTS, ICD And CFS OF INDIA
      </h1>
      <div className="grid grid-cols-2 gap-10 p-10">
        <IndianPortTable />
        <IndianPortTable />
      </div>
    </div>
  );
}
