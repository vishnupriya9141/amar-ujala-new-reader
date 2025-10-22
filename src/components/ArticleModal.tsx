import { memo } from "react";
import { X, Calendar, Clock, Eye, Share2, Facebook, Twitter, Copy, Bookmark, BookmarkCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { NewsArticle } from "@/types";

/**
 * ArticleModal component that displays the full article content in a modal dialog.
 * Memoized for performance optimization.
 */
const ArticleModal = memo(({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onBookmarkToggle
}: {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (id: number) => void;
}) => {
  const { toast } = useToast();

  if (!article) return null;

  const shareUrl = `${window.location.origin}/article/${article.id}`;
  const shareText = `${article.title} - ${article.excerpt.substring(0, 100)}...`;

  /**
   * Handles sharing the article on different platforms.
   */
  const handleShare = (platform: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {article.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={article.image}
              alt={`${article.title} के लिए छवि`}
              className="w-full h-[300px] object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-[hsl(var(--news-category-bg))] hover:bg-[hsl(var(--news-hover))]">
              {article.category}
            </Badge>
          </div>

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
              {onBookmarkToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBookmarkToggle(article.id)}
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
                    // Toggle share options - for simplicity, we'll show them directly
                    // In a real app, you might want to manage state for this
                  }}
                  aria-label="शेयर विकल्प"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                {/* Share options could be added here */}
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
      </DialogContent>
    </Dialog>
  );
});

ArticleModal.displayName = "ArticleModal";

export default ArticleModal;