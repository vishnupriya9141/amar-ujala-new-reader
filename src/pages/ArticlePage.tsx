import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, Copy, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewsArticle } from "@/types";

/**
 * ArticlePage component that displays the full article content on a dedicated page.
 */
const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3002/api/news/${id}`)
        .then(response => response.json())
        .then(data => {
          setArticle(data);
          setLoading(false);
          // Check if bookmarked
          const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
          setIsBookmarked(bookmarks.includes(data.id));
        })
        .catch(error => {
          console.error('Error fetching article:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBookmarkToggle = () => {
    if (!article) return;
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((articleId: number) => articleId !== article.id);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      toast({
        title: "बुकमार्क हटाया गया",
        description: "यह लेख आपके बुकमार्क से हटा दिया गया है।",
      });
    } else {
      bookmarks.push(article.id);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast({
        title: "बुकमार्क किया गया",
        description: "यह लेख आपके बुकमार्क में जोड़ दिया गया है।",
      });
    }
  };

  const handleShare = (platform: string) => {
    if (!article) return;
    const shareUrl = `${window.location.origin}/article/${article.id}`;
    const shareText = `${article.title} - ${article.excerpt.substring(0, 100)}...`;
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "लिंक कॉपी हो गया",
          description: "लिंक आपके क्लिपबोर्ड में कॉपी हो गया है।",
        });
        return;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">लेख नहीं मिला</h1>
          <Button onClick={() => navigate('/')}>मुख्य पृष्ठ पर वापस जाएं</Button>
        </div>
      </div>
    );
  }

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
                onClick={() => navigate('/')}
                aria-label="वापस जाएं"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold text-primary">समाचार</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Article Title */}
          <h1 className="text-3xl font-bold text-foreground">{article.title}</h1>

          {/* Article Image - Only if present */}
          {article.image && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt={`${article.title} के लिए छवि`}
                className="w-full h-[400px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-[hsl(var(--news-category-bg))] hover:bg-[hsl(var(--news-hover))]">
                {article.category}
              </Badge>
            </div>
          )}

          {/* Article Meta Information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={article.date.replace(/\s+/g, '-').toLowerCase()}>
                  {article.date}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
              {article.views && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmarkToggle}
                aria-label={isBookmarked ? "बुकमार्क हटाएं" : "बुकमार्क करें"}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </Button>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // For simplicity, show share options directly
                  }}
                  aria-label="शेयर विकल्प"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Article Excerpt */}
          <div className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
            {article.excerpt}
          </div>

          {/* Full Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {article.fullContent}
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">इस लेख को शेयर करें</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                aria-label="Facebook पर शेयर करें"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                aria-label="Twitter पर शेयर करें"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                aria-label="लिंक कॉपी करें"
              >
                <Copy className="w-4 h-4 mr-2" />
                कॉपी करें
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;