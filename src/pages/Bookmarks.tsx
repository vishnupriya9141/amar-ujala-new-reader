import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/types";

/**
 * Bookmarks page component that displays all saved/bookmarked articles.
 */
const Bookmarks = ({ onBack }: { onBack: () => void }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsArticle[]>([]);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Fetch all articles from API
    fetch('http://localhost:3002/api/news')
      .then(response => response.json())
      .then(data => setAllArticles(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  useEffect(() => {
    // Load bookmarked articles from localStorage
    const loadBookmarkedArticles = () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
      const articles = bookmarks.map((id: number) =>
        allArticles.find(article => article.id === id)
      ).filter(Boolean);
      setBookmarkedArticles(articles);
    };

    if (allArticles.length > 0) {
      loadBookmarkedArticles();
    }

    // Listen for storage changes (in case bookmarks are updated in another tab)
    const handleStorageChange = () => {
      loadBookmarkedArticles();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [allArticles]);

  const handleArticleClick = (id: number) => {
    // For now, we'll open the article in the modal
    // In a real app, this might navigate to a dedicated article page
    const article = bookmarkedArticles.find(a => a.id === id);
    if (article) {
      // Since we're in a separate page, we could potentially open the modal here too
      // But for simplicity, we'll just log for now
      console.log('Clicked bookmarked article:', id);
    }
  };

  const handleBookmarkToggle = (id: number) => {
    // Remove from bookmarks
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    const updatedBookmarks = bookmarks.filter((articleId: number) => articleId !== id);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));

    // Update local state
    setBookmarkedArticles(prev => prev.filter(article => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="वापस जाएं"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">बुकमार्क किए गए समाचार</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {bookmarkedArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {bookmarkedArticles.map((article) => (
              <NewsCard
                key={article.id}
                {...article}
                isBookmarked={true}
                onClick={handleArticleClick}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              कोई बुकमार्क नहीं किया गया
            </h2>
            <p className="text-muted-foreground mb-6">
              आपने अभी तक कोई समाचार बुकमार्क नहीं किया है। दिलचस्प लेखों को सेव करने के लिए बुकमार्क बटन पर क्लिक करें।
            </p>
            <Button onClick={onBack} variant="outline">
              मुख्य पृष्ठ पर वापस जाएं
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;