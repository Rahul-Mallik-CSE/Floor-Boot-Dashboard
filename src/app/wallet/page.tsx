/** @format */

"use client";

import React, { useState } from "react";
import WalletBalance from "@/components/WalletComponents/WalletBalance";
import LinkedAccountCard from "@/components/WalletComponents/LinkedAccountCard";
import AddPaymentMethodButton from "@/components/WalletComponents/AddPaymentMethodButton";
import PaymentMethodModal from "@/components/WalletComponents/PaymentMethodModal";
import { walletData } from "@/data/AllData";

const WalletPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleDisconnect = (id: string) => {
    console.log("Disconnect account:", id);
    // Add disconnect logic here
  };

  return (
    <div className="w-full  ">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6 ">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          My Wallet
        </h1>

        <div className="space-y-4 md:space-y-6">
          {/* Wallet Balance */}
          <WalletBalance
            totalBalance={walletData.totalBalance}
            pendingAmount={walletData.pendingAmount}
          />

          {/* Linked Account Section */}
          <div>
            <h2 className="text-base md:text-lg font-semibold text-black mb-3 md:mb-4">
              Linked Account
            </h2>

            <div className="space-y-3 md:space-y-4">
              {/* Linked Accounts */}
              {walletData.linkedAccounts.map((account) => (
                <LinkedAccountCard
                  key={account.id}
                  account={account}
                  onDisconnect={handleDisconnect}
                />
              ))}

              {/* Add Payment Method Button */}
              <AddPaymentMethodButton
                onClick={() => setShowPaymentModal(true)}
              />
            </div>
          </div>
        </div>

        {/* Payment Method Modal */}
        <PaymentMethodModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
        />
      </div>
    </div>
  );
};

export default WalletPage;
