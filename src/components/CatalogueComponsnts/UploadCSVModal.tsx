/** @format */

"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadCSVModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (file: File) => Promise<void>;
  isLoading?: boolean;
}

const UploadCSVModal = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: UploadCSVModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid CSV file");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        alert("Please select a valid CSV file");
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    try {
      await onConfirm(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Upload Products CSV
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 pt-2">
            Upload a CSV file to import products in bulk. Make sure the CSV file
            has the correct format with all required columns.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />

            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <div className="text-sm font-medium text-gray-900">
                {selectedFile
                  ? selectedFile.name
                  : "Drag and drop your CSV file"}
              </div>
              <div className="text-xs text-gray-600">
                or click to select from your computer
              </div>
            </div>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Selected file:</span>{" "}
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Size: {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-6">
          <Button
            onClick={() => {
              onOpenChange(false);
              setSelectedFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || !selectedFile}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCSVModal;
