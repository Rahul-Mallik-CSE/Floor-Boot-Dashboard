/** @format */

"use client";

import React from "react";
import { Printer, Download } from "lucide-react";

export const OrderActionButtons: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log("Download order details");
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
};
