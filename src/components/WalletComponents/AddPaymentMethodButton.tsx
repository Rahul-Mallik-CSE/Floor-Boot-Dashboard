/** @format */

import React from "react";

interface AddPaymentMethodButtonProps {
  onClick: () => void;
}

const AddPaymentMethodButton = ({ onClick }: AddPaymentMethodButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer border-2 border-dashed border-blue-300 rounded-lg px-4 md:px-5 py-1 md:py-2 text-black hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm md:text-base font-medium"
    >
      + Add a new payment method
    </button>
  );
};

export default AddPaymentMethodButton;
