/** @format */

import React from "react";
import { LinkedAccount } from "@/types/AllTypes";

interface LinkedAccountCardProps {
  account: LinkedAccount;
  onDisconnect: (id: string) => void;
}

const LinkedAccountCard = ({
  account,
  onDisconnect,
}: LinkedAccountCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Stripe Logo */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-base">
              {account.provider.substring(0, 2).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Account Info */}
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-900">
            {account.provider}
          </h3>
          <p className="text-xs md:text-sm text-gray-600">
            Account ending in {account.accountNumber}
          </p>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap sm:flex-nowrap">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-700">
          Connected
        </span>
        <button
          onClick={() => onDisconnect(account.id)}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-white border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default LinkedAccountCard;
