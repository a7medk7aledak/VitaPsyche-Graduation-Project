import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@hooks/useCart";

type TProductProps = {
  product: {
    id: string;
    title: string;
    images: { id: string; url: string; type: string }[];
    price: string;
  };
};

const Product = ({ product }: TProductProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <Image
          src={`${product.images.find((img) => img.type === "main")?.url}`}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover w-full h-64"
        />
      </Link>
      <div className="p-5">
        <h3 className="text-lg font-bold  truncate" title={product.title}>
          {product.title}
        </h3>
        <p className="text-maintext font-medium mt-2">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full px-4 py-3 mt-6 text-white bg-[#216862] rounded-full hover:bg-[#205f5a]focus:outline-none focus:ring-4 focus:ring-[#3a7c8d] shadow-md transition-all duration-300"
        >
          <FaShoppingCart className="mr-2 text-lg" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
