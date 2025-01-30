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
    <div className="flex justify-center gap-2 mb-[100px]">
      {categoryData?.map((item, index) => {
        return (
          <div key={index} onMouseOver={() => setSelectedIndex(index)}>
            <CategoryCard
              product={item}
              selected={selectedIndex == index}
            />
          </div>
        );
      })}
    </div>
  );
}
