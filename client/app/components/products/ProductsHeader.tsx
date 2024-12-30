// components/ProductsHeader.tsx
"use client";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

interface ProductsHeaderProps {
  setSearchQuery?: (query: string) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ setSearchQuery }) => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="mx-auto container flex items-center justify-between my-5">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearchQuery?.(e.target.value)} // Update search query on input change
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:border-[#216862] focus:ring-[#216862] focus:outline-none transition-all"
          placeholder="Search for products..."
        />
      </div>
      <button className="flex items-center bg-[#216862] text-white px-5 py-3 rounded-full shadow-md hover:bg-[#1a4c47] transition-colors duration-300">
        <FaShoppingCart className="mr-2 text-lg" />
        <span className="font-medium">{cartCount}</span>{" "}
        {/* Display the cart count */}
      </button>
    </div>
  );
};

export default ProductsHeader;
