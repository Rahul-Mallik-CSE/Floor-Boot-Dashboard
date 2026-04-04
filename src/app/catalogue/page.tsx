/** @format */

"use client";

import React, { useState, useMemo } from "react";
import { CatalogueSearchBar } from "@/components/CatalogueComponsnts/CatalogueSearchBar";
import { CatalogueFilters } from "@/components/CatalogueComponsnts/CatalogueFilters";
import { CatalogueTable } from "@/components/CatalogueComponsnts/CatalogueTable";
import { EditProductModal } from "@/components/CatalogueComponsnts/EditProductModal";
import UploadCSVModal from "@/components/CatalogueComponsnts/UploadCSVModal";
import DeleteModal from "@/components/CommonComponents/DeleteModal";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  useGetCatalogueProductsQuery,
  useDeleteProductMutation,
  useUploadProductsCSVMutation,
} from "@/redux/freatures/catalogueAPI";
import { ApiCatalogueProduct } from "@/types/AllTypes";
import { toast } from "react-toastify";

const CataloguePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] =
    useState<ApiCatalogueProduct | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<ApiCatalogueProduct | null>(null);

  const { data, isLoading, error } = useGetCatalogueProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [uploadProductsCSV, { isLoading: isUploading }] =
    useUploadProductsCSVMutation();

  const filteredProducts = useMemo(() => {
    const products = data?.products || [];
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.product_title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.product_id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply stock filter
    if (activeFilter === "in-stock") {
      filtered = filtered.filter((product) => product.stock_quantity > 0);
    } else if (activeFilter === "out-of-stock") {
      filtered = filtered.filter((product) => product.stock_quantity === 0);
    }

    return filtered;
  }, [data?.products, searchQuery, activeFilter]);

  const handleEdit = (product: ApiCatalogueProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: ApiCatalogueProduct) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id).unwrap();
      toast.success("Product deleted successfully!");
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  const handleCSVUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadProductsCSV(formData).unwrap();
      toast.success("Products uploaded successfully!");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to upload CSV file");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading catalogue...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">
          Error loading catalogue. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-black text-2xl md:text-3xl font-semibold">
            Catalogue
          </h1>
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            disabled={isUploading}
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload CSV"}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <CatalogueSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search inventory by name or ID"
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CatalogueFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Table */}
        <CatalogueTable
          data={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Edit Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={(open) => {
          setIsDeleteModalOpen(open);
          if (!open) setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Product"
        itemName={productToDelete?.product_title}
        isLoading={isDeleting}
      />

      {/* Upload CSV Modal */}
      <UploadCSVModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onConfirm={handleCSVUpload}
        isLoading={isUploading}
      />
    </div>
  );
};

export default CataloguePage;
