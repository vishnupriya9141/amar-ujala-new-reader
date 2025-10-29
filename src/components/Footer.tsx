import { memo } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

/**
 * Footer component that displays site information, links, and social media icons.
 * Memoized for performance optimization.
 */
const Footer = memo(() => {
  return (
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
          <p className="text-muted-foreground">© {new Date().getFullYear()} अमर उजाला. सर्वाधिकार सुरक्षित.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;