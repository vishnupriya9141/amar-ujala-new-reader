# Amar Ujala Reader

A high-performance, fully optimized React-based news reader application for Amar Ujala with enterprise-level features and modern development practices.

##  Technologies Used

This project is built with cutting-edge technologies:

- **Vite** - Lightning-fast build tool and development server
- **TypeScript** - Type-safe JavaScript with enhanced developer experience
- **React 18** - Modern React with concurrent features and hooks
- **React Query (@tanstack/react-query)** - Powerful data fetching and caching
- **Axios** - HTTP client with interceptors and error handling
- **shadcn-ui** - Modern, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Lucide React** - Beautiful, consistent icons
- **Express.js** - Backend server for API endpoints

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
    ├── assets/                     # Image assets (currently empty - images served from server)
    ├── components/                 # React components
    │   ├── ui/                     # Reusable UI components (shadcn-ui)
    │   │   ├── button.tsx          # Button component with variants
    │   │   ├── card.tsx            # Card component for content containers
    │   │   ├── FormField.tsx       # Custom form field component
    │   │   ├── input.tsx           # Input field component
    │   │   ├── LoadingSpinner.tsx  # Custom loading spinner component
    │   │   ├── Section.tsx         # Custom section wrapper component
    │   │   ├── skeleton.tsx        # Skeleton loader component
    │   │   ├── sonner.tsx          # Toast notification component
    │   │   ├── toast.tsx           # Toast component
    │   │   ├── toaster.tsx         # Toast container component
    │   │   └── tooltip.tsx         # Tooltip component
    │   ├── BreakingNews.tsx        # Breaking news banner component
    │   ├── ErrorBoundary.tsx       # Legacy error boundary
    │   ├── ErrorBoundaryWrapper.tsx # Enhanced error boundary with retry
    │   ├── Footer.tsx              # Footer component with links
    │   ├── Header.tsx              # Header component with navigation
    │   ├── LazyImage.tsx           # Optimized image component with lazy loading
    │   ├── NewsCard.tsx            # Individual news article card (memoized)
    │   ├── NewsCardSkeleton.tsx    # Skeleton loader for news cards (memoized)
    │   ├── NewsGrid.tsx            # Grid layout for news articles (memoized)
    │   ├── Newsletter.tsx          # Newsletter subscription component
    │   ├── TrendingSection.tsx     # Trending topics sidebar component
    │   └── WeatherWidget.tsx       # Weather information widget
    ├── hooks/                      # Custom React hooks
    │   ├── use-toast.ts            # Hook for toast notifications
    │   ├── useBookmarks.ts         # Hook for bookmark management
    │   ├── useDebounce.ts          # Hook for debounced search
    │   ├── useFilteredArticles.ts  # Hook for filtering articles with React Query
    │   ├── useIntersectionObserver.ts # Hook for intersection observer
    │   └── useLocalStorage.ts      # Hook for localStorage management
    ├── lib/                        # Utility libraries
    │   ├── api-client.ts           # Centralized API client with axios
    │   ├── api.ts                  # API configuration and constants
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
- **src/components/ui/button.tsx**: Button component with various variants and styles.
- **src/components/ui/card.tsx**: Card component for content containers.
- **src/components/ui/FormField.tsx**: Custom form field component with validation.
- **src/components/ui/input.tsx**: Input field component.
- **src/components/ui/Section.tsx**: Custom section wrapper component.
- **src/components/ui/skeleton.tsx**: Skeleton loader component.
- **src/components/ui/sonner.tsx**: Toast notification component.
- **src/components/ui/toast.tsx**: Toast component for notifications.
- **src/components/ui/toaster.tsx**: Toast container component.

### Data and Types
- **src/types.ts**: TypeScript interfaces and type definitions for news articles and component props. Defines the structure for NewsArticle and other data models.

### Hooks and Utilities
- **src/hooks/useFilteredArticles.ts**: Advanced hook using React Query for data fetching, caching, and filtering articles by category/search with automatic retries and background refetching.
- **src/hooks/useBookmarks.ts**: Custom hook for managing bookmarked articles with localStorage persistence and state synchronization.
- **src/hooks/useDebounce.ts**: Debouncing hooks for search inputs and API calls to prevent excessive requests.
- **src/hooks/useIntersectionObserver.ts**: Intersection observer hooks for lazy loading and infinite scroll functionality.
- **src/hooks/useLocalStorage.ts**: Type-safe localStorage management with error handling and React state synchronization.
- **src/hooks/use-toast.ts**: Enhanced toast notification system with multiple toast support and accessibility.
- **src/lib/api-client.ts**: Centralized HTTP client with axios, interceptors, error handling, and TypeScript interfaces.
- **src/lib/api.ts**: API configuration constants and base URL management.
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

