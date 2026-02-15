/** @format */

"use client";

import React, { useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
  file: File;
}

interface MediaUploadStepProps {
  data: {
    images: UploadedImage[];
    primaryImage: string;
  };
  onChange: (data: { images: UploadedImage[]; primaryImage: string }) => void;
}

export const MediaUploadStep: React.FC<MediaUploadStepProps> = ({
  data,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: UploadedImage[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        url: URL.createObjectURL(file),
        file: file,
      }));

      onChange({
        ...data,
        images: [...data.images, ...newImages],
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const newImages: UploadedImage[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        url: URL.createObjectURL(file),
        file: file,
      }));

      onChange({
        ...data,
        images: [...data.images, ...newImages],
      });
    }
  };

  const removeImage = (id: string) => {
    onChange({
      ...data,
      images: data.images.filter((img) => img.id !== id),
      primaryImage: data.primaryImage === id ? "" : data.primaryImage,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Media Upload
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Add your product&apos;s photo to see how you can upload up to 8 photos
          max
        </p>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-sm font-medium text-gray-700 mb-1">
              Drag photos or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <p className="text-xs text-gray-500">
              Only support JPG, JPEG, PNG and PDF format
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Uploaded Images */}
      {data.images.length > 0 && (
        <div className="space-y-3">
          {data.images.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-white"
            >
              <div className="w-12 h-12 bg-pink-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {image.name}
                </p>
                <p className="text-xs text-gray-500">{image.size}</p>
              </div>
              <button
                onClick={() => removeImage(image.id)}
                className="text-blue-600 text-sm hover:underline"
              >
                Change
              </button>
              <button
                onClick={() => removeImage(image.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Primary Image Selector */}
      {data.images.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Primary Image
          </label>
          <select
            value={data.primaryImage}
            onChange={(e) =>
              onChange({ ...data, primaryImage: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
          >
            <option value="">Select</option>
            {data.images.map((image) => (
              <option key={image.id} value={image.id}>
                {image.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
