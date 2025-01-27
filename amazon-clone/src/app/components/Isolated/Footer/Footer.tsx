import React from "react";

export default function Footer() {
  return (
    <footer className="font-ember w-full bg-[#131a22] text-white py-8 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Made with{" "}
          <span className="text-[red] animate-pulse inline-block">❤</span> by
          Santiago Diaz
        </p>
      </div>
    </footer>
  );
}