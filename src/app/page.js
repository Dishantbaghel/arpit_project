"use client"
import React, { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Home() {
  useEffect(() => {
    themeChange(false); // Initialize theme-change without immediate theme change
  }, []);
  return <div>Home</div>;
}
