import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, Copy, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewsArticle } from "@/types";
import { newsApi } from "@/lib/api-client";
import { useBookmarks } from "@/hooks/useBookmarks";

// Lazy load components for better performance
const LazyImage = lazy(() => import("@/components/LazyImage"));

/**
 * ArticlePage component that displays the full article content on a dedicated page.
 * Uses React Query for efficient data fetching and caching.
 */
const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Fetch article using React Query
  const {
    data: article,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!id) throw new Error('Article ID is required');
      const response = await newsApi.getById(parseInt(id, 10));
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const handleBookmarkToggle = () => {
    if (!article) return;
    toggleBookmark(article.id);
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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">लेख लोड करने में त्रुटि</h1>
          <p className="text-muted-foreground mb-4">क्षमा करें, लेख लोड नहीं किया जा सका।</p>
          <Button onClick={() => navigate('/')}>मुख्य पृष्ठ पर वापस जाएं</Button>
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
              <Suspense fallback={
                <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
              }>
                <LazyImage
                  src={article.image}
                  alt={`${article.title} के लिए छवि`}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </Suspense>
              <Badge className="absolute top-4 left-4 bg-[hsl(var(--news-category-bg))] hover:bg-[hsl(var(--news-hover))] z-10">
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
                aria-label={isBookmarked(article.id) ? "बुकमार्क हटाएं" : "बुकमार्क करें"}
              >
                {isBookmarked(article.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
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