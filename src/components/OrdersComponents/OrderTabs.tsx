/** @format */

"use client";

import React from "react";

type TabType = "all" | "shipped" | "unshipped" | "cancelled" | "delivered";

interface OrderTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    all: number;
    shipped: number;
    unshipped: number;
    cancelled: number;
    delivered: number;
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
    { id: "delivered" as const, label: "Delivered", count: counts.delivered },
    { id: "cancelled" as const, label: "Cancelled", count: counts.cancelled },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`cursor-pointer px-4 md:px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
