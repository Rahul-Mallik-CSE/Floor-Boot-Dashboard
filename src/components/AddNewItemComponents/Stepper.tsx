/** @format */

"use client";

import React from "react";
import { Check } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
        List your product and reach more customers
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Tell us a bit about your product to get started.
      </p>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isCurrent = index === currentStep - 1;
          const isUpcoming = index > currentStep - 1;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick?.(step.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                isCurrent
                  ? "bg-green-50"
                  : isCompleted
                    ? "bg-green-50 hover:bg-green-100"
                    : "hover:bg-gray-50"
              }`}
            >
              {/* Step Number/Check */}
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-lime-400 text-black"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>

              {/* Step Details */}
              <div className="flex-1">
                <h3
                  className={`text-sm font-medium ${
                    isCurrent || isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
