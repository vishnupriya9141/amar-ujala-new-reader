import { AlertCircle } from "lucide-react";

/**
 * Array of breaking news headlines for the ticker display.
 */
const breakingNews = [
  "बड़ी खबर: संसद में ऐतिहासिक बिल पास",
  "शेयर बाजार में रिकॉर्ड तेजी",
  "भारतीय टीम ने जीता मैच",
  "नई तकनीक में भारत अव्वल",
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
