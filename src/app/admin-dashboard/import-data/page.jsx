"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";
import axiosInstance from "@/utils/axiosInstance";

export default function ImportData() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loadingExport, setLoadingExport] = useState(false); // Export upload loading state
  const [loadingImport, setLoadingImport] = useState(false); // Import upload loading state

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle Export File Upload
  const handleExportUpload = async () => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setLoadingExport(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const sessionId = localStorage.getItem("sessionId");

      const response = await axiosInstance.post(
        `/data/upload?type=export&session=${sessionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Export file uploaded successfully!");
      console.log("Response:", response.data);

      toast.success("Export file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading export file:", error);
      setUploadStatus("Export file upload failed.");
      toast.error("Export file upload failed.");
    } finally {
      setLoadingExport(false);
    }
  };

  // Handle Import File Upload
  const handleImportUpload = async () => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setLoadingImport(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/data/upload?type=import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Import file uploaded successfully!");
      console.log("Response:", response.data);

      toast.success("Import file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading import file:", error);
      setUploadStatus("Import file upload failed.");
      toast.error("Import file upload failed.");
    } finally {
      setLoadingImport(false);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-between gap-10 min-h-[calc(100vh-120px)]">
      {/* Export File Upload */}
      {loadingExport ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Upload Export File</h1>

          <div className="w-full">
            <label
              htmlFor="export-file-input"
              className="flex flex-col items-center p-8 justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={60} />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Excel files only (.xls, .xlsx, .csv)
                </p>
              </div>
              <input
                id="export-file-input"
                type="file"
                accept=".xls,.xlsx,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleExportUpload}
            disabled={loadingExport}
          >
            Upload Export File
          </button>
        </div>
      )}

      {/* Import File Upload */}
      {loadingImport ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6">Upload Import File</h1>

          <div className="w-full">
            <label
              htmlFor="import-file-input"
              className="flex flex-col items-center p-8 justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={60} />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Excel files only (.xls, .xlsx, .csv)
                </p>
              </div>
              <input
                id="import-file-input"
                type="file"
                accept=".xls,.xlsx,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleImportUpload}
            disabled={loadingImport}
          >
            Upload Import File
          </button>
        </div>
      )}
    </div>
  );
}
