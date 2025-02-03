import React, { ReactNode } from "react";

type ButtonType = "standard" | "outlined" | "close";

const buttonStyles: Record<ButtonType, string> = {
  standard: "bg-yellow-400 hover:bg-yellow-500 text-black",
  outlined: "border border-black hover:border-gray-400 hover:bg-[#d4d4d4] text-black",
  close: "bg-gray-200 hover:bg-gray-300 text-gray-700",
};

interface AmazonButtonProps {
  type: ButtonType;
  text?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  full?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}

export default function AmazonButton(props: AmazonButtonProps) {
  const { type, text, onClick, full, icon, disabled } = props;

  return (
    <button
      className={`
        ${full ? "w-full" : ""} 
        py-2 
        rounded-2xl 
        cursor-pointer 
        font-ember 
        text-sm 
        transition-colors 
        select-none
        p-2
        ${buttonStyles[type]}
        ${disabled ? "opacity-50 pointer-events-none" : ""}
        flex 
        items-center 
        justify-center
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
}
