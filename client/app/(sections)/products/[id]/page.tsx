"use client";
import React from "react";
import productsData from "../../../content/products.json";
import ProductImageSlider from "@components/products/ProductImageSlider";
import { useCartStore } from "@store/useCartStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductsHeader from "@components/products/ProductsHeader";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { products } = productsData;
  const product = products.find((p) => p.id === params.id);

  const addToCart = useCartStore((state) => state.addToCart); // Access the addToCart function from the store

  if (!product) {
    return (
      <div className="text-center text-xl text-red-600 mt-10">
        Product not found
      </div>
    );
  }

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

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                className=" px-6 py-3 bg-[#216862] text-white font-semibold rounded-lg hover:bg-[#1a4c47] transition-colors ml-auto block"
                onClick={addToCart} // Call the addToCart function when clicked
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
