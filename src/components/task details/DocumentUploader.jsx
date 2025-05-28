import React, { useState, useCallback } from "react";
import UploadingView from "./UploadingView";
import UploadedView from "./UploadedView";

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
        return <UploadingView />;
      case "uploaded":
        return (
          <UploadedView
            file={file}
            handleRemove={handleRemove}
            dragActive={dragActive}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
          />
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
              ? "bg-[#004368] text-white hover:bg-[#003357] cursor-pointer"
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
