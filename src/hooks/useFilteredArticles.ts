import { useMemo } from "react";
import { newsArticles, NewsArticle } from "@/data/newsData";

export const useFilteredArticles = (selectedCategory: string, searchQuery: string = ""): NewsArticle[] => {
  return useMemo(() => {
    let filtered = newsArticles;

    // Filter by category
    if (selectedCategory !== "सभी") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);
};