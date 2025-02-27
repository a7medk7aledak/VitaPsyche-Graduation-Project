"use client";
import React, { useState } from "react";
import productsData from "../../../content/products.json";
import ProductImageSlider from "@components/products/ProductImageSlider";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductsHeader from "@components/products/ProductsHeader";
import Link from "next/link"; // Import Link for navigation
import { useCart } from "@hooks/useCart";
import withAuth from "@components/auth/WithAuth";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { products } = productsData;
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="text-center text-xl text-red-600 mt-10">
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };

  return (
    <div className="py-10 mx-5 lg:mx-0">
      <ProductsHeader />

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Swiper Image Slider */}
          <ProductImageSlider images={product.images} title={product.title} />

          {/* Right: Product Information */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <h2 className="text-lg font-light text-gray-500">
              {product.subTitle}
            </h2>
            <p className="text-sm text-teal-500">{product.category}</p>
            <p className="text-2xl font-semibold text-maintext mt-3">
              {product.price}
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                About this product:
              </h3>
              <ul className="list-disc text-lg pl-5 space-y-2 text-gray-600">
                {product.about.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Quantity Dropdown and Add to Cart Button */}
            <div className="mt-6 flex items-center gap-4 justify-start">
              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maintext"
                >
                  {[...Array(4)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="px-6 py-3 bg-[#216862] text-white font-semibold rounded-lg hover:bg-[#205f5a] transition-colors"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Checkout Button */}
            <div className="mt-6 flex justify-end">
              <Link href="/cart">
                <button className="px-6 py-3 bg-[#216862] text-white font-semibold rounded-lg hover:bg-[#205f5a] transition-colors">
                  Go to Cart & Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProductPage);
