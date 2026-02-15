/** @format */

"use client";

import React, { useState } from "react";

interface SpecificationsData {
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
}

interface SpecificationsStepProps {
  data: SpecificationsData;
  onChange: (data: SpecificationsData) => void;
}

export const SpecificationsStep: React.FC<SpecificationsStepProps> = ({
  data,
  onChange,
}) => {
  const [colorInput, setColorInput] = useState("");

  const handleChange = <K extends keyof SpecificationsData>(
    field: K,
    value: SpecificationsData[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addColor = (color: string) => {
    if (color && !data.availableColors.includes(color)) {
      handleChange("availableColors", [...data.availableColors, color]);
    }
    setColorInput("");
  };

  const removeColor = (colorToRemove: string) => {
    handleChange(
      "availableColors",
      data.availableColors.filter((c) => c !== colorToRemove),
    );
  };

  return (
    <div className="space-y-6">
      {/* Item Dimensions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Item Dimensions (Inches)*
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Length</label>
            <div className="relative">
              <input
                type="number"
                value={data.length}
                onChange={(e) => handleChange("length", e.target.value)}
                placeholder="32"
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                inch
              </span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Width</label>
            <div className="relative">
              <input
                type="number"
                value={data.width}
                onChange={(e) => handleChange("width", e.target.value)}
                placeholder="24"
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                inch
              </span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Thickness
            </label>
            <div className="relative">
              <input
                type="number"
                value={data.thickness}
                onChange={(e) => handleChange("thickness", e.target.value)}
                placeholder="20"
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                mm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Weight*
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            placeholder="40 KG"
            className="w-full px-4 py-2.5 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
          <select className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 border border-gray-300 rounded text-sm bg-white">
            <option>Per box</option>
            <option>Per unit</option>
          </select>
        </div>
      </div>

      {/* Installation Method */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Installation Method*
        </label>
        <select
          value={data.installationMethod}
          onChange={(e) => handleChange("installationMethod", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
        >
          <option value="">CMLK</option>
          <option value="glue">Glue Down</option>
          <option value="click">Click Lock</option>
          <option value="nail">Nail Down</option>
        </select>
      </div>

      {/* Coverage per Pack */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Coverage per Pack*
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.coveragePerPack}
            onChange={(e) => handleChange("coveragePerPack", e.target.value)}
            placeholder="40"
            className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
          <select className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 border border-gray-300 rounded text-sm bg-white">
            <option>sq ft</option>
            <option>sq m</option>
          </select>
        </div>
      </div>

      {/* Categorized Details */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Categorized Details: Carpet
          </h3>
          <span className="text-xs text-gray-500">
            Additional details is required
          </span>
        </div>

        <div className="space-y-4">
          {/* Edge Profile */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Edge Profile
            </label>
            <input
              type="text"
              value={data.edgeProfile}
              onChange={(e) => handleChange("edgeProfile", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Pile Height */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Pile Height
            </label>
            <input
              type="text"
              value={data.pileHeight}
              onChange={(e) => handleChange("pileHeight", e.target.value)}
              placeholder="32 mm"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Materials
            </label>
            <input
              type="text"
              value={data.materials}
              onChange={(e) => handleChange("materials", e.target.value)}
              placeholder="e.g. Nylon, polyester"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Format</label>
            <select
              value={data.format}
              onChange={(e) => handleChange("format", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="">Tiles</option>
              <option value="rolls">Rolls</option>
              <option value="planks">Planks</option>
            </select>
          </div>

          {/* Uniformity Required */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="uniformity"
              checked={data.uniformityRequired}
              onChange={(e) =>
                handleChange("uniformityRequired", e.target.checked)
              }
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="uniformity" className="text-sm text-gray-700">
              Uniformity required*
            </label>
          </div>

          {/* Is calculated */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCalculate"
              checked={data.isCalculate}
              onChange={(e) => handleChange("isCalculate", e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="isCalculate" className="text-sm text-gray-700">
              Is Calculated?*
            </label>
          </div>
        </div>
      </div>

      {/* Additional Details Toggle */}
      <div className="flex items-center justify-between py-3 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-900">
          Additional Details
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.additionalDetails}
            onChange={(e) =>
              handleChange("additionalDetails", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
        </label>
      </div>

      {/* Available Colors */}
      {data.additionalDetails && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Available Colors
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.availableColors.map((color, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm"
              >
                {color}
                <button
                  onClick={() => removeColor(color)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addColor(colorInput);
                }
              }}
              placeholder="Add color..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={() => addColor(colorInput)}
              className="px-4 py-2 bg-lime-400 text-black rounded-lg hover:bg-lime-500 text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Pattern Type */}
      {data.additionalDetails && (
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Pattern Type
          </label>
          <input
            type="text"
            value={data.patternType}
            onChange={(e) => handleChange("patternType", e.target.value)}
            placeholder="Stripe Pattern"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      )}

      {/* Stock Quantity */}
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Stock Quantity
        </label>
        <div className="relative">
          <input
            type="number"
            value={data.stockQuantity}
            onChange={(e) => handleChange("stockQuantity", e.target.value)}
            placeholder="40"
            className="w-full px-4 py-2.5 pr-16 border border-gray-300 rounded-lg text-sm"
          />
          <select className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 border border-gray-300 rounded text-sm bg-white">
            <option>box</option>
            <option>unit</option>
          </select>
        </div>
      </div>
    </div>
  );
};
