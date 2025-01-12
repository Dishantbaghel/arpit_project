"use client";
import CurrencyConverter from "@/components/CurrencyConverter";
import React from "react";

export default function Converter() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}
