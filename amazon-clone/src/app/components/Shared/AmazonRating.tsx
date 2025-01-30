"use client";
import React from "react";
import { Star } from "lucide-react";
import AmazonLink from "./AmazonLink";

interface RatingProps {
  rating: number;
}

export default function AmazonRating(props: RatingProps) {

  //#region Variables

  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating % 1 >= 0.5;
  
  //#endregion

  //#region Methods

  const getStarColor = (index: number) => {
    if (index < fullStars || (index === fullStars && hasHalfStar)) {
      return "fill-[var(--amazonOrange)]";
    }
    return "text-gray-200 fill-gray-200";
  };

  //#endregion

  return (
    <div className="flex items-center gap-0.5 align-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={getStarColor(index)}
          strokeWidth={0}
        />
      ))}
      <AmazonLink href="" text={props.rating.toString()} style="text-xs ml-1 mt-1 font-bold" />
    </div>
  );
}