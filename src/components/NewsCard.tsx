
import { memo, useState, useCallback, lazy, Suspense } from "react";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, Copy, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewsCardProps } from "@/types";

// Lazy load the image component for better performance
const LazyImage = lazy(() => import("@/components/LazyImage"));

/**
 * NewsCard component that displays individual news article information with interactive features.
 * Memoized for performance optimization.
 */
const NewsCard = memo(({ id, title, excerpt, category, image, date, readTime, featured, views, isRead, isBookmarked, onClick, onBookmarkToggle }: NewsCardProps) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}/article/${id}`;
  const shareText = `${title} - ${excerpt.substring(0, 100)}...`;

  /**
    * Handles sharing the article on different platforms.
    * Memoized to prevent unnecessary re-renders.
    */
  const handleShare = useCallback((platform: string) => {
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
        setShowShareOptions(false);
        return;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setShowShareOptions(false);
  }, [shareUrl, shareText, toast]);

  return (
    <Card
      className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${featured ? 'lg:col-span-2 lg:row-span-2' : ''} ${isRead ? 'opacity-75' : ''}`}
      onClick={() => onClick(id)}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(id);
        }
      }}
      aria-label={`${title} - ${category} श्रेणी में ${date} को प्रकाशित${isRead ? ' (पढ़ा हुआ)' : ''}`}
      aria-describedby={`article-${id}-description`}
    >
      {image && (
        <div className="relative overflow-hidden">
          <Suspense fallback={
            <div className={`w-full bg-gray-200 animate-pulse ${featured ? 'h-[400px]' : 'h-[200px]'}`} />
          }>
            <LazyImage
              src={image}
              alt={`${title} के लिए छवि`}
              className={`transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-[400px]' : 'h-[200px]'}`}
            />
          </Suspense>
          <Badge className="absolute top-4 left-4 bg-[hsl(var(--news-category-bg))] hover:bg-[hsl(var(--news-hover))] z-10">
            {category}
          </Badge>
        </div>
      )}

      <CardHeader>
        <h3
          className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}
          id={`article-${id}-title`}
        >
          {title}
        </h3>
      </CardHeader>

      <CardContent>
        <p
          className={`text-muted-foreground mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}
          id={`article-${id}-description`}
          aria-describedby={`article-${id}-meta`}
        >
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-4 text-sm text-muted-foreground"
            id={`article-${id}-meta`}
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={date.replace(/\s+/g, '-').toLowerCase()}>{date}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
            {views && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" aria-hidden="true" />
                <span aria-label={`${views.toLocaleString()} views`}>{views.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onBookmarkToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmarkToggle(id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={isBookmarked ? "बुकमार्क हटाएं" : "बुकमार्क करें"}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </Button>
            )}

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareOptions(!showShareOptions);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="शेयर विकल्प"
              >
                <Share2 className="w-4 h-4" />
              </Button>

              {showShareOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-md shadow-lg p-2 z-10">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare('facebook');
                      }}
                      aria-label="Facebook पर शेयर करें"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare('twitter');
                      }}
                      aria-label="Twitter पर शेयर करें"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare('copy');
                      }}
                      aria-label="लिंक कॉपी करें"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

NewsCard.displayName = "NewsCard";

export default NewsCard;
