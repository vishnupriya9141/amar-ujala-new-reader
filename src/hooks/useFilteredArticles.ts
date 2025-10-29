import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "@/types";
import { newsApi } from "@/lib/api-client";

/**
 * Custom hook to filter news articles based on selected category and search query.
 * Uses React Query for efficient data fetching and caching.
 * @param selectedCategory - The category to filter by ("सभी" for all categories)
 * @param searchQuery - The search query to filter by (optional)
 * @returns Object containing filtered articles, loading state, and error state
 */
export const useFilteredArticles = (selectedCategory: string, searchQuery: string = "") => {
  // Fetch all articles using React Query
  const {
    data: allArticles = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await newsApi.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
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

  return {
    articles: filteredArticles,
    isLoading,
    error,
    refetch,
  };
};