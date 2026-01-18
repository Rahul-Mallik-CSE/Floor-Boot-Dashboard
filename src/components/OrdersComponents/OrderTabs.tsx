/** @format */

"use client";

import React from "react";
import { OrderStatus } from "@/types/AllTypes";

interface OrderTabsProps {
  activeTab: "all" | OrderStatus;
  onTabChange: (tab: "all" | OrderStatus) => void;
  counts: {
    all: number;
    shipped: number;
    unshipped: number;
    cancelled: number;
  };
}

export const OrderTabs: React.FC<OrderTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    { id: "all" as const, label: "All Orders", count: counts.all },
    { id: "shipped" as const, label: "Shipped", count: counts.shipped },
    { id: "unshipped" as const, label: "Unshipped", count: counts.unshipped },
    { id: "cancelled" as const, label: "Cancelled", count: counts.cancelled },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 md:px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {tab.label}
          <span
            className={`ml-2 ${
              activeTab === tab.id ? "text-indigo-200" : "text-gray-500"
            }`}
          >
            ({tab.count})
          </span>
        </button>
      ))}
    </div>
  );
};
