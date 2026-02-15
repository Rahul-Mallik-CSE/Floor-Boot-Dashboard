/** @format */

"use client";

import React from "react";

interface CatalogueFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CatalogueFilters: React.FC<CatalogueFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {/* All Filter */}
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          activeFilter === "all"
            ? "bg-lime-400 text-black hover:bg-lime-500"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        All
      </button>

      {/* In Stock Filter */}
      <button
        onClick={() => onFilterChange("in-stock")}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          activeFilter === "in-stock"
            ? "bg-lime-400 text-black hover:bg-lime-500"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        In Stock
      </button>

      {/* Out of Stock Filter */}
      <button
        onClick={() => onFilterChange("out-of-stock")}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          activeFilter === "out-of-stock"
            ? "bg-lime-400 text-black hover:bg-lime-500"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        Out of Stock
      </button>
    </div>
  );
};
