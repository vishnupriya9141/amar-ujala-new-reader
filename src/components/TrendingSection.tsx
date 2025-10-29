import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import Section from "./ui/Section";
import { TrendingSectionProps } from "@/types";
import { newsApi, NewsArticle } from "@/lib/api-client";

/**
 * TrendingSection component that displays a list of trending news items with click handlers.
 */
const TrendingSection = ({ onTopicClick }: TrendingSectionProps) => {
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await newsApi.getAll();
        if (response.success) {
          const top5News = response.data.slice(0, 5);
          setTrendingNews(top5News);
        } else {
          setError("Failed to load trending news");
        }
      } catch (err) {
        setError("Error fetching trending news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  if (loading) {
    return (
      <Section
        title="ट्रेंडिंग"
        icon={<TrendingUp className="w-5 h-5 text-accent" />}
        className="bg-card border border-border rounded-lg p-6 sticky top-24"
        titleClassName="text-xl font-bold text-foreground"
        contentClassName="space-y-2"
      >
        <div className="text-center py-4">लोड हो रहा है...</div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section
        title="ट्रेंडिंग"
        icon={<TrendingUp className="w-5 h-5 text-accent" />}
        className="bg-card border border-border rounded-lg p-6 sticky top-24"
        titleClassName="text-xl font-bold text-foreground"
        contentClassName="space-y-2"
      >
        <div className="text-center py-4 text-destructive">{error}</div>
      </Section>
    );
  }

  return (
    <Section
      title="ट्रेंडिंग"
      icon={<TrendingUp className="w-5 h-5 text-accent" />}
      className="bg-card border border-border rounded-lg p-6 sticky top-24"
      titleClassName="text-xl font-bold text-foreground"
      contentClassName="space-y-2"
    >
      {trendingNews.map((news, index) => (
        <button
          key={news.id}
          className="flex items-center gap-3 w-full text-left p-3 rounded-md hover:bg-secondary transition-colors group cursor-pointer"
          onClick={() => onTopicClick(news.title)}
        >
          <span className="text-accent font-bold text-lg">{index + 1}</span>
          <span className="text-foreground group-hover:text-primary transition-colors font-medium">
            {news.title}
          </span>
        </button>
      ))}
    </Section>
  );
};

export default TrendingSection;
