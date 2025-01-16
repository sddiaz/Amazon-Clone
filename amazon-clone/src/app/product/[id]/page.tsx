"use client"
import { useParams } from 'next/navigation';

export default function ProductDetails() {
  const { id } = useParams() as { id: string };

  const productData: Record<string, { name: string; description: string }> = {
    "1": { name: "Product 1", description: "This is product 1" },
    "2": { name: "Product 2", description: "This is product 2" },
  };

  const product = productData[id]; 

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
