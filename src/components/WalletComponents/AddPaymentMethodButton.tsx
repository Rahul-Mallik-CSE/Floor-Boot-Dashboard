/** @format */

import React from "react";

interface AddPaymentMethodButtonProps {
  onClick: () => void;
}

const AddPaymentMethodButton = ({ onClick }: AddPaymentMethodButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-dashed border-blue-300 rounded-lg p-4 md:p-5 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm md:text-base font-medium"
    >
      + Add a new payment method
    </button>
  );
};

export default AddPaymentMethodButton;
