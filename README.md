# Amar Ujala Reader

A React-based news reader application for Amar Ujala.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Project Structure

```
amar-ujala-new-reader/
├── .dockerignore                   # Docker ignore file
├── .gitignore                      # Git ignore file
├── bun.lockb                       # Bun lock file
├── components.json                 # shadcn-ui components configuration
├── Dockerfile                      # Docker configuration
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── nginx.conf                      # Nginx configuration
├── package-lock.json               # NPM lock file
├── package.json                    # NPM package configuration
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project documentation
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.app.json               # TypeScript app configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript node configuration
├── vite.config.ts                  # Vite configuration
├── public/                         # Static assets
│   ├── favicon.ico                 # Website favicon
│   ├── placeholder.svg             # Placeholder image
│   └── robots.txt                  # Robots.txt for SEO
├── server/                         # Backend server
│   ├── .env                        # Environment variables
│   ├── package-lock.json           # NPM lock file for server
│   ├── package.json                # NPM package configuration for server
│   ├── server.js                   # Express server entry point
│   └── assets/                     # Server assets
│       ├── business-news.jpg       # Business news category image
│       ├── entertainment-news.jpg  # Entertainment news category image
│       ├── hero-news.jpg           # Hero section image
│       ├── politics-news.jpg       # Politics news category image
│       ├── sports-news.jpg         # Sports news category image
│       └── tech-news.jpg           # Technology news category image
└── src/                            # Source code
    ├── App.tsx                     # Main App component
    ├── index.css                   # Index CSS styles
    ├── main.tsx                    # Application entry point
    ├── types.ts                    # TypeScript type definitions
    ├── assets/                     # Image assets
    │   ├── business-news.jpg       # Business news category image
    │   ├── entertainment-news.jpg  # Entertainment news category image
    │   ├── hero-news.jpg           # Hero section image
    │   ├── politics-news.jpg       # Politics news category image
    │   ├── sports-news.jpg         # Sports news category image
    │   └── tech-news.jpg           # Technology news category image
    ├── components/                 # React components
    │   ├── ui/                     # Reusable UI components (shadcn-ui)
    │   │   ├── badge.tsx           # Badge component for tags/labels
    │   │   ├── button.tsx          # Button component with variants
    │   │   ├── card.tsx            # Card component for content containers
    │   │   ├── FormField.tsx       # Custom form field component
    │   │   ├── input.tsx           # Input field component
    │   │   ├── Section.tsx         # Custom section wrapper component
    │   │   ├── skeleton.tsx        # Skeleton loader component
    │   │   ├── sonner.tsx          # Toast notification component
    │   │   ├── toast.tsx           # Toast component
    │   │   ├── toaster.tsx         # Toast container component
    │   │   └── tooltip.tsx         # Tooltip component
    │   ├── BreakingNews.tsx        # Breaking news banner component
    │   ├── ErrorBoundary.tsx       # Error boundary for error handling
    │   ├── Footer.tsx              # Footer component with links
    │   ├── Header.tsx              # Header component with navigation
    │   ├── NewsCard.tsx            # Individual news article card
    │   ├── NewsCardSkeleton.tsx    # Skeleton loader for news cards
    │   ├── NewsGrid.tsx            # Grid layout for news articles
    │   ├── Newsletter.tsx          # Newsletter subscription component
    │   ├── TrendingSection.tsx     # Trending topics sidebar component
    │   └── WeatherWidget.tsx       # Weather information widget
    ├── hooks/                      # Custom React hooks
    │   ├── use-toast.ts            # Hook for toast notifications
    │   └── useFilteredArticles.ts  # Hook for filtering articles
    ├── lib/                        # Utility libraries
    │   └── utils.ts                # Utility functions
    └── pages/                      # Page components
        ├── ArticlePage.tsx         # Individual article page
        ├── Bookmarks.tsx           # Bookmarks page
        ├── Index.tsx               # Main page component
        └── NotFound.tsx            # 404 page component
```

## File Explanations

