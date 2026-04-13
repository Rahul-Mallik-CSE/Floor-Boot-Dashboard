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
import { OrderItem, OrderStatus } from "@/types/orders";
import { useUpdateOrderMutation } from "@/redux/freatures/ordersAPI";
import { toast } from "react-toastify";

interface OrderDetailsTableProps {
  order: OrderItem;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "placed", label: "Placed" },
  { value: "in_transit", label: "In Transit" },

  { value: "cancelled", label: "Cancelled" },
];

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  order,
}) => {
  const items = order.items || [];
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [shipMethod, setShipMethod] = useState<string>(order.ship_method || "");
  const [carrier, setCarrier] = useState<string>(order.carrier || "");
  const [trackingNo, setTrackingNo] = useState(order.tracking_no || "");
  const [deliveryFee, setDeliveryFee] = useState(
    parseFloat(order.delivery_fee || "0"),
  );

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const isDelivered = status === "delivered";

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
          ship_method: shipMethod,
          status,
          carrier,
          tracking_no: trackingNo,
          delivery_fee: deliveryFee,
          is_shiped: status === "in_transit" || status === "delivered",
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
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="text-gray-600 font-semibold text-sm py-4 pl-6">
                  Product
                </TableHead>
                <TableHead className="text-gray-600 font-semibold text-sm">
                  Product ID
                </TableHead>
                <TableHead className="text-gray-600 font-semibold text-sm">
                  Qty
                </TableHead>
                <TableHead className="text-gray-600 font-semibold text-sm">
                  Unit Price
                </TableHead>
                <TableHead className="text-gray-600 font-semibold text-sm">
                  Tax
                </TableHead>
                <TableHead className="text-gray-600 font-semibold text-sm">
                  Line Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    No products found for this order.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => {
                  const product = item.product;
                  return (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="py-4 pl-6 text-gray-700 text-sm">
                        <div className="max-w-56 truncate">
                          {product?.product_title || "Unknown Product"}
                        </div>
                      </TableCell>
                      <TableCell className="text-blue-600 text-sm">
                        {product?.product_id || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-700 text-sm">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium text-sm">
                        £{Number(item.price || 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-700 text-sm">
                        £{Number(item.tax || 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-900 font-medium text-sm">
                        £{Number(item.total || 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Update Order
            </h3>
            <p className="text-sm text-gray-500">
              Update shipment details without changing product quantities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as OrderStatus)}
              disabled={isDelivered}
            >
              <SelectTrigger
                className={isDelivered ? "opacity-50 cursor-not-allowed" : ""}
              >
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ship Method
            </label>
            <input
              type="text"
              value={shipMethod}
              onChange={(e) => setShipMethod(e.target.value)}
              disabled={isDelivered}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDelivered ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
              placeholder="Enter ship method"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carrier
            </label>
            <input
              type="text"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              disabled={isDelivered}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDelivered ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
              placeholder="Enter carrier"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tracking No.
            </label>
            <input
              type="text"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              disabled={isDelivered}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDelivered ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
              placeholder="Enter tracking #"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Fee
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
              disabled={isDelivered}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDelivered ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleConfirmShipment}
            disabled={isLoading || isDelivered}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading
              ? "Confirming..."
              : isDelivered
                ? "Delivered"
                : "Confirm shipment"}
          </button>
        </div>
      </div>
    </div>
  );
};
