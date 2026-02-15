/** @format */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stepper, Step } from "@/components/AddNewItemComponents/Stepper";
import { ItemDetailsStep } from "@/components/AddNewItemComponents/ItemDetailsStep";
import { MediaUploadStep } from "@/components/AddNewItemComponents/MediaUploadStep";
import { PricingInventoryStep } from "@/components/AddNewItemComponents/PricingInventoryStep";
import { SpecificationsStep } from "@/components/AddNewItemComponents/SpecificationsStep";
import { ReviewPublishStep } from "@/components/AddNewItemComponents/ReviewPublishStep";
import { useCreateProductMutation } from "@/redux/freatures/addNewItemApi";
import { toast } from "react-toastify";

interface UploadedImage {
  id: string;
  name: string;
  size: string;
  url: string;
  file: File;
}

const steps: Step[] = [
  { id: 1, title: "Item Details", description: "" },
  { id: 2, title: "Upload Images", description: "" },
  { id: 3, title: "Pricing & Inventory", description: "" },
  { id: 4, title: "Specifications", description: "" },
  { id: 5, title: "Review & Publish", description: "" },
];

const AddNewItemPage = () => {
  const router = useRouter();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    itemDetails: {
      productTitle: "",
      brand: "",
      description: "",
      mainCategory: "",
      subCategory: "",
      tags: [] as string[],
    },
    media: {
      images: [] as UploadedImage[],
      primaryImage: "",
    },
    pricing: {
      regularPrice: "",
      salePrice: "",
      productId: "",
      packCoverage: "",
      taxPrice: "",
    },
    specifications: {
      length: "",
      width: "",
      thickness: "",
      weight: "",
      installationMethod: "",
      coveragePerPack: "",
      edgeProfile: "",
      pileHeight: "",
      materials: "",
      format: "",
      uniformityRequired: false,
      isCalculate: false,
      additionalDetails: false,
      availableColors: [] as string[],
      patternType: "",
      stockQuantity: "",
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleDataChange = (section: string, data: unknown) => {
    setFormData({ ...formData, [section]: data });
  };

  const handlePublish = async () => {
    try {
      // Validate required fields
      if (!formData.itemDetails.productTitle) {
        toast.error("Product title is required");
        return;
      }
      if (!formData.itemDetails.mainCategory) {
        toast.error("Main category is required");
        return;
      }
      if (!formData.pricing.productId) {
        toast.error("Product ID is required");
        return;
      }
      if (formData.media.images.length === 0) {
        toast.error("At least one image is required");
        return;
      }
      if (!formData.media.primaryImage) {
        toast.error("Please select a primary image");
        return;
      }

      // Build FormData
      const submitFormData = new FormData();

      // Item Details
      submitFormData.append("product_title", formData.itemDetails.productTitle);
      submitFormData.append("brand_manufacturer", formData.itemDetails.brand);
      submitFormData.append(
        "item_description",
        formData.itemDetails.description,
      );
      submitFormData.append("main_category", formData.itemDetails.mainCategory);
      submitFormData.append("sub_category", formData.itemDetails.subCategory);
      submitFormData.append("tags", formData.itemDetails.tags.join(", "));

      // Media - Primary and other images
      const primaryImageObj = formData.media.images.find(
        (img) => img.id === formData.media.primaryImage,
      );
      if (primaryImageObj) {
        submitFormData.append("primary_image", primaryImageObj.file);
      }

      // Other images
      formData.media.images.forEach((img) => {
        if (img.id !== formData.media.primaryImage) {
          submitFormData.append("images", img.file);
        }
      });

      // Pricing
      submitFormData.append("regular_price", formData.pricing.regularPrice);
      submitFormData.append("sale_price", formData.pricing.salePrice || "0");
      submitFormData.append("tax_price", formData.pricing.taxPrice || "0");
      submitFormData.append("product_id", formData.pricing.productId);
      submitFormData.append("pack_coverage", formData.pricing.packCoverage);

      // Specifications
      submitFormData.append("length", formData.specifications.length);
      submitFormData.append("width", formData.specifications.width);
      submitFormData.append("thickness", formData.specifications.thickness);
      submitFormData.append("weight", formData.specifications.weight);
      submitFormData.append(
        "installation_method",
        formData.specifications.installationMethod,
      );
      submitFormData.append(
        "coverage_per_pack",
        formData.specifications.coveragePerPack,
      );
      submitFormData.append(
        "pile_height",
        formData.specifications.pileHeight || "",
      );
      submitFormData.append("materials", formData.specifications.materials);
      submitFormData.append("format", formData.specifications.format || "");
      submitFormData.append(
        "is_underlay_required",
        String(formData.specifications.uniformityRequired),
      );
      submitFormData.append(
        "is_calculate",
        String(formData.specifications.isCalculate),
      );
      submitFormData.append(
        "available_colors",
        formData.specifications.availableColors.join(", "),
      );
      submitFormData.append(
        "pattern_type",
        formData.specifications.patternType || "",
      );
      submitFormData.append(
        "stock_quantity",
        formData.specifications.stockQuantity,
      );

      // Submit
      await createProduct(submitFormData).unwrap();

      toast.success("Product created successfully!");
      router.push("/catalogue");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Stepper Sidebar */}
          <div className="lg:col-span-3">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-6">
              {currentStep === 1 && (
                <ItemDetailsStep
                  data={formData.itemDetails}
                  onChange={(data) => handleDataChange("itemDetails", data)}
                />
              )}
              {currentStep === 2 && (
                <MediaUploadStep
                  data={formData.media}
                  onChange={(data) => handleDataChange("media", data)}
                />
              )}
              {currentStep === 3 && (
                <PricingInventoryStep
                  data={formData.pricing}
                  onChange={(data) => handleDataChange("pricing", data)}
                />
              )}
              {currentStep === 4 && (
                <SpecificationsStep
                  data={formData.specifications}
                  onChange={(data) => handleDataChange("specifications", data)}
                />
              )}
              {currentStep === 5 && <ReviewPublishStep data={formData} />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-sm transition-colors ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={isCreating}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Publishing..." : "Publish"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewItemPage;