### Core Application Files
- **src/App.tsx**: Main application component that sets up routing, providers, and global layout. Wraps the app with QueryClient, ThemeProvider, and BrowserRouter for state management, theming, and navigation.
- **src/main.tsx**: Entry point of the React application. Renders the App component into the DOM and handles the initial setup.
- **src/pages/Index.tsx**: Main page component that orchestrates the news reader interface. Manages state for filtering, pagination, and user interactions like bookmarking and article clicks.
- **src/pages/ArticlePage.tsx**: Individual article page component for displaying full news articles.
- **src/pages/Bookmarks.tsx**: Page component for displaying bookmarked articles.
- **src/pages/NotFound.tsx**: 404 page component for handling invalid routes.

### Components
- **src/components/Header.tsx**: Navigation header with category selection, search functionality, and mobile menu. Provides filtering options and search capabilities for news articles.
- **src/components/NewsGrid.tsx**: Displays news articles in a responsive grid layout. Handles loading states and renders individual news cards with bookmark functionality.
- **src/components/NewsCard.tsx**: Individual news article card component with image, title, excerpt, and action buttons for bookmarking and sharing. Supports keyboard navigation and accessibility.
- **src/components/NewsCardSkeleton.tsx**: Skeleton loader component for news cards during loading states.
- **src/components/BreakingNews.tsx**: Banner component for displaying breaking news alerts at the top of the page.
- **src/components/TrendingSection.tsx**: Sidebar component showing trending topics with click handlers for topic selection.
- **src/components/Newsletter.tsx**: Subscription form component for newsletter sign-ups with email validation.
- **src/components/Footer.tsx**: Site footer with links, social media, and additional navigation options.
- **src/components/ErrorBoundary.tsx**: React error boundary component that catches JavaScript errors in the component tree and displays fallback UI.
- **src/components/WeatherWidget.tsx**: Widget component for displaying weather information.

### UI Components (shadcn-ui)
- **src/components/ui/badge.tsx**: Badge component for tags and labels.
- **src/components/ui/button.tsx**: Button component with various variants and styles.
- **src/components/ui/card.tsx**: Card component for content containers.
- **src/components/ui/FormField.tsx**: Custom form field component with validation.
- **src/components/ui/input.tsx**: Input field component.
- **src/components/ui/Section.tsx**: Custom section wrapper component.
- **src/components/ui/skeleton.tsx**: Skeleton loader component.
- **src/components/ui/sonner.tsx**: Toast notification component.
- **src/components/ui/toast.tsx**: Toast component for notifications.
- **src/components/ui/toaster.tsx**: Toast container component.
- **src/components/ui/tooltip.tsx**: Tooltip component for additional information.

### Data and Types
- **src/types.ts**: TypeScript interfaces and type definitions for news articles and component props. Defines the structure for NewsArticle and other data models.

### Hooks and Utilities
- **src/hooks/useFilteredArticles.ts**: Custom hook that filters news articles based on selected category and search query. Uses useMemo for performance optimization.
- **src/hooks/use-toast.ts**: Custom hook for managing toast notifications throughout the application.
- **src/lib/utils.ts**: Utility functions including className merging for Tailwind CSS classes.

### Server Files
- **server/server.js**: Express.js server for handling API requests and serving static assets.
- **server/package.json**: NPM package configuration for the server with dependencies.
- **server/.env**: Environment variables for server configuration.

### Configuration Files
- **package.json**: NPM package configuration with dependencies, scripts, and project metadata. Includes React, Vite, TypeScript, and UI library dependencies.
- **vite.config.ts**: Vite build tool configuration for development server, build process, and plugins.
- **tailwind.config.ts**: Tailwind CSS configuration with custom theme settings and plugin configurations.
- **tsconfig.json**: TypeScript compiler configuration for the application.
- **Dockerfile**: Docker configuration for containerizing the application.
- **nginx.conf**: Nginx configuration for production deployment.

## Getting Started

### Frontend Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Backend Server

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

### Docker Deployment

1. Build the Docker image: `docker build -t amar-ujala-reader .`
2. Run the container: `docker run -p 3000:80 amar-ujala-reader`

## Features

- Responsive news reader interface
- Category-based article filtering
- Search functionality
- Bookmarking articles
- Breaking news alerts
- Trending topics sidebar
- Newsletter subscription
- Weather widget
- Error boundary for robust error handling
- Docker containerization
- Nginx configuration for production