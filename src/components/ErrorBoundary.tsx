import React, { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "@/types";

/**
 * ErrorBoundary class component that catches JavaScript errors anywhere in the child component tree.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  /**
   * Updates state when an error occurs.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Catches errors and logs them.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Error logging removed for production
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              कुछ गलत हो गया
            </h2>
            <p className="text-muted-foreground mb-4">
              पृष्ठ लोड करने में समस्या हुई है। कृपया पृष्ठ को रिफ्रेश करें।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              पृष्ठ रिफ्रेश करें
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;