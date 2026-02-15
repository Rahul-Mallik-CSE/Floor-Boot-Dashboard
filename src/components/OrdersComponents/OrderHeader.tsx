/** @format */

"use client";

import React from "react";
import { OrderItem } from "@/types/orders";

interface OrderHeaderProps {
  order: OrderItem;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Order Details
      </h1>
      <div className="space-y-2">
        <p className="text-gray-900 font-medium">Order ID: #{order.id}</p>
        <p className="text-sm text-gray-600">
          Order date: {formatDate(order.created_at)}
        </p>
        <p className="text-sm text-gray-600">
          Delivery date:{" "}
          {order.delivery_date
            ? formatDate(order.delivery_date)
            : "Not specified"}
        </p>
        <button className="text-blue-600 text-sm hover:underline">
          Item Details
        </button>
      </div>
    </div>
  );
};
