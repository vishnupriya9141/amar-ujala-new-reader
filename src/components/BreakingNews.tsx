import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { newsApi, NewsArticle } from "@/lib/api-client";

/**
 * BreakingNews component that displays a scrolling ticker of breaking news headlines.
 */
const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await newsApi.getAll();
        if (response.success) {
          const top5Titles = response.data.slice(0, 5).map((article: NewsArticle) => article.title);
          setBreakingNews(top5Titles);
        } else {
          setError("Failed to load breaking news");
        }
      } catch (err) {
        setError("Error fetching breaking news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-destructive text-destructive-foreground py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 whitespace-nowrap font-bold">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span>ब्रेकिंग न्यूज</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="inline-block mx-8">लोड हो रहा है...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive text-destructive-foreground py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 whitespace-nowrap font-bold">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span>ब्रेकिंग न्यूज</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="inline-block mx-8">{error}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-destructive text-destructive-foreground py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap font-bold">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span>ब्रेकिंग न्यूज</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {breakingNews.map((news, index) => (
                <span key={index} className="inline-block mx-8">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
