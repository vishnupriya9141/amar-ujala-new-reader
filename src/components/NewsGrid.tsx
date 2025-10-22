import { memo } from "react";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/data/newsData";

interface NewsGridProps {
  articles: NewsArticle[];
  selectedCategory: string;
  onArticleClick: (id: number) => void;
}

const NewsGrid = memo(({ articles, selectedCategory, onArticleClick }: NewsGridProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-accent"></div>
        <h2 className="text-2xl font-bold text-foreground">
          {selectedCategory === "सभी" ? "मुख्य समाचार" : selectedCategory}
        </h2>
      </div>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} {...article} onClick={onArticleClick} />
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