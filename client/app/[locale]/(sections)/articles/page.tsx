"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import articlesInEnglish from "@app/content/articles/en.json";
import articlesInArabic from "@app/content/articles/ar.json";
import Button from "@components/common/Button";
import { Link } from "@/i18n/navigation";

import { useLocale, useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Articles"); // Initialize the translation hook
  const locale = useLocale();
  const articles = locale === "en" ? articlesInEnglish : articlesInArabic;
  // Use translated category names
  const categories = useMemo(
    () => [
      t("categories.all"),
      t("categories.psychotic"),
      t("categories.mood"),
      t("categories.anxiety"),
      t("categories.personality"),
    ],
    [t]
  );

  const [selectedCategory, setSelectedCategory] = useState(t("categories.all"));
  const [searchQuery, setSearchQuery] = useState("");

  const psychoticArticles = useMemo(
    () =>
      articles.filter((article) =>
        locale === "en"
          ? [
              "Schizophrenia",
              "Alzheimer's Disease",
              "Lewy Body Dementia",
            ].includes(article.title)
          : ["الفصام", "مرض الزهايمر", "خرف أجسام ليوي"].includes(article.title)
      ),
    [articles, locale]
  );

  const moodArticles = useMemo(
    () =>
      articles.filter((article) =>
        locale === "en"
          ? article.title === "Depression"
          : article.title === "الاكتئاب"
      ),
    [articles, locale]
  );

  const anxietyArticles = useMemo(
    () =>
      articles.filter((article) =>
        locale === "en"
          ? ["Panic Disorder", "Geriatric Sleep Disorder"].includes(
              article.title
            )
          : ["اضطراب الهلع", "اضطراب النوم لدى كبار السن"].includes(
              article.title
            )
      ),
    [articles, locale]
  );

  const personalityArticles = useMemo(
    () =>
      articles.filter((article) =>
        locale === "en"
          ? article.title === "Borderline Personality Disorder"
          : article.title === "اضطراب الشخصية الحدية"
      ),
    [articles, locale]
  );

  //function for selecting articles for specific category
  const filteredArticles = useMemo(() => {
    let articlesToFilter = [];

    switch (selectedCategory) {
      case categories[1]: // Psychotic and Neurodegenerative Disorders
        articlesToFilter = psychoticArticles;
        break;
      case categories[2]: // Mood Disorders
        articlesToFilter = moodArticles;
        break;
      case categories[3]: // Anxiety and Related Disorders
        articlesToFilter = anxietyArticles;
        break;
      case categories[4]: // Personality Disorders
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
    categories,
    articles,
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
            placeholder={t("search.placeholder")}
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

        <h4 className="text-xl text-maintext font-medium">
          {t("articles.explore")}
        </h4>

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
                className="ms-auto"
              >
                <Button variant="primary" roundedValue="full" size="medium">
                  {t("articles.readMore")}
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
