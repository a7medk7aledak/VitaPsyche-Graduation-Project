import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCartStore } from "@store/useCartStore";
import Image from "next/image";

type TProductProps = {
  product: {
    id: string;
    title: string;
    images: { id: string; url: string; type: string }[];
    price: string;
  };
};

const Product = ({ product }: TProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart); // Access the addToCart function from the store

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
        <h3 className="text-lg font-bold text-[#216862] truncate">
          {product.title}
        </h3>
        <p className="text-[#216862] font-medium mt-2">${product.price}</p>
        <button
          onClick={() => addToCart()} // Pass the product to addToCart
          className="flex items-center justify-center w-full px-4 py-3 mt-6 text-white bg-[#216862] rounded-full hover:bg-[#1a4c47] focus:outline-none focus:ring-4 focus:ring-[#3a7c8d] shadow-md transition-all duration-300"
        >
          <FaShoppingCart className="mr-2 text-lg" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
