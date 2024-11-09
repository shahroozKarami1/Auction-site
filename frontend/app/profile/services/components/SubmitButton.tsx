import React from "react";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => (
  <button
    onClick={onSubmit}
    className="px-6 py-3 bg-green-500 text-white rounded"
  >
    ارسال مزایده
  </button>
);

export default SubmitButton;
