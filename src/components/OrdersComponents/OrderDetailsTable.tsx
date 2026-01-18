/** @format */

"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/AllTypes";

interface OrderDetailsTableProps {
  order: Order;
}

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  order,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
              By Updated
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Carrier
            </TableHead>
            <TableHead className="text-gray-600 font-semibold text-sm">
              Tracking No.
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
                {order.productId}
              </span>
            </TableCell>
            <TableCell className="text-gray-700 text-sm">
              {order.item}
            </TableCell>
            <TableCell className="text-gray-900 font-medium text-sm">
              ${order.orderTotal.toFixed(2)}
            </TableCell>
            <TableCell className="text-gray-600 text-sm">N/A</TableCell>
            <TableCell className="text-gray-700 text-sm">{order.qty}</TableCell>
            <TableCell>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">
                Acknowledged
              </span>
            </TableCell>
            <TableCell className="text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  👤
                </div>
                <span>Value</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span>Select</span>
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                  ▼
                </div>
              </div>
            </TableCell>
            <TableCell>
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder=""
              />
            </TableCell>
            <TableCell>
              <button className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Confirm shipment
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
