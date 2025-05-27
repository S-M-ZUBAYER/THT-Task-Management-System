import React, { useState, useCallback } from "react";
import SvgRollerLoader from "../svg/SvgRollerLoader";
import { Trash2 } from "lucide-react";
import icons from "@/constants/icons";

export default function DocumentUploader() {
  const [uploadState, setUploadState] = useState("idle");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    setUploadState("uploading");

    setTimeout(() => {
      setUploadState("uploaded");
    }, 2000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadState("idle");
  };

  const renderContent = () => {
    switch (uploadState) {
      case "idle":
        return (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer transition ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "text-gray-500 hover:border-blue-400"
            }`}
          >
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📤</div>
              <p>Drag and drop your documents here,</p>
              <p>or click to select files.</p>
            </div>
          </label>
        );
      case "uploading":
        return (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500">
            <div className="flex flex-col items-center space-y-4">
              <SvgRollerLoader size={100} strokeWidth={10} color="#004368" />
              <span className="text-gray-800 text-xl font-mono">
                Uploading...
              </span>
            </div>
          </div>
        );
      case "uploaded":
        return (
          <>
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer transition ${
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "text-gray-500 hover:border-blue-400"
              }`}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-3xl mb-2">📤</div>
              <p>Drag and drop your documents here,</p>
              <p>or click to select files.</p>
            </label>

            <div className="flex justify-between items-center mt-4 px-4 py-2 border rounded  bg-gray-100">
              <div className="flex items-center space-x-2">
                <img src={icons.Docx} alt="doc" className="w-8 " />
                <div>
                  <p className="text-sm font-medium">{file?.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file?.size || 0) / 1024} KB
                  </p>
                </div>
              </div>
              <div
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md p-6  space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upload Your Documents</h2>
      </div>
      <p className="text-sm text-gray-500">
        Supported formats: PDF, DOCX, XLSX, PNG, JPG.
      </p>

      {renderContent()}

      <div className="w-full justify-end flex">
        <div
          className={`w-[20%] flex justify-center items-center py-2 rounded mt-4 transition ${
            uploadState === "uploaded"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={uploadState !== "uploaded"}
        >
          Submit
        </div>
      </div>
    </div>
  );
}
