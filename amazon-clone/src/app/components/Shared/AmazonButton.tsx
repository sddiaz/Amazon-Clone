import React from 'react';

type ButtonType = 'standard' | 'outlined' | 'close';

const buttonStyles: Record<ButtonType, string> = {
  standard: "bg-yellow-400 hover:bg-yellow-500 text-black",
  outlined: "border border-black hover:border-gray-400 hover:bg-[#d4d4d4] text-black",
  close: "bg-gray-200 hover:bg-gray-300 text-gray-700"
};

interface AmazonButtonProps {
  type: ButtonType;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AmazonButton({ type, text, onClick }: AmazonButtonProps) {
  return (
    <button
      className={`w-full py-2 rounded-2xl cursor-pointer font-ember text-sm transition-colors ${buttonStyles[type]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}