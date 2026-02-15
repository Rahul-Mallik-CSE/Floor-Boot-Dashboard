/** @format */

"use client";

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { ApiCatalogueProduct, TableColumn } from "@/types/AllTypes";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { getFullImageUrl } from "@/lib/utils";

interface CatalogueTableProps {
  data: ApiCatalogueProduct[];
  onEdit?: (product: ApiCatalogueProduct) => void;
  onDelete?: (product: ApiCatalogueProduct) => void;
}

export const CatalogueTable: React.FC<CatalogueTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn[] = [
    { key: "slNo", label: "Sl No.", width: "60px" },
    { key: "items", label: "Items", width: "300px" },
    { key: "productId", label: "Product ID", width: "180px" },
    { key: "category", label: "Category", width: "120px" },
    { key: "subCategory", label: "Sub-category", width: "120px" },
    { key: "price", label: "Price (USD)", width: "120px" },
    { key: "inStockQty", label: "In Stock Qty", width: "120px" },
    { key: "action", label: "Action", width: "100px" },
  ];

  // Transform API data to include id as string for CustomTable
  const transformedData = data.map((product, index) => ({
    ...product,
    id: String(product.id),
    slNo: index + 1,
  }));

  const renderCell = (
    item: (typeof transformedData)[number],
    columnKey: string,
  ) => {
    switch (columnKey) {
      case "slNo":
        return <span className="text-gray-700 font-medium">{item.slNo}</span>;

      case "items":
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded shrink-0 overflow-hidden">
              {item.primary_image ? (
                <Image
                  src={getFullImageUrl(item.primary_image)}
                  alt={item.product_title}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            <span className="text-gray-700 text-sm line-clamp-2">
              {item.product_title}
            </span>
          </div>
        );

      case "productId":
        return <span className="text-gray-600 text-sm">{item.product_id}</span>;

      case "category":
        return (
          <span className="text-gray-600 text-sm">
            Category {item.main_category}
          </span>
        );

      case "subCategory":
        return (
          <span className="text-gray-600 text-sm">{item.sub_category}</span>
        );

      case "price":
        const displayPrice =
          parseFloat(item.sale_price) > 0
            ? parseFloat(item.sale_price)
            : parseFloat(item.regular_price);

        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">
              ${displayPrice.toFixed(2)}
            </span>
            {parseFloat(item.sale_price) > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${parseFloat(item.regular_price).toFixed(2)}
              </span>
            )}
          </div>
        );

      case "inStockQty":
        return (
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${item.stock_quantity === 0 ? "text-red-500" : "text-gray-700"}`}
            >
              {item.stock_quantity === 0 ? "Out of Stock" : item.stock_quantity}
            </span>
          </div>
        );

      case "action":
        const originalProduct: ApiCatalogueProduct = {
          ...item,
          id: Number(item.id),
        };
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit?.(originalProduct)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete?.(originalProduct)}
              className="p-1.5 hover:bg-red-50 rounded transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CustomTable
      columns={columns}
      data={transformedData}
      itemsPerPage={15}
      renderCell={renderCell}
    />
  );
};
