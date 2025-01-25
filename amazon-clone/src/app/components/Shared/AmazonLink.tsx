import React from "react";

interface AmazonLinkProps {
  href: string;
  text: string;
  word?: boolean;
  style?: string;
  defaultColor?: boolean;
  disabled?: boolean;
}

export default function AmazonLink(props: AmazonLinkProps) {
  
  if (props?.disabled) {
    return (
      <span className="opacity-50">
        {props?.word && " "}
        {props?.text}
        {props?.word && " "}
      </span>
    );
  }

  return (
    <>
      {props?.word && " "}
      <a
        href={props?.href}
        className={`${props?.style} ${
          props?.defaultColor ? "text-black" : ""
        } text-center text-[var(--amazonLink)] hover:text-[var(--amazonOrange)] hover:underline cursor-pointer inline`}
      >
        {props?.text}
      </a>
      {props?.word && " "}
    </>
  );
}