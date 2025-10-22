import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  "सभी",
  "राष्ट्रीय",
  "राजनीति",
  "व्यापार",
  "खेल",
  "मनोरंजन",
  "तकनीक",
  "स्वास्थ्य",
];

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header = ({ selectedCategory, onCategoryChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-primary">अमर उजाला</h1>
            
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`transition-colors font-medium cursor-pointer ${
                    selectedCategory === category 
                      ? 'text-primary font-bold border-b-2 border-primary' 
                      : 'text-foreground hover:text-primary hover:underline'
                  }`}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsMenuOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors cursor-pointer font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
                onClick={() => {
                  onCategoryChange(category);
                  setIsMenuOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
