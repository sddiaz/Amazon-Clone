import { Product } from "@/app/types";
import Image from "next/image";
import React from "react";
import AmazonRating from "./AmazonRating";
import Prime from "../../../../public/prime-logo.png";
import AmazonLink from "./AmazonLink";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  product: Product;
  selected: boolean;
}

export default function CategoryCard({ product, selected }: CategoryCardProps) {

  //#region Variables

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const fullStars = Math.floor(product.rating);
  const router = useRouter()

  //#endregion

  //#region Methods

  const handleClick = () => {
    router.push(`/product/${product.id}`)
  }

  //#endregion

  return (
    
    <div onClick={handleClick} className="cursor-pointer bg-white hover:scale-105 hover:shadow-md transition-all duration-200">
      <div className="relative w-56 h-56">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className=" rounded-md object-cover"
        />
      </div>

      {/* Title */}
      <div className="w-56 break-words">
        <AmazonLink
          style="text-start line-clamp-2"
          text={product.title}
          href={`/product/${product.id}`}
        />
      </div>

      {/* Rating */}
      <AmazonRating rating={product.rating} />

      {/* Price */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          {product.discountPercentage > 0 && (
            <span className="text-sm text-red-600">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Prime Delivery */}
      <span className="flex text-sm font-emberThin font-bold -ml-4">
        <Image
          src={Prime}
          height={10}
          width={75}
          alt="Prime Logo"
          className="-mr-2"
        />
        Two-Day
      </span>
    </div>
  );
}
