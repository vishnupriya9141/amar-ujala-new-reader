import { useState, useCallback, useMemo, useEffect } from "react";

import Header from "@/components/Header";
import NewsGrid from "@/components/NewsGrid";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFilteredArticles } from "@/hooks/useFilteredArticles";

const Index = () => {
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

  const handleArticleClick = useCallback((id: number) => {
    // For now, we'll use the filtered articles to find the article
    const article = filteredArticles.find(a => a.id === id);
    if (article) {
      toast({
        title: article.title,
        description: `${article.excerpt} - पूर्ण लेख जल्द ही उपलब्ध होगा।`,
      });
    }
  }, [filteredArticles, toast]);

  const handleTrendingClick = useCallback((topic: string) => {
    toast({
      title: "ट्रेंडिंग विषय",
      description: `"${topic}" के बारे में समाचार खोजे जा रहे हैं...`,
    });
  }, [toast]);

  const handleBookmarkToggle = useCallback((articleId: number) => {
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

  const loadMoreArticles = useCallback(() => {
    if (!isLoading && hasMoreArticles) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleArticles(prev => prev + articlesPerLoad);
        setIsLoading(false);
      }, 500); // Simulate loading delay
    }
  }, [isLoading, hasMoreArticles, articlesPerLoad]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      loadMoreArticles();
    }
  }, [loadMoreArticles]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset visible articles when filters change
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

          <aside className="lg:col-span-1" role="complementary" aria-label="ट्रेंडिंग समाचार">
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
