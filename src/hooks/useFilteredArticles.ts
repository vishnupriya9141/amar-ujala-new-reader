import { useMemo, useState, useEffect } from "react";
import { NewsArticle } from "@/types";

/**
 * Custom hook to filter news articles based on selected category and search query.
 * @param selectedCategory - The category to filter by ("सभी" for all categories)
 * @param searchQuery - The search query to filter by (optional)
 * @returns Filtered array of news articles
 */
export const useFilteredArticles = (selectedCategory: string, searchQuery: string = ""): NewsArticle[] => {
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/news')
      .then(response => response.json())
      .then(data => setAllArticles(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return useMemo(() => {
    let filtered = allArticles;

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
  }, [selectedCategory, searchQuery, allArticles]);
};