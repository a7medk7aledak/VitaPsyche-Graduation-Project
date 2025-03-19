"use client";
import { Category } from "@components/category";
import Heading from "@components/common/Heading";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import withAuth from "@components/auth/WithAuth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const Categories = () => {
  const { categories, status } = useSelector(
    (state: RootState) => state.categories
  );

  const categoriesTitles = categories.map((category) => category.name);
  return (
    <motion.div
      className="container mx-auto pt-8 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Heading variant="secondary">Comprehensive Psychiatry Categories</Heading>

      {status === "pending" ? (
        <div className="min-h-screen">
          <p className="text-center">Loading categories...</p>
        </div>
      ) : status === "failed" ? (
        <p className="text-center text-red-500">Failed to load categories.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default withAuth(Categories);
