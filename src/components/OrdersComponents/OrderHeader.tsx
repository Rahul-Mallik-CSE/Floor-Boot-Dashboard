/** @format */

"use client";

import React from "react";
import { Order } from "@/types/AllTypes";

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Order Details
      </h1>
      <div className="space-y-2">
        <p className="text-gray-900 font-medium">PO# {order.purchaseOrder}</p>
        <p className="text-sm text-gray-600">Order date: {order.orderDate}</p>
        <p className="text-sm text-gray-600">
          Delivery date: {order.orderDate}
        </p>
        <button className="text-blue-600 text-sm hover:underline">
          Item Details
        </button>
      </div>
    </div>
  );
};
