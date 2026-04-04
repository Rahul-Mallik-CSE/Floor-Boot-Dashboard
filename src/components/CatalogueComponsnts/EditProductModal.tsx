/** @format */

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ApiCatalogueProduct } from "@/types/AllTypes";
import { useUpdateProductMutation } from "@/redux/freatures/catalogueAPI";
import { toast } from "react-toastify";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ApiCatalogueProduct | null;
}

interface FormDataState {
  product_title: string;
  product_id: string;
  sub_category: string;
  regular_price: string;
  sale_price: string;
  stock_quantity: number;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  // Reset form when product changes
  useEffect(() => {
    setFormData(initialFormData);
    setPrimaryImage(null);
    setImagePreview(null);
  }, [initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock_quantity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setPrimaryImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };

  const removeImage = () => {
    setPrimaryImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    try {
      const submitData = new FormData();

      // Append text fields
      submitData.append("product_title", formData.product_title);
      submitData.append("product_id", formData.product_id);
      submitData.append("sub_category", formData.sub_category);
      submitData.append("regular_price", formData.regular_price);
      submitData.append("sale_price", formData.sale_price);
      submitData.append("stock_quantity", String(formData.stock_quantity));

      // Append image if selected
      if (primaryImage) {
        submitData.append("primary_image", primaryImage);
      }

      await updateProduct({
        id: product.id,
        data: submitData as any,
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

          {/* Primary Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Primary Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative w-full h-40 rounded-lg border border-gray-300 overflow-hidden bg-gray-100">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : product?.primary_image ? (
              <div className="relative w-full h-40 rounded-lg border border-gray-300 overflow-hidden bg-gray-100">
                <img
                  src={product.primary_image}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <span className="text-gray-500 text-sm">No image selected</span>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-2"
            >
              {imagePreview ? "Change Image" : "Select Image"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Regular Price (£)
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
                Sale Price (£)
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
