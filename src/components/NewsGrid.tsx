import { memo } from "react";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";
import { NewsArticle } from "@/data/newsData";

interface NewsGridProps {
  articles: NewsArticle[];
  selectedCategory: string;
  onArticleClick: (id: number) => void;
  onBookmarkToggle?: (id: number) => void;
  isLoading?: boolean;
}

const NewsGrid = memo(({ articles, selectedCategory, onArticleClick, onBookmarkToggle, isLoading = false }: NewsGridProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-accent"></div>
        <h2 className="text-2xl font-bold text-foreground">
          {selectedCategory === "सभी" ? "मुख्य समाचार" : selectedCategory}
        </h2>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              {...article}
              onClick={onArticleClick}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            इस श्रेणी में कोई समाचार उपलब्ध नहीं है।
          </p>
        </div>
      )}
    </section>
  );
});

NewsGrid.displayName = "NewsGrid";

export default NewsGrid;