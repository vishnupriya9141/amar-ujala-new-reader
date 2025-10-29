import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Bookmarks from "./pages/Bookmarks";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Main App component that sets up providers and routing for the application.
 */
const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'bookmarks'>('home');

  const handleShowBookmarks = () => {
    setCurrentView('bookmarks');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  currentView === 'home' ? (
                    <Index onShowBookmarks={handleShowBookmarks} />
                  ) : (
                    <Bookmarks onBack={handleBackToHome} />
                  )
                } />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
