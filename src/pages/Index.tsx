import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import NewsGrid from "@/components/NewsGrid";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFilteredArticles } from "@/hooks/useFilteredArticles";
import { useBookmarks } from "@/hooks/useBookmarks";

/**
 * Main Index page component that renders the news application.
 */
const Index = ({ onShowBookmarks }: { onShowBookmarks: () => void }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { toast } = useToast();

  const articlesPerLoad = 6;
  const { articles: filteredArticles, isLoading: articlesLoading, error: articlesError } = useFilteredArticles(selectedCategory, searchQuery);

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
     toggleBookmark(articleId);
   }, [toggleBookmark]);
  
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
            <ErrorBoundaryWrapper>
              <NewsGrid
                articles={displayedArticles.map(article => ({
                  ...article,
                  isBookmarked: isBookmarked(article.id)
                }))}
                selectedCategory={selectedCategory}
                onArticleClick={handleArticleClick}
                onBookmarkToggle={handleBookmarkToggle}
                isLoading={articlesLoading || isLoading}
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
            </ErrorBoundaryWrapper>
          </div>

          <aside className="lg:col-span-1 space-y-6" role="complementary" aria-label="ट्रेंडिंग समाचार और मौसम">
            <ErrorBoundaryWrapper>
              <WeatherWidget />
            </ErrorBoundaryWrapper>
            <ErrorBoundaryWrapper>
              <TrendingSection onTopicClick={handleTrendingClick} />
            </ErrorBoundaryWrapper>
          </aside>
        </div>

        <ErrorBoundaryWrapper>
          <Newsletter />
        </ErrorBoundaryWrapper>
      </main>

      <Footer />
    </div>
  );
};


export default Index;