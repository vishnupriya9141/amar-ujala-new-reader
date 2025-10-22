import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

/**
 * NewsCardSkeleton component that displays a loading skeleton for news cards.
 */
const NewsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-[200px]" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCardSkeleton;