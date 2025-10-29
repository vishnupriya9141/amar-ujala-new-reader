import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import NewsGrid from "@/components/NewsGrid";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFilteredArticles } from "@/hooks/useFilteredArticles";
import { NewsArticle } from "@/types";

/**
 * Main Index page component that renders the news application.
 */
const Index = ({ onShowBookmarks }: { onShowBookmarks: () => void }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const articlesPerLoad = 6;
  const filteredArticles = useFilteredArticles(selectedCategory, searchQuery);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleArticles);
  }, [filteredArticles, visibleArticles]);

  const hasMoreArticles = visibleArticles < filteredArticles.length;
  
  /**
    * Handles article click events by navigating to the article page.
    */
   const handleArticleClick = useCallback((id: number) => {
     navigate(`/article/${id}`);
   }, [navigate]);

   /**
    * Handles bookmark toggle for articles.
    */
   const handleBookmarkToggle = useCallback((articleId: number) => {
     setBookmarkedArticles(prev => {
       const newBookmarks = new Set(prev);
       if (newBookmarks.has(articleId)) {
         newBookmarks.delete(articleId);
         // Remove from localStorage
         const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
         const updatedBookmarks = bookmarks.filter((id: number) => id !== articleId);
         localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
         toast({
           title: "बुकमार्क हटाया गया",
           description: "यह लेख आपके बुकमार्क से हटा दिया गया है।",
         });
       } else {
         newBookmarks.add(articleId);
         // Add to localStorage
         const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
         bookmarks.push(articleId);
         localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
         toast({
           title: "बुकमार्क किया गया",
           description: "यह लेख आपके बुकमार्क में जोड़ दिया गया है।",
         });
       }
       return newBookmarks;
     });
   }, [toast]);
  
  /**
   * Handles trending topic click events by showing a toast notification.
   */
  const handleTrendingClick = useCallback((topic: string) => {
    toast({
      title: "ट्रेंडिंग विषय",
      description: `"${topic}" के बारे में समाचार खोजे जा रहे हैं...`,
    });
  }, [toast]);
  
  
  /**
   * Loads more articles by increasing the visible count with a simulated delay.
   */
  const loadMoreArticles = useCallback(() => {
    if (!isLoading && hasMoreArticles) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleArticles(prev => prev + articlesPerLoad);
        setIsLoading(false);
      }, 500); // Simulate loading delay
    }
  }, [isLoading, hasMoreArticles, articlesPerLoad]);
  
  /**
   * Handles scroll events to trigger loading more articles when near bottom.
   */
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      loadMoreArticles();
    }
  }, [loadMoreArticles]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Resets visible articles count when filters change.
   */
  useEffect(() => {
    setVisibleArticles(articlesPerLoad);
  }, [selectedCategory, searchQuery, articlesPerLoad]);

  return (
    <div className="min-h-screen bg-background">
      <header role="banner">
        <Header
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onShowBookmarks={onShowBookmarks}
        />
      </header>
      
      <BreakingNews />
      
      <main className="container mx-auto px-4 py-8" role="main">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsGrid
              articles={displayedArticles.map(article => ({
                ...article,
                isBookmarked: bookmarkedArticles.has(article.id)
              }))}
              selectedCategory={selectedCategory}
              onArticleClick={handleArticleClick}
              onBookmarkToggle={handleBookmarkToggle}
              isLoading={isLoading}
            />

            {hasMoreArticles && (
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  onClick={loadMoreArticles}
                  disabled={isLoading}
                >
                  {isLoading ? "लोड हो रहा है..." : "और समाचार लोड करें"}
                </Button>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-6" role="complementary" aria-label="ट्रेंडिंग समाचार और मौसम">
            <WeatherWidget />
            <TrendingSection onTopicClick={handleTrendingClick} />
          </aside>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};


export default Index;
