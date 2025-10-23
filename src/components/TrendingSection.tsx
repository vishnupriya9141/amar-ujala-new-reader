import { TrendingUp } from "lucide-react";
import Section from "./ui/Section";
import { TrendingSectionProps } from "@/types";

/**
 * Array of trending topics for display in the sidebar.
 */
const trendingTopics = [
  "चुनाव 2025",
  "भारत का AI सुपरपावर दर्जा",
  "क्रिकेट विश्व कप 2025",
  "इलेक्ट्रिक वाहन क्रांति",
  "बॉलीवुड रिकॉर्ड कमाई",
];

/**
 * TrendingSection component that displays a list of trending topics with click handlers.
 */
const TrendingSection = ({ onTopicClick }: TrendingSectionProps) => {
  return (
    <Section
      title="ट्रेंडिंग"
      icon={<TrendingUp className="w-5 h-5 text-accent" />}
      className="bg-card border border-border rounded-lg p-6 sticky top-24"
      titleClassName="text-xl font-bold text-foreground"
      contentClassName="space-y-2"
    >
      {trendingTopics.map((topic, index) => (
        <button
          key={topic}
          className="flex items-center gap-3 w-full text-left p-3 rounded-md hover:bg-secondary transition-colors group cursor-pointer"
          onClick={() => onTopicClick(topic)}
        >
          <span className="text-accent font-bold text-lg">{index + 1}</span>
          <span className="text-foreground group-hover:text-primary transition-colors font-medium">
            {topic}
          </span>
        </button>
      ))}
    </Section>
  );
};

export default TrendingSection;
