/** @format */

"use client";

import React, { useState } from "react";
import { CatalogueSearchBar } from "@/components/CatalogueComponsnts/CatalogueSearchBar";
import { CatalogueFilters } from "@/components/CatalogueComponsnts/CatalogueFilters";
import { CatalogueTable } from "@/components/CatalogueComponsnts/CatalogueTable";
import { catalogueData } from "@/data/AllData";
import { CatalogueProduct } from "@/types/AllTypes";

const CataloguePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products] = useState<CatalogueProduct[]>(catalogueData);

  const filteredProducts = products.filter(
    (product) =>
      product.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEdit = (product: CatalogueProduct) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (product: CatalogueProduct) => {
    console.log("Delete product:", product);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Catalogue
        </h1>

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
          <CatalogueFilters />
        </div>

        {/* Table */}
        <CatalogueTable
          data={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CataloguePage;
