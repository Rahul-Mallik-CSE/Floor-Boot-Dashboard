/** @format */

"use client";

import React from "react";

interface ReviewPublishStepProps {
  data: any;
}

export const ReviewPublishStep: React.FC<ReviewPublishStepProps> = ({
  data,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Review & Publish</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        {/* Item Details */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Item Details (Required)
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Product Title:</span>
              <span className="ml-2 text-gray-900">
                {data.itemDetails.productTitle || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Brand:</span>
              <span className="ml-2 text-gray-900">
                {data.itemDetails.brand || "—"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Description:</span>
              <p className="text-gray-900 mt-1">
                {data.itemDetails.description || "—"}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Main Category:</span>
              <span className="ml-2 text-gray-900">
                {data.itemDetails.mainCategory || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Sub-category:</span>
              <span className="ml-2 text-gray-900">
                {data.itemDetails.subCategory || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Pricing & Inventory
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Regular Price:</span>
              <span className="ml-2 text-gray-900">
                ${data.pricing.regularPrice || "0"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Sale Price:</span>
              <span className="ml-2 text-gray-900">
                ${data.pricing.salePrice || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Product ID:</span>
              <span className="ml-2 text-gray-900">
                {data.pricing.productId || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Pack Coverage:</span>
              <span className="ml-2 text-gray-900">
                {data.pricing.packCoverage || "—"} sq ft
              </span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Specifications
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-gray-600">Dimensions:</span>
              <span className="ml-2 text-gray-900">
                {data.specifications.length} x {data.specifications.width} x{" "}
                {data.specifications.thickness}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Weight:</span>
              <span className="ml-2 text-gray-900">
                {data.specifications.weight || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Installation Method:</span>
              <span className="ml-2 text-gray-900">
                {data.specifications.installationMethod || "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Stock Quantity:</span>
              <span className="ml-2 text-gray-900">
                {data.specifications.stockQuantity || "—"} box
              </span>
            </div>
          </div>
        </div>

        {/* Media */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Product Images
          </h3>
          <div className="text-sm text-gray-600">
            {data.media.images.length} image(s) uploaded
          </div>
        </div>
      </div>
    </div>
  );
};
