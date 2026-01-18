/** @format */

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const CatalogueFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {/* All Filter */}
      <button
        onClick={() => setActiveFilter("all")}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
          activeFilter === "all"
            ? "bg-lime-400 text-black hover:bg-lime-500"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        All
      </button>

      {/* By category dropdown */}
      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
        By category
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* By subcategory dropdown */}
      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
        By subcategory
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* In stock dropdown */}
      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
        In stock
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
