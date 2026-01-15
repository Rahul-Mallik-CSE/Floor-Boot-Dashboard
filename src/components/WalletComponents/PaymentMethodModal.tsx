/** @format */

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaymentMethodType } from "@/types/AllTypes";
import AddCardModal from "./AddCardModal";
import { Button } from "../ui/button";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentMethodModal = ({
  open,
  onOpenChange,
}: PaymentMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType>("card");
  const [showCardModal, setShowCardModal] = useState(false);

  const handleContinue = () => {
    if (selectedMethod === "card") {
      setShowCardModal(true);
      onOpenChange(false);
    }
    // Handle bank account flow here if needed
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedMethod("card");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-125 p-0 bg-white">
          {/* Header */}
          <DialogHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-4 border-b">
            <DialogTitle className="text-xl md:text-2xl font-semibold text-center text-black">
              Choose your payment method
            </DialogTitle>
            <p className="text-xs md:text-sm text-gray-600 text-center ">
              Select the account where you&apos;d like to get paid.
            </p>
          </DialogHeader>

          {/* Content */}
          <div className="px-4 md:px-6 py-4 md:py-6 space-y-3">
            {/* Cards Option */}
            <button
              onClick={() => setSelectedMethod("card")}
              className={`w-full border rounded-lg px-4 md:px-5 py-2 md:py-4 text-left cursor-pointer transition-all ${
                selectedMethod === "card"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedMethod === "card"
                      ? "border-gray-900"
                      : "border-gray-400"
                  }`}
                >
                  {selectedMethod === "card" && (
                    <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">
                    Cards
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                    Deposit to my card
                  </p>
                </div>
              </div>
            </button>

            {/* Bank Account Option */}
            <button
              onClick={() => setSelectedMethod("bank")}
              className={`w-full border rounded-lg px-4 md:px-5 py-2 md:py-4 cursor-pointer text-left transition-all ${
                selectedMethod === "bank"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedMethod === "bank"
                      ? "border-gray-900"
                      : "border-gray-400"
                  }`}
                >
                  {selectedMethod === "bank" && (
                    <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">
                    Bank Account
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                    Deposit to my bank account
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 md:px-6 py-4 border-t flex justify-end gap-3">
            <Button
              onClick={handleCancel}
              className="px-4 md:px-6 py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="px-4 md:px-6 py-2 text-sm md:text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddCardModal
        open={showCardModal}
        onOpenChange={setShowCardModal}
        onSuccess={() => {
          setShowCardModal(false);
          // Handle success
        }}
      />
    </>
  );
};

export default PaymentMethodModal;
