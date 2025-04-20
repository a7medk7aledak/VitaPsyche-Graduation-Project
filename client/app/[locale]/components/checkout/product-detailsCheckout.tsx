"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@hooks/useCart"; // Adjust the path to your hook

const ProductDetailsCheckout: React.FC = () => {
  const [coupon, setCoupon] = useState("");

  const { cartItems, totalPrice, products, removeItem } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
      {cartItems.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        if (!product) return null;

        const mainImage = product.images.find((img) => img.type === "main");

        return (
          <div key={cartItem.id} className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 relative">
              <Image
                src={mainImage?.url || "/images/placeholder.jpg"}
                alt={product.title || "Unknown Product"}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="text-gray-600">Price: {product.price}</p>
              <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
            </div>
            <button
              onClick={() => removeItem(cartItem.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00978c]"
        />
        <button
          className="px-6 py-3 bg-[#00978c] block ml-auto text-white rounded-xl font-medium  transition-colors disabled:opacity-40"
          disabled={!coupon}
        >
          Apply
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Amount:{" "}
          <span className="text-[#00978c]">{`EGP ${totalPrice.toFixed(
            2
          )}`}</span>
        </h3>
      </div>
    </div>
  );
};

export default ProductDetailsCheckout;
