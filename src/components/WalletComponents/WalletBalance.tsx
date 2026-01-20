/** @format */

import React from "react";

interface WalletBalanceProps {
  totalBalance: number;
  pendingAmount: number;
}

const WalletBalance = ({ totalBalance, pendingAmount }: WalletBalanceProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <div>
          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
            Total Balance
          </p>
          <p className="text-2xl md:text-3xl font-bold text-black">
            {formatCurrency(totalBalance)}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
            Pending Amount
          </p>
          <p className="text-2xl md:text-3xl font-bold text-black">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
