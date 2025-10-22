import { useState } from "react";

import Header from "@/components/Header";
import NewsGrid from "@/components/NewsGrid";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { newsArticles } from "@/data/newsData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const { toast } = useToast();

  const filteredArticles = selectedCategory === "सभी" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (id: number) => {
    const article = newsArticles.find(a => a.id === id);
    if (article) {
      toast({
        title: article.title,
        description: `${article.excerpt} - पूर्ण लेख जल्द ही उपलब्ध होगा।`,
      });
    }
  };

  const handleTrendingClick = (topic: string) => {
    toast({
      title: "ट्रेंडिंग विषय",
      description: `"${topic}" के बारे में समाचार खोजे जा रहे हैं...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <BreakingNews />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsGrid
              articles={filteredArticles}
              selectedCategory={selectedCategory}
              onArticleClick={handleArticleClick}
            />
          </div>

          <aside className="lg:col-span-1">
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
