import CurrencyConverter from "@/components/CurrencyConvertor";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}
