// components/Stepper.tsx
import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  return (
    <div className="flex items-center justify-center my-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            onClick={() => onStepChange(index)}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
              currentStep >= index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } transition duration-300`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 transition duration-300 ${
                currentStep > index ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
