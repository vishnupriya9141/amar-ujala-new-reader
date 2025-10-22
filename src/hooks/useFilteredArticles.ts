import { useMemo } from "react";
import { newsArticles, NewsArticle } from "@/data/newsData";

export const useFilteredArticles = (selectedCategory: string): NewsArticle[] => {
  return useMemo(() => {
    if (selectedCategory === "सभी") {
      return newsArticles;
    }
    return newsArticles.filter(article => article.category === selectedCategory);
  }, [selectedCategory]);
};