import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useState, Suspense, lazy } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
              <Suspense fallback={
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-primary mx-auto mb-4"></div>
                    <p>लोड हो रहा है...</p>
                  </div>
                </div>
              }>
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
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
