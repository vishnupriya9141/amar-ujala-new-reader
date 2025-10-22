/**
 * Interface representing a news article with its properties.
 */
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  views?: number;
  isRead?: boolean;
}

/**
 * Props interface for the ErrorBoundary component.
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * State interface for the ErrorBoundary component.
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Props interface for the Header component.
 */
export interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * Props interface for the NewsCard component.
 */
export interface NewsCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  views?: number;
  isRead?: boolean;
  isBookmarked?: boolean;
  onClick: (id: number) => void;
  onBookmarkToggle?: (id: number) => void;
}

/**
 * Props interface for the NewsGrid component.
 */
export interface NewsGridProps {
  articles: NewsArticle[];
  selectedCategory: string;
  onArticleClick: (id: number) => void;
  onBookmarkToggle?: (id: number) => void;
  isLoading?: boolean;
}

/**
 * Props interface for the TrendingSection component.
 */
export interface TrendingSectionProps {
  onTopicClick: (topic: string) => void;
}

/**
 * Props interface for the FormField component.
 */
export interface FormFieldProps {
  label?: string;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  required?: boolean;
  onSubmit?: (value: string) => void;
  children?: React.ReactNode;
}

/**
 * Props interface for the Section component.
 */
export interface SectionProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}