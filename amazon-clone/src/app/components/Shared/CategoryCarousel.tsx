import { StoreService } from "@/app/services/StoreService";
import { Product } from "@/app/types";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

interface CategoryCarouselProps {
  category: string;
}

export default function CategoryCarousel(props: CategoryCarouselProps) {
  //#region Variables

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categoryData, setCategoryData] = useState<Product[]>([]);

  //#endregion

  //#region Methods

  const fetchCategory = async () => {
    try {
      const result = await StoreService.getProductsByCategory(
        props?.category,
        0
      );
      if (result) {
        setCategoryData(result.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  //#endregion

  //#region Hooks

  useEffect(() => {
    if (props?.category) {
      fetchCategory();
    }
  }, [props?.category]);

  //#endregion

  return (
    <div className="relative w-full px-4 mb-16 justify-center flex">
      <div className="overflow-x-auto overflow-y-visible py-4 px-2">
        <div className="flex gap-2 min-w-min">
          {categoryData?.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              onMouseOver={() => setSelectedIndex(index)}
            >
              <CategoryCard product={item} selected={selectedIndex === index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
