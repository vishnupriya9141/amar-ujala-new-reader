import { memo } from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface NewsCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  onClick: (id: number) => void;
}

const NewsCard = memo(({ id, title, excerpt, category, image, date, readTime, featured, onClick }: NewsCardProps) => {
  return (
    <Card
      className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
      onClick={() => onClick(id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${featured ? 'h-[400px]' : 'h-[200px]'}`}
        />
        <Badge className="absolute top-4 left-4 bg-[hsl(var(--news-category-bg))] hover:bg-[hsl(var(--news-hover))]">
          {category}
        </Badge>
      </div>
      
      <CardHeader>
        <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {title}
        </h3>
      </CardHeader>
      
      <CardContent>
        <p className={`text-muted-foreground mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

NewsCard.displayName = "NewsCard";

export default NewsCard;
