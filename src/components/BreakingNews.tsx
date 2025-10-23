import { AlertCircle } from "lucide-react";

/**
 * Array of breaking news headlines for the ticker display.
 */
const breakingNews = [
  "बड़ी खबर: मोदी सरकार का नया कृषि कानून लागू",
  "शेयर बाजार 75,000 के पार पहुंचा",
  "भारतीय टीम विश्व कप फाइनल में पहुंची",
  "भारत बना दुनिया का पहला AI सुपरपावर राष्ट्र",
];

/**
 * BreakingNews component that displays a scrolling ticker of breaking news headlines.
 */
const BreakingNews = () => {
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
