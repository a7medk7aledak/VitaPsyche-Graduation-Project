import { useSelector } from "react-redux";
import { RootState } from "@store/store";

export const useCategoryLookup = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const getCategory = (value: number | string): string | number | null => {
    if (typeof value === "number") {
      return (
        categories.find((cat) => cat.id === value)?.name || "Unknown Category"
      );
    } else if (typeof value === "string") {
      return categories.find((cat) => cat.name === value)?.id ?? null;
    }
    return null;
  };

  return getCategory;
};
