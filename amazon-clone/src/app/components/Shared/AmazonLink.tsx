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
  return (
    <div
      className={`${props.disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <a
        href={props.href}
        className={`${props.style} ${
          props.defaultColor && "text-black"
        } text-center text-[var(--amazonLink)] hover:text-[var(--amazonOrange)] hover:underline cursor-pointer`}
      >
        {props.word && " "}
        {props.text}
        {props.word && " "}
      </a>
    </div>
  );
}
