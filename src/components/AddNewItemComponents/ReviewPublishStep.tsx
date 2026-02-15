/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
  file: File;
}

interface ReviewPublishStepProps {
  data: {
    itemDetails: {
      productTitle: string;
      brand: string;
      description: string;
      mainCategory: string;
      subCategory: string;
      tags: string[];
    };
    media: {
      images: UploadedImage[];
      primaryImage: string;
    };
    pricing: {
      regularPrice: string;
      salePrice: string;
      productId: string;
      packCoverage: string;
      taxPrice: string;
    };
    specifications: {
      length: string;
      width: string;
      thickness: string;
      weight: string;
      installationMethod: string;
      coveragePerPack: string;
      edgeProfile: string;
      pileHeight: string;
      materials: string;
      format: string;
      uniformityRequired: boolean;
      isCalculate: boolean;
      additionalDetails: boolean;
      availableColors: string[];
      patternType: string;
      stockQuantity: string;
    };
  };
}

export const ReviewPublishStep: React.FC<ReviewPublishStepProps> = ({
  data,
}) => {
  const primaryImage = data.media.images.find(
    (img) => img.id === data.media.primaryImage,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Review & Publish
        </h2>
        <p className="text-sm text-gray-500">
          Please review all the information before publishing your product
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Item Details */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Item Details
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Product Title</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.itemDetails.productTitle || "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Brand/Manufacturer
                </span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.itemDetails.brand || "—"}
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Description</span>
              <p className="text-sm text-gray-900 mt-1">
                {data.itemDetails.description || "—"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Main Category</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.itemDetails.mainCategory || "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Sub-category</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.itemDetails.subCategory || "—"}
                </p>
              </div>
            </div>

            {data.itemDetails.tags.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.itemDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-lime-400 text-black rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Product Images
          </h3>
          {data.media.images.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.media.images.map((image) => (
                  <div key={image.id} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={image.url}
                        alt={image.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {image.id === data.media.primaryImage && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {image.name}
                    </p>
                    {image.id === data.media.primaryImage && (
                      <p className="text-xs text-green-600 font-medium">
                        Primary Image
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {data.media.images.length} image(s) uploaded
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No images uploaded</p>
          )}
        </div>

        {/* Pricing & Inventory */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Pricing & Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Regular Price</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                ${data.pricing.regularPrice || "0.00"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Sale Price</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {data.pricing.salePrice ? `$${data.pricing.salePrice}` : "—"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Tax Price</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {data.pricing.taxPrice ? `$${data.pricing.taxPrice}` : "$0.00"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Product ID</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {data.pricing.productId || "—"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Pack Coverage</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {data.pricing.packCoverage || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Specifications
          </h3>
          <div className="space-y-4">
            {/* Dimensions */}
            <div>
              <span className="text-sm text-gray-500 mb-2 block">
                Dimensions
              </span>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Length</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.specifications.length || "—"} inch
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Width</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.specifications.width || "—"} inch
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Thickness</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.specifications.thickness || "—"} mm
                  </p>
                </div>
              </div>
            </div>

            {/* Other specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Weight</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.specifications.weight || "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Installation Method
                </span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.specifications.installationMethod || "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Coverage per Pack</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.specifications.coveragePerPack || "—"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Stock Quantity</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {data.specifications.stockQuantity || "—"}
                </p>
              </div>
              {data.specifications.pileHeight && (
                <div>
                  <span className="text-sm text-gray-500">Pile Height</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.specifications.pileHeight}
                  </p>
                </div>
              )}
              {data.specifications.materials && (
                <div>
                  <span className="text-sm text-gray-500">Materials</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.specifications.materials}
                  </p>
                </div>
              )}
              {data.specifications.format && (
                <div>
                  <span className="text-sm text-gray-500">Format</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.specifications.format}
                  </p>
                </div>
              )}
              {data.specifications.edgeProfile && (
                <div>
                  <span className="text-sm text-gray-500">Edge Profile</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.specifications.edgeProfile}
                  </p>
                </div>
              )}
              {data.specifications.patternType && (
                <div>
                  <span className="text-sm text-gray-500">Pattern Type</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {data.specifications.patternType}
                  </p>
                </div>
              )}
            </div>

            {/* Available Colors */}
            {data.specifications.availableColors.length > 0 && (
              <div>
                <span className="text-sm text-gray-500">Available Colors</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.specifications.availableColors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded border ${
                    data.specifications.uniformityRequired
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-gray-300"
                  } flex items-center justify-center`}
                >
                  {data.specifications.uniformityRequired && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700">Underlay Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded border ${
                    data.specifications.isCalculate
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-gray-300"
                  } flex items-center justify-center`}
                >
                  {data.specifications.isCalculate && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700">Is Calculated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
