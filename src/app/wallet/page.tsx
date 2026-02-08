/** @format */

"use client";

import React from "react";
import WalletBalance from "@/components/WalletComponents/WalletBalance";
import { useGetWalletBalanceQuery } from "@/redux/freatures/walletAPI";

const WalletPage = () => {
  const { data, isLoading, error } = useGetWalletBalanceQuery();

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
          <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
            My Wallet
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="animate-pulse">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
          <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
            My Wallet
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <p className="text-red-500">
                Failed to load wallet data. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          My Wallet
        </h1>

        <div className="space-y-4 md:space-y-6">
          {/* Wallet Balance */}
          {data && (
            <WalletBalance
              totalBalance={data.total_balance}
              pendingAmount={data.pending_amount}
              currency={data.currency}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
