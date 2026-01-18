/** @format */

"use client";

import React from "react";
import { Search } from "lucide-react";

interface CatalogueSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CatalogueSearchBar: React.FC<CatalogueSearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search inventory by name or ID",
}) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
      />
    </div>
  );
};
