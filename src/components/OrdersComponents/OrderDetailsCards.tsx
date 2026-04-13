/** @format */

"use client";

import React from "react";
import { OrderItem } from "@/types/orders";

interface OrderDetailsCardsProps {
  order: OrderItem;
}

export const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({
  order,
}) => {
  const itemsTotal = (order.items || []).reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );
  const deliveryFee = parseFloat(order.delivery_fee || "0");
  const userFullName = order.user?.full_name || "Unknown Customer";
  const userEmail = order.user?.email || "N/A";
  const userPhone = order.user?.phone || "N/A";

  const total = itemsTotal + deliveryFee;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
      {/* Customer Name */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Customer Name
        </h3>
        <p className="text-gray-700 mb-2">{userFullName}</p>
        {userEmail !== "N/A" && (
          <a
            href={`mailto:${userEmail}`}
            className="text-blue-600 text-sm hover:underline"
          >
            Send Email
          </a>
        )}
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Shipping Address
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {order.address_line_i}
          {order.address_line_ii && <>, {order.address_line_ii}</>}
          <br />
          {order.suburb && <>{order.suburb}, </>}
          {order.city}
          <br />
          {order.state}, {order.postal_code}
          <br />
          {order.country_or_region}
          <br />
          {userPhone}
        </p>
      </div>

      {/* Price Details */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Price Details
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Items Total</span>
            <span className="text-gray-900">£{itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-900">£{deliveryFee.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">£{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Paid Amount</span>
              <span className="text-gray-900">
                £{parseFloat(order.paid_ammount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
