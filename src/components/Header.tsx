import { useState } from "react";
import { Menu, X, Search, Moon, Sun, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { HeaderProps } from "@/types";

/**
 * Available news categories for filtering.
 */
const categories = [
  "सभी",
  "सामान्य", 
  "राष्ट्रीय",
  "राजनीति",
  "व्यापार",
  "खेल",
  "मनोरंजन",
  "तकनीक",
  "स्वास्थ्य",
];

/**
 * Header component that provides navigation, search, and theme toggle functionality.
 */
const Header = ({ selectedCategory, onCategoryChange, searchQuery, onSearchChange, onShowBookmarks }: HeaderProps & { onShowBookmarks?: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Get bookmarked articles from localStorage
  const getBookmarkedArticles = () => {
    const bookmarks = localStorage.getItem('bookmarkedArticles');
    return bookmarks ? JSON.parse(bookmarks) : [];
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-primary">अमर उजाला</h1>

            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <label htmlFor="search-input" className="sr-only">समाचार खोजें</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="खोजें..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                  aria-describedby="search-help"
                />
                <span id="search-help" className="sr-only">शीर्षक या सामग्री में खोजने के लिए टाइप करें</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="समाचार श्रेणियां">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`transition-colors font-medium cursor-pointer ${selectedCategory === category
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-foreground hover:text-primary hover:underline'
                    }`}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsMenuOpen(false);
                  }}
                  aria-pressed={selectedCategory === category}
                  aria-label={`${category} श्रेणी ${selectedCategory === category ? 'चयनित' : 'चुनें'}`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowBookmarks}
              aria-label="बुकमार्क किए गए समाचार देखें"
            >
              <Bookmark className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-4">
            <div className="px-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onShowBookmarks}
                aria-label="बुकमार्क किए गए समाचार देखें"
              >
                <Bookmark className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="थीम टॉगल करें"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">थीम टॉगल करें</span>
              </Button>

              <div className="relative flex-1">
                <label htmlFor="mobile-search-input" className="sr-only">समाचार खोजें</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
                <Input
                  id="mobile-search-input"
                  type="text"
                  placeholder="खोजें..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                  aria-describedby="mobile-search-help"
                />
                <span id="mobile-search-help" className="sr-only">शीर्षक या सामग्री में खोजने के लिए टाइप करें</span>
              </div>
            </div>

            <nav className="space-y-2" role="navigation" aria-label="मोबाइल समाचार श्रेणियां">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors cursor-pointer font-medium ${selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                    }`}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsMenuOpen(false);
                  }}
                  aria-pressed={selectedCategory === category}
                  aria-label={`${category} श्रेणी ${selectedCategory === category ? 'चयनित' : 'चुनें'}`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
