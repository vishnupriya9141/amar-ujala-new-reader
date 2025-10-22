import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import TrendingSection from "@/components/TrendingSection";
import BreakingNews from "@/components/BreakingNews";
import Newsletter from "@/components/Newsletter";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import heroImage from "@/assets/hero-news.jpg";
import politicsImage from "@/assets/politics-news.jpg";
import businessImage from "@/assets/business-news.jpg";
import sportsImage from "@/assets/sports-news.jpg";
import techImage from "@/assets/tech-news.jpg";
import entertainmentImage from "@/assets/entertainment-news.jpg";

const newsArticles = [
  {
    id: 1,
    title: "संसद में आज होगी महत्वपूर्ण बिल पर चर्चा, विपक्ष ने दर्ज किया विरोध",
    excerpt: "नई दिल्ली में आज संसद के दोनों सदनों में महत्वपूर्ण विधेयक पर चर्चा होगी। विपक्षी दलों ने इस बिल का विरोध करते हुए सरकार पर निशाना साधा है।",
    category: "राजनीति",
    image: politicsImage,
    date: "22 अक्टूबर 2025",
    readTime: "5 मिनट",
    featured: true,
  },
  {
    id: 2,
    title: "शेयर बाजार में तेजी, सेंसेक्स 500 अंक चढ़ा",
    excerpt: "आज शेयर बाजार में जबरदस्त तेजी देखने को मिली। सेंसेक्स 500 अंकों की छलांग लगाकर नई ऊंचाई पर पहुंच गया।",
    category: "व्यापार",
    image: businessImage,
    date: "22 अक्टूबर 2025",
    readTime: "3 मिनट",
  },
  {
    id: 3,
    title: "भारतीय क्रिकेट टीम ने ऑस्ट्रेलिया को 5 विकेट से हराया",
    excerpt: "मेलबर्न में खेले गए मैच में भारतीय टीम ने शानदार प्रदर्शन करते हुए ऑस्ट्रेलिया को 5 विकेट से हरा दिया।",
    category: "खेल",
    image: sportsImage,
    date: "22 अक्टूबर 2025",
    readTime: "4 मिनट",
  },
  {
    id: 4,
    title: "आर्टिफिशियल इंटेलिजेंस में भारत की बढ़ती भागीदारी",
    excerpt: "भारतीय कंपनियां आर्टिफिशियल इंटेलिजेंस के क्षेत्र में तेजी से आगे बढ़ रही हैं। नई तकनीकों में निवेश बढ़ा है।",
    category: "तकनीक",
    image: techImage,
    date: "22 अक्टूबर 2025",
    readTime: "6 मिनट",
  },
  {
    id: 5,
    title: "बॉलीवुड की नई फिल्म ने पहले दिन कमाए 50 करोड़",
    excerpt: "इस साल की सबसे प्रतीक्षित फिल्म ने बॉक्स ऑफिस पर धमाकेदार शुरुआत की है। पहले दिन 50 करोड़ की कमाई हुई।",
    category: "मनोरंजन",
    image: entertainmentImage,
    date: "22 अक्टूबर 2025",
    readTime: "3 मिनट",
  },
  {
    id: 6,
    title: "प्रधानमंत्री की विदेश यात्रा, कई महत्वपूर्ण समझौते हुए",
    excerpt: "प्रधानमंत्री ने अपनी विदेश यात्रा में कई देशों के साथ व्यापार और रक्षा समझौतों पर हस्ताक्षर किए हैं।",
    category: "राजनीति",
    image: politicsImage,
    date: "22 अक्टूबर 2025",
    readTime: "7 मिनट",
  },
  {
    id: 7,
    title: "पेट्रोल-डीजल की कीमतों में फिर बदलाव, जानें नई दरें",
    excerpt: "आज पेट्रोल और डीजल की कीमतों में बदलाव किया गया है। प्रमुख शहरों में नई दरें लागू हो गई हैं।",
    category: "व्यापार",
    image: businessImage,
    date: "22 अक्टूबर 2025",
    readTime: "2 मिनट",
  },
  {
    id: 8,
    title: "ओलंपिक में भारत का बेहतरीन प्रदर्शन, 5 पदक जीते",
    excerpt: "चल रहे ओलंपिक खेलों में भारतीय खिलाड़ियों ने शानदार प्रदर्शन करते हुए अब तक 5 पदक जीत लिए हैं।",
    category: "खेल",
    image: sportsImage,
    date: "22 अक्टूबर 2025",
    readTime: "5 मिनट",
  },
  {
    id: 9,
    title: "5G नेटवर्क का विस्तार, 100 नए शहरों में शुरू होगी सेवा",
    excerpt: "दूरसंचार कंपनियों ने 5G सेवाओं का विस्तार करते हुए 100 नए शहरों में सेवा शुरू करने की घोषणा की है।",
    category: "तकनीक",
    image: techImage,
    date: "22 अक्टूबर 2025",
    readTime: "4 मिनट",
  },
  {
    id: 10,
    title: "मशहूर गायक का नया एल्बम रिलीज, फैंस में जबरदस्त उत्साह",
    excerpt: "देश के मशहूर गायक ने अपना नया म्यूजिक एल्बम रिलीज किया है जो सोशल मीडिया पर वायरल हो रहा है।",
    category: "मनोरंजन",
    image: entertainmentImage,
    date: "22 अक्टूबर 2025",
    readTime: "3 मिनट",
  },
  {
    id: 11,
    title: "राज्य चुनावों की तैयारी पूरी, मतदान की तारीख घोषित",
    excerpt: "चुनाव आयोग ने तीन राज्यों में होने वाले विधानसभा चुनावों की तारीखों की घोषणा कर दी है। सभी पार्टियां तैयारी में जुट गई हैं।",
    category: "राजनीति",
    image: politicsImage,
    date: "21 अक्टूबर 2025",
    readTime: "6 मिनट",
  },
  {
    id: 12,
    title: "स्टार्टअप इंडिया: युवा उद्यमियों को मिलेगी विशेष सहायता",
    excerpt: "सरकार ने स्टार्टअप इंडिया के तहत युवा उद्यमियों के लिए नई योजनाओं की घोषणा की है जिसमें फंडिंग और मार्गदर्शन शामिल है।",
    category: "व्यापार",
    image: businessImage,
    date: "21 अक्टूबर 2025",
    readTime: "5 मिनट",
  },
  {
    id: 13,
    title: "आईपीएल 2026 की नीलामी में रिकॉर्ड तोड़ बोलियां",
    excerpt: "आईपीएल 2026 के लिए हुई खिलाड़ियों की नीलामी में कई खिलाड़ियों को रिकॉर्ड कीमत पर खरीदा गया।",
    category: "खेल",
    image: sportsImage,
    date: "21 अक्टूबर 2025",
    readTime: "4 मिनट",
  },
  {
    id: 14,
    title: "साइबर सुरक्षा: नए खतरों से बचने के उपाय",
    excerpt: "साइबर विशेषज्ञों ने नए साइबर खतरों की चेतावनी दी है और उपभोक्ताओं को सुरक्षा उपाय अपनाने की सलाह दी है।",
    category: "तकनीक",
    image: techImage,
    date: "21 अक्टूबर 2025",
    readTime: "5 मिनट",
  },
  {
    id: 15,
    title: "ओटीटी प्लेटफॉर्म पर रिलीज होगी बड़ी फिल्म, सिनेमाघरों को टक्कर",
    excerpt: "एक बड़ी बॉलीवुड फिल्म सीधे ओटीटी प्लेटफॉर्म पर रिलीज होने जा रही है, जो सिनेमाघरों के लिए चुनौती है।",
    category: "मनोरंजन",
    image: entertainmentImage,
    date: "21 अक्टूबर 2025",
    readTime: "4 मिनट",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("सभी");
  const { toast } = useToast();

  const filteredArticles = selectedCategory === "सभी" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (id: number) => {
    const article = newsArticles.find(a => a.id === id);
    if (article) {
      toast({
        title: article.title,
        description: `${article.excerpt} - पूर्ण लेख जल्द ही उपलब्ध होगा।`,
      });
    }
  };

  const handleTrendingClick = (topic: string) => {
    toast({
      title: "ट्रेंडिंग विषय",
      description: `"${topic}" के बारे में समाचार खोजे जा रहे हैं...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <BreakingNews />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-accent"></div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCategory === "सभी" ? "मुख्य समाचार" : selectedCategory}
                </h2>
              </div>
              
              {filteredArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <NewsCard key={article.id} {...article} onClick={handleArticleClick} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    इस श्रेणी में कोई समाचार उपलब्ध नहीं है।
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <TrendingSection onTopicClick={handleTrendingClick} />
          </aside>
        </div>
        
        <Newsletter />
      </main>

      <footer className="bg-card border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">अमर उजाला</h3>
              <p className="text-muted-foreground">
                भारत का विश्वसनीय समाचार पत्र। हर खबर, हर पल।
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">महत्वपूर्ण लिंक</h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline">
                  हमारे बारे में
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline">
                  संपर्क करें
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline">
                  गोपनीयता नीति
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline">
                  नियम और शर्तें
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:underline">
                  विज्ञापन
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-4">हमें फॉलो करें</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted-foreground">© 2025 अमर उजाला. सर्वाधिकार सुरक्षित.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
