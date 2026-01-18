/** @format */

"use client";

import React from "react";
import { Package, ChevronRight } from "lucide-react";

export const OrdersManagementCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
          <Package className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            View all your orders, manage your orders or proceed to deliver...
          </p>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
