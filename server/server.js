import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Load API key from environment variable
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsdata.io/api/1/news?country=in&language=hi&apikey=${NEWS_API_KEY}`;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

// Function to map NewsData.io categories to our categories
function mapCategory(apiCategories) {
  if (!Array.isArray(apiCategories) || apiCategories.length === 0) {
    return 'सामान्य';
  }

  const categoryMap = {
    'politics': 'राजनीति',
    'business': 'व्यापार',
    'sports': 'खेल',
    'technology': 'तकनीक',
    'entertainment': 'मनोरंजन',
    'health': 'स्वास्थ्य',
    'science': 'विज्ञान',
    'world': 'विश्व',
    'national': 'राष्ट्रीय'
  };

  for (const apiCat of apiCategories) {
    const mapped = categoryMap[apiCat.toLowerCase()];
    if (mapped) return mapped;
  }

  return 'सामान्य';
}

// Function to format date from API
function formatDate(pubDate) {
  if (!pubDate) return new Date().toLocaleDateString('hi-IN');
  try {
    const date = new Date(pubDate);
    return date.toLocaleDateString('hi-IN');
  } catch {
    return new Date().toLocaleDateString('hi-IN');
  }
}

// Function to calculate read time
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} मिनट`;
}

// Function to fetch news directly from API (real-time)
async function fetchNewsFromAPI() {
  try {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();

    if (data.status === 'success' && data.results) {
      const mappedArticles = data.results.map((article, index) => ({
        id: index + 1,
        title: article.title || 'शीर्षक उपलब्ध नहीं',
        excerpt: article.description || article.title || 'विवरण उपलब्ध नहीं',
        fullContent: article.content || article.description || article.title || 'पूर्ण सामग्री उपलब्ध नहीं',
        category: mapCategory(article.category || []),
        image: article.image_url || null,
        date: formatDate(article.pubDate),
        readTime: calculateReadTime(article.content || article.description || ''),
        featured: index === 0,
        views: Math.floor(Math.random() * 1000) + 100,
        isRead: false
      }));
      return mappedArticles;
    } else {
      console.error('NewsData.io API error:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching news from API:', error);
    return [];
  }
}

// 🔹 Real-time Hindi News Endpoint
app.get('/api/news', async (req, res) => {
  const articles = await fetchNewsFromAPI();
  if (articles.length > 0) {
    res.json(articles);
  } else {
    res.status(500).json({ error: 'Unable to fetch news data' });
  }
});

// 🔹 Single Article by ID
app.get('/api/news/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const articles = await fetchNewsFromAPI();
  const article = articles.find(a => a.id === id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// 🔹 Category Filter
app.get('/api/news/category/:category', async (req, res) => {
  const category = req.params.category;
  const articles = await fetchNewsFromAPI();
  const filteredArticles = articles.filter(a => a.category === category);
  res.json(filteredArticles);
});

// 🔹 Weather Mock API (optional)
app.get('/api/weather/:city', (req, res) => {
  const city = req.params.city;
  const mockWeatherData = {
    city: city,
    temperature: 22.5,
    description: 'clear sky',
    humidity: 65,
    windSpeed: 3.5,
    icon: '01d'
  };
  res.json(mockWeatherData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📰 Fetching live Hindi news from NewsData.io`);
});