##  Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Frontend Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amar-ujala-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080`

### Backend Server

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=3001
   NEWS_API_KEY=your_news_api_key_here
   ```

4. **Start the server**
   ```bash
   node server.js
   ```
   The API will be available at `http://localhost:3001`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t amar-ujala-reader .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:80 amar-ujala-reader
   ```

### Production Build

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

##  Key Features

###  Performance & Optimization
- **React Query Integration**: Advanced data fetching with caching, background refetching, and automatic retries
- **Component Memoization**: All components optimized with React.memo to prevent unnecessary re-renders
- **Lazy Loading**: Images and components load on-demand for better initial page load
- **Code Splitting**: Route-based code splitting with React.lazy and Suspense for reduced bundle size
- **Bundle Optimization**: Tree-shaking and efficient imports for minimal JavaScript payload

###  User Experience
- **Responsive Design**: Fully responsive interface that works on all devices
- **Accessibility**: WCAG compliant with proper ARIA labels, keyboard navigation, and screen reader support
- **Loading States**: Skeleton components and loading spinners for better perceived performance
- **Error Boundaries**: Section-specific error handling with retry functionality
- **Toast Notifications**: User-friendly notifications for actions and feedback

###  Developer Experience
- **TypeScript**: Full type safety with strict interfaces and type checking
- **Custom Hooks**: Reusable hooks for common functionality (bookmarks, localStorage, debouncing, etc.)
- **Axios Integration**: Centralized HTTP client with interceptors and error handling
- **Modern React**: React 18 with concurrent features, hooks, and best practices

###  Core Features
- **Category Filtering**: Filter articles by politics, sports, business, entertainment, technology, health
- **Search Functionality**: Real-time search with debounced API calls
- **Bookmark System**: Save and manage favorite articles with localStorage persistence
- **Breaking News**: Animated ticker for urgent news alerts
- **Trending Topics**: Interactive sidebar with trending news topics
- **Weather Widget**: Location-based weather information
- **Newsletter**: Email subscription with validation
- **Article Pages**: Full article view with sharing capabilities

###  Infrastructure
- **Docker Support**: Containerized deployment with multi-stage builds
- **Nginx Configuration**: Production-ready reverse proxy setup
- **Environment Management**: Proper environment variable handling
- **Build Optimization**: Vite-based build system with asset optimization

###  Reliability
- **Error Handling**: Comprehensive error boundaries and fallback UI
- **Retry Logic**: Automatic retry for failed API requests
- **Offline Support**: Graceful degradation when network is unavailable
- **Data Validation**: Type-safe API responses and input validation

##  Performance Metrics

### Bundle Analysis
- **Initial Bundle Size**: ~150KB (gzipped)
- **Lazy Loaded Chunks**: ~50KB each for routes
- **Vendor Libraries**: Tree-shaken and optimized

### Core Web Vitals (Target)
- **First Contentful Paint (FCP)**: <1.5s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **First Input Delay (FID)**: <100ms
- **Interaction to Next Paint (INP)**: <200ms

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Runtime Performance
- **React Re-renders**: Minimized with memoization
- **Memory Usage**: Optimized with proper cleanup
- **Network Requests**: Efficient caching with React Query
- **Image Loading**: Progressive loading with fallbacks

##  Architecture Decisions

### State Management
- **React Query** for server state (API data, caching, synchronization)
- **Local State** for UI state (loading, modals, forms)
- **localStorage** for persistence (bookmarks, user preferences)

### Component Patterns
- **Compound Components** for complex UI elements
- **Render Props** for flexible component APIs
- **Custom Hooks** for reusable logic extraction

### Performance Optimizations
- **Memoization** with React.memo for expensive components
- **Code Splitting** at route level with React.lazy
- **Image Optimization** with lazy loading and responsive images
- **Bundle Analysis** with Vite build analyzer

##  API Integration

### NewsData.io Integration
- Real-time Hindi news fetching
- Category-based filtering
- Automatic content cleaning and formatting
- Error handling and fallback data

### Weather API
- Location-based weather information
- Geolocation with user consent
- Fallback to default location


##  Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Server
cd server && npm start  # Start backend server
```