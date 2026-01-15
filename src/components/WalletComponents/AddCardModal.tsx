/** @format */

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardDetails } from "@/types/AllTypes";

interface AddCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddCardModal = ({ open, onOpenChange, onSuccess }: AddCardModalProps) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (field: keyof CardDetails, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    onOpenChange(false);
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
      country: "",
      zipCode: "",
    });
  };

  const handleContinue = () => {
    // Add validation and submission logic here
    console.log("Card Details:", cardDetails);
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <DialogHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-4 border-b sticky top-0 bg-white z-10">
          <button
            onClick={handleCancel}
            className="absolute left-4 top-4 md:top-6 text-gray-600 hover:text-gray-900"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <DialogTitle className="text-xl md:text-2xl font-semibold text-center">
            Add a card
          </DialogTitle>
          <p className="text-xs md:text-sm text-gray-600 text-center mt-1">
            Just input your valid card number and information to ensure it's
            your.
          </p>
        </DialogHeader>

        {/* Form Content */}
        <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 bg-white">
          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
            >
              Card Number
            </label>
            <div className="relative">
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 1234 1234 1234"
                value={cardDetails.cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  if (formatted.replace(/\s/g, "").length <= 16) {
                    handleInputChange("cardNumber", formatted);
                  }
                }}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
              />
              {/* Card Icons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  alt="Visa"
                  className="h-5 md:h-6"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-5 md:h-6"
                />
              </div>
            </div>
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label
                htmlFor="expiry"
                className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
              >
                Date of Expiry
              </label>
              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) => {
                  const formatted = formatExpiry(e.target.value);
                  if (formatted.length <= 5) {
                    handleInputChange("expiryDate", formatted);
                  }
                }}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
              >
                CVC
              </label>
              <input
                id="cvc"
                type="text"
                placeholder="123"
                maxLength={3}
                value={cardDetails.cvc}
                onChange={(e) =>
                  handleInputChange("cvc", e.target.value.replace(/\D/g, ""))
                }
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
              />
            </div>
          </div>

          {/* Name on Card */}
          <div>
            <label
              htmlFor="nameOnCard"
              className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
            >
              Name on Card
            </label>
            <input
              id="nameOnCard"
              type="text"
              placeholder="Enter the name"
              value={cardDetails.nameOnCard}
              onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="United State"
              value={cardDetails.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
            />
          </div>

          {/* ZIP Code */}
          <div>
            <label
              htmlFor="zipCode"
              className="block text-xs md:text-sm font-medium text-gray-900 mb-2"
            >
              ZIP Code
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="477987"
              value={cardDetails.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-4 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={handleCancel}
            className="px-4 md:px-6 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="px-4 md:px-6 py-2 text-sm md:text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
