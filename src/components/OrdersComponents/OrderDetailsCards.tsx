/** @format */

"use client";

import React from "react";
import { Order } from "@/types/AllTypes";

interface OrderDetailsCardsProps {
  order: Order;
}

export const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({
  order,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
      {/* Customer Name */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Customer Name
        </h3>
        <p className="text-gray-700 mb-2">{order.customer}</p>
        <button className="text-blue-600 text-sm hover:underline">
          Send Email
        </button>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Shipping Address
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Street 7, Harmonia Path
          <br />
          Spring TX, 77388, USA
          <br />
          8325906292
        </p>
      </div>

      {/* Price Details */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Price Details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ${order.orderTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">$1.45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">$0</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                ${(order.orderTotal + 1.45).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
