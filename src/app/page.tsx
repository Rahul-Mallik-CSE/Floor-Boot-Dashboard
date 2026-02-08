/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { OrderTabs } from "@/components/OrdersComponents/OrderTabs";
import { OrdersTable } from "@/components/OrdersComponents/OrdersTable";
import { OrderSearchBar } from "@/components/OrdersComponents/OrderSearchBar";
import { useGetOrdersQuery } from "@/redux/freatures/ordersAPI";
import type { OrdersQueryParams } from "@/types/orders";

type TabType = "all" | "shipped" | "unshipped" | "cancelled" | "delivered";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build query parameters
  const queryParams: OrdersQueryParams = {
    page: currentPage,
  };

  if (activeTab !== "all") {
    queryParams.query = activeTab;
  }

  if (debouncedSearch) {
    queryParams.search = debouncedSearch;
  }

  // Fetch orders
  const { data, isLoading, isFetching, error } = useGetOrdersQuery(queryParams);

  // Calculate counts for tabs
  const counts = {
    all: data?.meta.total_items || 0,
    shipped: 0, // These would need separate API calls or be provided by backend
    unshipped: 0,
    cancelled: 0,
    delivered: 0,
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Page Title */}
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6">
          Orders
        </h1>

        {/* Search Bar */}
        <div className="mb-4">
          <OrderSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search orders by ID or customer name"
          />
        </div>

        {/* Tabs */}
        <OrderTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        />

        {/* Orders Table */}
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Failed to load orders. Please try again.
          </div>
        ) : (
          <OrdersTable
            data={data?.data.orders || []}
            isLoading={isLoading || isFetching}
            meta={data?.meta}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
