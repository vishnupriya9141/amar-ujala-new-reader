import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * Custom hook for managing bookmarked articles with localStorage persistence.
 * Provides bookmark toggle functionality and state management.
 */
export const useBookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
      setBookmarkedArticles(new Set(bookmarks));
    } catch (error) {
      console.error('Error loading bookmarks from localStorage:', error);
      setBookmarkedArticles(new Set());
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      const bookmarksArray = Array.from(bookmarkedArticles);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarksArray));
    } catch (error) {
      console.error('Error saving bookmarks to localStorage:', error);
    }
  }, [bookmarkedArticles]);

  /**
   * Toggle bookmark status for an article
   */
  const toggleBookmark = useCallback((articleId: number) => {
    setBookmarkedArticles(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId);
        toast({
          title: "बुकमार्क हटाया गया",
          description: "यह लेख आपके बुकमार्क से हटा दिया गया है।",
        });
      } else {
        newBookmarks.add(articleId);
        toast({
          title: "बुकमार्क किया गया",
          description: "यह लेख आपके बुकमार्क में जोड़ दिया गया है।",
        });
      }
      return newBookmarks;
    });
  }, [toast]);

  /**
   * Check if an article is bookmarked
   */
  const isBookmarked = useCallback((articleId: number) => {
    return bookmarkedArticles.has(articleId);
  }, [bookmarkedArticles]);

  /**
   * Get all bookmarked article IDs
   */
  const getBookmarkedIds = useCallback(() => {
    return Array.from(bookmarkedArticles);
  }, [bookmarkedArticles]);

  /**
   * Clear all bookmarks
   */
  const clearAllBookmarks = useCallback(() => {
    setBookmarkedArticles(new Set());
    toast({
      title: "सभी बुकमार्क हटाए गए",
      description: "आपके सभी बुकमार्क हटा दिए गए हैं।",
    });
  }, [toast]);

  return {
    bookmarkedArticles,
    toggleBookmark,
    isBookmarked,
    getBookmarkedIds,
    clearAllBookmarks,
    bookmarkCount: bookmarkedArticles.size,
  };
};