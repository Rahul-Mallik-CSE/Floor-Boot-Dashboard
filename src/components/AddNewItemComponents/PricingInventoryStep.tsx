/** @format */

"use client";

import React from "react";

interface PricingInventoryStepProps {
  data: {
    regularPrice: string;
    salePrice: string;
    productId: string;
    packCoverage: string;
    taxPrice: string;
  };
  onChange: (data: {
    regularPrice: string;
    salePrice: string;
    productId: string;
    packCoverage: string;
    taxPrice: string;
  }) => void;
}

export const PricingInventoryStep: React.FC<PricingInventoryStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const generateProductId = () => {
    const prefix = "PROD";
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const productId = `${prefix}-${randomNum}`;
    handleChange("productId", productId);
  };

  return (
    <div className="space-y-5">
      {/* Regular Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Regular Price*
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            £
          </span>
          <input
            type="number"
            value={data.regularPrice}
            onChange={(e) => handleChange("regularPrice", e.target.value)}
            placeholder="30"
            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Sale Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Sale Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            £
          </span>
          <input
            type="number"
            value={data.salePrice}
            onChange={(e) => handleChange("salePrice", e.target.value)}
            placeholder="18.99"
            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Sale Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Tax Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            £
          </span>
          <input
            type="number"
            value={data.taxPrice}
            onChange={(e) => handleChange("taxPrice", e.target.value)}
            placeholder="18.99"
            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Product ID */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Product ID*
          <button
            type="button"
            onClick={generateProductId}
            className="ml-2 text-blue-600 text-xs hover:underline"
          >
            Auto generate
          </button>
        </label>
        <input
          type="text"
          value={data.productId}
          onChange={(e) => handleChange("productId", e.target.value)}
          placeholder="CBRT16593"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Pack Coverage */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Pack Coverage*
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.packCoverage}
            onChange={(e) => handleChange("packCoverage", e.target.value)}
            placeholder="32"
            className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
          <select className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none">
            <option value="sqft">sq ft</option>
            <option value="sqm">sq m</option>
          </select>
        </div>
      </div>
    </div>
  );
};
