// src/app/product/[id]/page.tsx
"use client"
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams() as { id: string }; // Ensure id is typed as a string

  // Simulating data fetching based on the id (replace with your actual data fetching logic)
  const productData: Record<string, { name: string; description: string }> = {
    "1": { name: "Product 1", description: "This is product 1" },
    "2": { name: "Product 2", description: "This is product 2" },
  };

  const product = productData[id]; // Safely access using the string id

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
