"use client";

import { useEffect } from "react";
import { fetchCategories } from "@store/categories/act/actCategories";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@store/store";

export default function CategoriesFetcher() {
  const { status, categories } = useSelector(
    (state: RootState) => state.categories
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && status === "idle" && categories.length === 0) {
        await dispatch(fetchCategories());
      }
    };

    fetchData();
  }, [dispatch, status, categories, isAuthenticated]);

  return null; // No UI, just handles fetching
}
