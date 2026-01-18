/** @format */

"use client";

import React, { useState } from "react";
import { Stepper, Step } from "@/components/AddNewItemComponents/Stepper";
import { ItemDetailsStep } from "@/components/AddNewItemComponents/ItemDetailsStep";
import { MediaUploadStep } from "@/components/AddNewItemComponents/MediaUploadStep";
import { PricingInventoryStep } from "@/components/AddNewItemComponents/PricingInventoryStep";
import { SpecificationsStep } from "@/components/AddNewItemComponents/SpecificationsStep";
import { ReviewPublishStep } from "@/components/AddNewItemComponents/ReviewPublishStep";

const steps: Step[] = [
  { id: 1, title: "Item Details", description: "" },
  { id: 2, title: "Upload Images", description: "" },
  { id: 3, title: "Pricing & Inventory", description: "" },
  { id: 4, title: "Specifications", description: "" },
  { id: 5, title: "Review & Publish", description: "" },
];

const AddNewItemPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    itemDetails: {
      productTitle: "",
      brand: "",
      description: "",
      mainCategory: "",
      subCategory: "",
      tags: [],
    },
    media: {
      images: [],
      primaryImage: "",
    },
    pricing: {
      regularPrice: "",
      salePrice: "",
      productId: "",
      packCoverage: "",
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
      additionalDetails: false,
      availableColors: [],
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

  const handleDataChange = (section: string, data: any) => {
    setFormData({ ...formData, [section]: data });
  };

  const handlePublish = () => {
    console.log("Publishing product:", formData);
    // Handle publish logic here
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
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Publish
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
