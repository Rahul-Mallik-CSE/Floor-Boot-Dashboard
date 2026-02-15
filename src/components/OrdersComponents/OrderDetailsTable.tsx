/** @format */

"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderItem, OrderStatus, CarrierOption } from "@/types/orders";
import { useUpdateOrderMutation } from "@/redux/freatures/ordersAPI";
import { toast } from "react-toastify";

interface OrderDetailsTableProps {
  order: OrderItem;
}

const CARRIER_OPTIONS: CarrierOption[] = [
  "Standard Ground",
  "Expedited",
  "Overnight",
  "Two-Day Delivery",
  "Free Shipping",
  "Express",
];

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "placed", label: "Placed" },
  { value: "in_transit", label: "In Transit" },
  { value: "cancelled", label: "Cancelled" },
];

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  order,
}) => {
  const [quantity, setQuantity] = useState(order.quantity);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [carrier, setCarrier] = useState<string>(
    order.ship_method || CARRIER_OPTIONS[0],
  );
  const [trackingNo, setTrackingNo] = useState(order.tracking_no || "");
  const [deliveryFee, setDeliveryFee] = useState(
    parseFloat(order.delivery_fee),
  );

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const getStatusStyles = (status: OrderStatus) => {
    switch (status) {
      case "in_transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "placed":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "in_transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      case "placed":
        return "Placed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const handleConfirmShipment = async () => {
    try {
      const result = await updateOrder({
        orderId: order.id,
        data: {
          quantity,
          ship_method: carrier,
          status: status,
          carrier: trackingNo,
          tracking_no: trackingNo,
          delivery_fee: deliveryFee,
          is_shiped: status !== "cancelled",
        },
      }).unwrap();

      if (result.success) {
        toast.success(result.message || "Shipment confirmed successfully!");
      }
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : "Failed to confirm shipment";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-600 font-semibold text-sm py-4 pl-6">
                Product ID
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Item
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Order Total
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Ship Method
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Req Qty
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Status
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Qty Updated
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Carrier
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Tracking No.
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Delivery Fee
              </TableHead>
              <TableHead className="text-gray-600 font-semibold text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-gray-100">
              <TableCell className="py-4 pl-6">
                <span className="text-blue-600 text-sm hover:underline cursor-pointer">
                  {order.product.product_id}
                </span>
              </TableCell>
              <TableCell className="text-gray-700 text-sm">
                <div className="max-w-40 truncate">
                  {order.product.product_title}
                </div>
              </TableCell>
              <TableCell className="text-gray-900 font-medium text-sm">
                ${parseFloat(order.order_total).toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {order.ship_method || "N/A"}
              </TableCell>
              <TableCell className="text-gray-700 text-sm">
                {order.quantity}
              </TableCell>
              <TableCell>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as OrderStatus)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
                          status,
                        )}`}
                      >
                        {formatStatusLabel(status)}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </TableCell>
              <TableCell>
                <Select value={carrier} onValueChange={setCarrier}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CARRIER_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={trackingNo}
                  onChange={(e) => setTrackingNo(e.target.value)}
                  className="w-32 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter tracking #"
                />
              </TableCell>
              <TableCell>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={deliveryFee}
                  onChange={(e) =>
                    setDeliveryFee(parseFloat(e.target.value) || 0)
                  }
                  className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </TableCell>
              <TableCell>
                <button
                  onClick={handleConfirmShipment}
                  disabled={isLoading}
                  className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? "Confirming..." : "Confirm shipment"}
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
