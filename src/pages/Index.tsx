import { useState, useCallback } from "react";

import Header from "@/components/Header";
import NewsGrid from "@/components/NewsGrid";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useFilteredArticles } from "@/hooks/useFilteredArticles";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const { toast } = useToast();

  const filteredArticles = useFilteredArticles(selectedCategory);

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

  return (
    <div className="min-h-screen bg-background">
      <header role="banner">
        <Header
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </header>
      
      <BreakingNews />
      
      <main className="container mx-auto px-4 py-8" role="main">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsGrid
              articles={filteredArticles}
              selectedCategory={selectedCategory}
              onArticleClick={handleArticleClick}
            />
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
