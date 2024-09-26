"use client";
import { motion } from "framer-motion";
import articles from "@app/content/articles.json";
import Image from "next/image";

const ArticlePage = ({ params }: { params: { title: string } }) => {
  // Decode the title from the URL (removing the encoding symbols )
  const decodedTitle = decodeURIComponent(params.title);

  // Find the article based on the decoded title
  const article = articles.find((article) => article.title === decodedTitle);

  // Animation values
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  if (!article) {
    return (
      <div className="text-center text-red-500 text-xl py-10">
        Article not found
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-10 lg:px-4 py-12">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 text-maintext leading-tight"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
      >
        {article.title}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.aside
          className="lg:col-span-1"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <div className="relative w-full h-64 lg:h-80">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.aside>

        <motion.div
          className="md:col-span-3"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
        >
          <div className="prose prose-lg max-w-none text-gray-800">
            {/* Description */}
            <p className="leading-relaxed text-lg mb-8">
              {article.content.description}
            </p>

            {/* Symptoms Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-teal-700 mb-4 border-b-2 pb-2">
                Symptoms
              </h2>
              <ul className="list-disc list-inside space-y-3">
                {article.content.symptoms.map((symptom, indx) => (
                  <li key={indx} className="leading-relaxed text-lg">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Causes Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-teal-700 mb-4 border-b-2 pb-2">
                Causes
              </h2>
              <ul className="list-disc list-inside space-y-3">
                {article.content.causes.map((cause) => (
                  <li key={cause} className="leading-relaxed text-lg">
                    {cause}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Section */}
            <div>
              <h2 className="text-3xl font-semibold text-teal-700 mb-4 border-b-2 pb-2">
                Treatment
              </h2>
              <p className="leading-relaxed text-lg">
                {article.content.treatment}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
