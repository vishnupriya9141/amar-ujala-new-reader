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
├── public/                          # Static assets
│   ├── favicon.ico                 # Website favicon
│   ├── placeholder.svg             # Placeholder image
│   └── robots.txt                  # Robots.txt for SEO
├── src/                            # Source code
│   ├── assets/                     # Image assets
│   │   ├── business-news.jpg       # Business news category image
│   │   ├── entertainment-news.jpg  # Entertainment news category image
│   │   ├── hero-news.jpg           # Hero section image
│   │   ├── politics-news.jpg       # Politics news category image
│   │   ├── sports-news.jpg         # Sports news category image
│   │   └── tech-news.jpg           # Technology news category image
│   ├── components/                 # React components
│   │   ├── ui/                     # Reusable UI components (shadcn-ui)
│   │   │   ├── accordion.tsx       # Accordion component for collapsible content
│   │   │   ├── alert-dialog.tsx    # Alert dialog for confirmations
│   │   │   ├── alert.tsx           # Alert component for notifications
│   │   │   ├── aspect-ratio.tsx    # Aspect ratio utility component
│   │   │   ├── avatar.tsx          # Avatar component for user profiles
│   │   │   ├── badge.tsx           # Badge component for tags/labels
│   │   │   ├── breadcrumb.tsx      # Breadcrumb navigation component
│   │   │   ├── button.tsx          # Button component with variants
│   │   │   ├── calendar.tsx        # Calendar component for date selection
│   │   │   ├── card.tsx            # Card component for content containers
│   │   │   ├── carousel.tsx        # Carousel component for image sliders
│   │   │   ├── chart.tsx           # Chart component for data visualization
│   │   │   ├── checkbox.tsx        # Checkbox input component
│   │   │   ├── collapsible.tsx     # Collapsible content component
│   │   │   ├── command.tsx         # Command palette component
│   │   │   ├── context-menu.tsx    # Context menu component
│   │   │   ├── dialog.tsx          # Modal dialog component
│   │   │   ├── drawer.tsx          # Drawer component for side panels
│   │   │   ├── dropdown-menu.tsx   # Dropdown menu component
│   │   │   ├── form.tsx            # Form component with validation
│   │   │   ├── FormField.tsx       # Custom form field component
│   │   │   ├── hover-card.tsx      # Hover card component
│   │   │   ├── input-otp.tsx       # OTP input component
│   │   │   ├── input.tsx           # Input field component
│   │   │   ├── label.tsx           # Label component for form inputs
│   │   │   ├── menubar.tsx         # Menu bar component
│   │   │   ├── navigation-menu.tsx # Navigation menu component
│   │   │   ├── pagination.tsx      # Pagination component
│   │   │   ├── popover.tsx         # Popover component
│   │   │   ├── progress.tsx        # Progress bar component
│   │   │   ├── radio-group.tsx     # Radio group component
│   │   │   ├── scroll-area.tsx     # Scroll area component
│   │   │   ├── Section.tsx         # Custom section wrapper component
│   │   │   ├── select.tsx          # Select dropdown component
│   │   │   ├── separator.tsx       # Separator component for dividers
│   │   │   ├── sheet.tsx           # Sheet component for side panels
│   │   │   ├── sidebar.tsx         # Sidebar component
│   │   │   ├── skeleton.tsx        # Skeleton loader component
│   │   │   ├── slider.tsx          # Slider component
│   │   │   ├── sonner.tsx          # Toast notification component
│   │   │   ├── switch.tsx          # Switch toggle component
│   │   │   ├── table.tsx           # Table component
│   │   │   ├── tabs.tsx            # Tabs component
│   │   │   ├── textarea.tsx        # Textarea input component
│   │   │   ├── toast.tsx           # Toast component
│   │   │   ├── toaster.tsx         # Toast container component
│   │   │   └── use-toast.ts        # Toast hook
│   │   ├── BreakingNews.tsx        # Breaking news banner component
│   │   ├── ErrorBoundary.tsx       # Error boundary for error handling
│   │   ├── Footer.tsx              # Footer component with links
│   │   ├── Header.tsx              # Header component with navigation
│   │   ├── NewsCard.tsx            # Individual news article card
│   │   ├── NewsCardSkeleton.tsx    # Skeleton loader for news cards
│   │   ├── NewsGrid.tsx            # Grid layout for news articles
│   │   ├── Newsletter.tsx          # Newsletter subscription component
│   │   └── TrendingSection.tsx     # Trending topics sidebar component
│   ├── data/                       # Data files
│   │   └── newsData.ts             # Static news articles data
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.tsx          # Hook for mobile device detection
│   │   ├── use-toast.ts            # Hook for toast notifications
│   │   └── useFilteredArticles.ts  # Hook for filtering articles
│   ├── lib/                        # Utility libraries
│   │   └── utils.ts                # Utility functions
│   ├── pages/                      # Page components
│   │   ├── Index.tsx               # Main page component
│   │   └── NotFound.tsx            # 404 page component
│   ├── App.css                     # Global CSS styles
│   ├── App.tsx                     # Main App component
│   ├── index.css                   # Index CSS styles
│   ├── main.tsx                    # Application entry point
│   ├── types.ts                    # TypeScript type definitions
│   └── vite-env.d.ts               # Vite environment types
├── .gitignore                      # Git ignore file
├── bun.lockb                       # Bun lock file
├── components.json                 # shadcn-ui components configuration
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package-lock.json               # NPM lock file
├── package.json                    # NPM package configuration
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Project documentation
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.app.json               # TypeScript app configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript node configuration
└── vite.config.ts                  # Vite configuration
```

## File Explanations

### Core Application Files
- **src/App.tsx**: Main application component that sets up routing, providers, and global layout. Wraps the app with QueryClient, ThemeProvider, and BrowserRouter for state management, theming, and navigation.
- **src/main.tsx**: Entry point of the React application. Renders the App component into the DOM and handles the initial setup.
- **src/pages/Index.tsx**: Main page component that orchestrates the news reader interface. Manages state for filtering, pagination, and user interactions like bookmarking and article clicks.

### Components
- **src/components/Header.tsx**: Navigation header with category selection, search functionality, and mobile menu. Provides filtering options and search capabilities for news articles.
- **src/components/NewsGrid.tsx**: Displays news articles in a responsive grid layout. Handles loading states and renders individual news cards with bookmark functionality.
- **src/components/NewsCard.tsx**: Individual news article card component with image, title, excerpt, and action buttons for bookmarking and sharing. Supports keyboard navigation and accessibility.
- **src/components/BreakingNews.tsx**: Banner component for displaying breaking news alerts at the top of the page.
- **src/components/TrendingSection.tsx**: Sidebar component showing trending topics with click handlers for topic selection.
- **src/components/Newsletter.tsx**: Subscription form component for newsletter sign-ups with email validation.
- **src/components/Footer.tsx**: Site footer with links, social media, and additional navigation options.
- **src/components/ErrorBoundary.tsx**: React error boundary component that catches JavaScript errors in the component tree and displays fallback UI.

### Data and Types
- **src/types.ts**: TypeScript interfaces and type definitions for news articles and component props. Defines the structure for NewsArticle and other data models.
- **src/data/newsData.ts**: Static data file containing sample news articles in Hindi with categories like politics, business, sports, technology, and entertainment.

### Hooks and Utilities
- **src/hooks/useFilteredArticles.ts**: Custom hook that filters news articles based on selected category and search query. Uses useMemo for performance optimization.
- **src/hooks/use-toast.ts**: Custom hook for managing toast notifications throughout the application.
- **src/lib/utils.ts**: Utility functions including className merging for Tailwind CSS classes.

### Configuration Files
- **package.json**: NPM package configuration with dependencies, scripts, and project metadata. Includes React, Vite, TypeScript, and UI library dependencies.
- **vite.config.ts**: Vite build tool configuration for development server, build process, and plugins.
- **tailwind.config.ts**: Tailwind CSS configuration with custom theme settings and plugin configurations.
- **tsconfig.json**: TypeScript compiler configuration for the application.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
