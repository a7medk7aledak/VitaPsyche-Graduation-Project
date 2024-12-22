"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import articles from "@app/content/articles.json";
import Button from "@components/common/Button";
import Link from "next/link";

const Page = () => {
  const categories = [
    "All",
    "Psychotic and Neurodegenerative Disorders",
    "Mood Disorders",
    "Anxiety and Related Disorders",
    "Personality Disorders",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const psychoticArticles = useMemo(
    () =>
      articles.filter((article) =>
        ["Schizophrenia", "Alzheimer's Disease", "Lewy Body Dementia"].includes(
          article.title
        )
      ),
    []
  );

  const moodArticles = useMemo(
    () => articles.filter((article) => article.title === "Depression"),
    []
  );

  const anxietyArticles = useMemo(
    () =>
      articles.filter((article) =>
        ["Panic Disorder", "Geriatric Sleep Disorder"].includes(article.title)
      ),
    []
  );

  const personalityArticles = useMemo(
    () =>
      articles.filter(
        (article) => article.title === "Borderline Personality Disorder"
      ),
    []
  );

  //function for selecting articles for specific category
  const filteredArticles = useMemo(() => {
    let articlesToFilter = [];

    switch (selectedCategory) {
      case "Psychotic and Neurodegenerative Disorders":
        articlesToFilter = psychoticArticles;
        break;
      case "Mood Disorders":
        articlesToFilter = moodArticles;
        break;
      case "Anxiety and Related Disorders":
        articlesToFilter = anxietyArticles;
        break;
      case "Personality Disorders":
        articlesToFilter = personalityArticles;
        break;
      default: // "All articles"
        articlesToFilter = articles;
    }

    // Filter articles based on the search query
    return articlesToFilter.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [
    selectedCategory,
    psychoticArticles,
    moodArticles,
    anxietyArticles,
    personalityArticles,
    searchQuery,
  ]);

  return (
    <section id="articles" className="relative">
      <div className="container mx-auto">
        <motion.div
          className="relative w-5/6 mx-auto -mt-14 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
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
            className="block w-full p-3 ps-11 text-xl outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-400"
            required
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <motion.ul
          className="flex flex-wrap mb-7"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, indx) => (
            <li
              key={indx}
              className={`px-3 py-2 text-lg font-medium cursor-pointer ${
                selectedCategory === category
                  ? "text-teal-700 border-b-2 border-teal-700"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </motion.ul>

        <h4 className="text-xl text-maintext font-medium">Explore articles</h4>

        <motion.div
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredArticles.map((article) => (
            <motion.div
              key={article.title}
              className="mb-8 p-4 border rounded-lg bg-gray-50 flex flex-col items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h5 className="text-lg text-maintext font-semibold mb-2">
                {article.title}
              </h5>
              <p className="text-paragraphtext mb-4">
                {article.content.description}
              </p>
              <Link
                href={`/articles/${encodeURIComponent(article.title)}`}
                className="ml-auto"
              >
                <Button variant="primary" roundedValue="full" size="medium">
                  Read More
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
