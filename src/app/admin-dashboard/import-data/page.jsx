"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

      const response = await axios.post(
        "http://localhost:8080/data/upload?type=export",
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

      const response = await axios.post(
        "http://localhost:8080/data/upload?type=import",
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
    <div className="flex items-center justify-around gap-20 min-h-[calc(100vh-120px)] p-4">
      {/* Export File Upload */}
      {loadingExport ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6">Upload Export File</h1>

          <div className="w-full max-w-md">
            <label
              htmlFor="export-file-input"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 16l-4-4m0 0l-4 4m4-4v12M12 8c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2s-2 .895-2 2c0 1.105.895 2 2 2z"
                  ></path>
                </svg>
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
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6">Upload Import File</h1>

          <div className="w-full max-w-md">
            <label
              htmlFor="import-file-input"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 16l-4-4m0 0l-4 4m4-4v12M12 8c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2s-2 .895-2 2c0 1.105.895 2 2 2z"
                  ></path>
                </svg>
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
