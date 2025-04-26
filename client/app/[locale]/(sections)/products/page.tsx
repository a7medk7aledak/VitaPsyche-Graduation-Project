"use client";

import React, { useState } from "react";
import Image from "next/image";

import ProductsHeader from "@components/products/ProductsHeader";
import Product from "@components/products/Product";
import withAuth from "@components/auth/WithAuth";
import englishProducts from "@app/content/products/en.json";
import arabicProducts from "@app/content/products/ar.json";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const Products = () => {
  const t = useTranslations("Products"); // Initialize the translation hook
  const locale = useLocale();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const productsData = locale === "ar" ? arabicProducts : englishProducts;

  const { products } = productsData;
  // Filter products based on the selected category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "products" && product.category === "general") ||
      (selectedCategory === "herbal" && product.category === "herbal");

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative py-10 ">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Pass setSearchQuery to ProductsHeader */}
        <ProductsHeader setSearchQuery={setSearchQuery} />
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
          {/* Product Image */}
          <Image
            src={"/images/products/headphone/mainHeadphone.png"}
            alt="mainHeadphone.png"
            width={400}
            height={400}
            className="rounded-lg shadow-lg hidden lg:block"
          />
          {/* Product Information */}
          <div className="flex-1 text-center lg:text-start space-y-6">
            <h3 className="text-4xl font-semibold font-serif  leading-snug">
              {t("title")}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
              {t("description")}
            </p>
            <button className="bg-[#216862] text-white px-8 py-3 rounded-lg text-lg font-serif shadow-md hover:bg-[#1a4c47] focus:outline-none focus:ring-4 focus:ring-[#3a7c8d] transition-all duration-300 lg:block lg:ms-auto">
              {t("learnMore")}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-8">
          {["all", "products", "herbal"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#216862] text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-[#216862] hover:text-white"
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Products);
