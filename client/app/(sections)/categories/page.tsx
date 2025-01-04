"use client";
import { Category } from "@components/category";
import Heading from "@components/common/Heading";
import { categories } from "@constants/categories";
import { motion } from "framer-motion";

export default function Categories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto pt-8 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Heading variant="secondary">Comprehensive Psychiatry Categories</Heading>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </motion.div>
    </motion.div>
  );
}
