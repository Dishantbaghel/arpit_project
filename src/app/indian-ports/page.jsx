import IndianPortTable from "@/components/IndianPortTable";
import React from "react";

export default function IndianPorts() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold my-5">
        MAJOR PORTS, AIRPORTS, ICD And CFS OF INDIA
      </h1>
      <div className="p-10">
        <IndianPortTable />
      </div>
    </div>
  );
}
