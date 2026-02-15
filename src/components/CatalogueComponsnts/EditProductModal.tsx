/** @format */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiCatalogueProduct } from "@/types/AllTypes";
import { useUpdateProductMutation } from "@/redux/freatures/catalogueAPI";
import { toast } from "react-toastify";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ApiCatalogueProduct | null;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const initialFormData = useMemo(
    () => ({
      product_title: product?.product_title || "",
      product_id: product?.product_id || "",
      sub_category: product?.sub_category || "",
      regular_price: product?.regular_price || "",
      sale_price: product?.sale_price || "",
      stock_quantity: product?.stock_quantity || 0,
    }),
    [product?.id],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const [formData, setFormData] = useState(initialFormData);

  // Reset form when product changes
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock_quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    try {
      await updateProduct({
        id: product.id,
        data: formData,
      }).unwrap();

      toast.success("Product updated successfully!");
      onClose();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Item Name
            </label>
            <Input
              name="product_title"
              value={formData.product_title}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Product ID
            </label>
            <Input
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              placeholder="Enter product ID"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Sub-category
            </label>
            <Input
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
              placeholder="Enter sub-category"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Regular Price (USD)
              </label>
              <Input
                name="regular_price"
                type="number"
                step="0.01"
                value={formData.regular_price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Sale Price (USD)
              </label>
              <Input
                name="sale_price"
                type="number"
                step="0.01"
                value={formData.sale_price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              In Stock Quantity
            </label>
            <Input
              name="stock_quantity"
              type="number"
              value={formData.stock_quantity}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
