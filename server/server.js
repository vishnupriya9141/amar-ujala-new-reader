import express from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const NEWS_API_KEY = process.env.NEWS_API_KEY;
if (!NEWS_API_KEY) {
  console.error('NEWS_API_KEY is missing in .env file');
  process.exit(1);
}

const NEWS_API_URL = `https://newsdata.io/api/1/news?country=in&language=hi&apikey=${NEWS_API_KEY}`;

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

function cleanContent(text) {
  if (!text || typeof text !== 'string') return 'कोई सामग्री उपलब्ध नहीं';

  return text
    .replace(/ONLY AVAILABLE IN PAID PLANS/gi, '')
    .replace(/\[\.\.\.\]/gi, '')
    .replace(/\[\+\d+\s*chars?\]/gi, '')
    .replace(/Read more.*/gi, '')
    .replace(/Full story.*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function mapCategory(apiCategories) {
  let cats = [];
  if (Array.isArray(apiCategories)) {
    cats = apiCategories;
  } else if (typeof apiCategories === 'string') {
    cats = [apiCategories];
  } else {
    return 'सामान्य';
  }

  if (cats.length === 0) return 'सामान्य';

  const categoryMap = {
    'politics': 'राजनीति',
    'business': 'व्यापार',
    'sports': 'खेल',
    'technology': 'तकनीक',
    'entertainment': 'मनोरंजन',
    'health': 'स्वास्थ्य',
    'science': 'विज्ञान',
    'world': 'विश्व',
    'national': 'राष्ट्रीय',
    'general': 'सामान्य'
  };

  for (const cat of cats) {
    const key = cat.toLowerCase().trim();
    if (categoryMap[key]) return categoryMap[key];
  }

  return 'सामान्य';
}

function formatDate(pubDate) {
  if (!pubDate) return new Date().toLocaleDateString('hi-IN');
  try {
    const date = new Date(pubDate);
    return isNaN(date.getTime()) ? new Date().toLocaleDateString('hi-IN') : date.toLocaleDateString('hi-IN');
  } catch {
    return new Date().toLocaleDateString('hi-IN');
  }
}

function calculateReadTime(text) {
  if (!text) return '1 मिनट';
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} मिनट`;
}

async function fetchNewsFromAPI() {
  try {
    const response = await axios.get(NEWS_API_URL, {
      headers: { 'User-Agent': 'HindiNewsApp/1.0' }
    });

    if (response.status !== 200) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = response.data;

    if (data.status !== 'success' || !data.results || data.results.length === 0) {
      console.warn('No results from NewsData.io:', data);
      return [];
    }

    return data.results.map((article, index) => {
      const rawTitle = article.title || 'शीर्षक उपलब्ध नहीं';
      const rawDesc = article.description || rawTitle;
      const rawContent = article.content || rawDesc;

      const cleanTitle = cleanContent(rawTitle);
      const cleanDesc = cleanContent(rawDesc);
      const cleanFull = cleanContent(rawContent);

      return {
        id: index + 1,
        title: cleanTitle,
        excerpt: cleanDesc.length > 150 ? cleanDesc.slice(0, 147) + '...' : cleanDesc,
        fullContent: cleanFull || 'पूर्ण सामग्री उपलब्ध नहीं',
        category: mapCategory(article.category),
        image: article.image_url || null,
        date: formatDate(article.pubDate),
        readTime: calculateReadTime(rawContent),
        featured: index === 0,
        views: Math.floor(Math.random() * 900) + 100,
        isRead: false
      };
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return [];
  }
}

app.get('/api/news', async (req, res) => {
  const articles = await fetchNewsFromAPI();
  if (articles.length > 0) {
    // Ensure categories are properly mapped
    const mappedArticles = articles.map(article => ({
      ...article,
      category: mapCategory(article.category)
    }));
    res.json(mappedArticles);
  } else {
    res.status(500).json({ error: 'समाचार लोड करने में असमर्थ। कृपया बाद में प्रयास करें।' });
  }
});

app.get('/api/news/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

  const articles = await fetchNewsFromAPI();
  const article = articles.find(a => a.id === id);

  if (article) {
    res.json(article);
  } else {
    res.status(404);
  }
});

app.get('/api/news/category/:category', async (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const articles = await fetchNewsFromAPI();
  const filtered = articles.filter(a => a.category === category);

  res.json(filtered);
});

app.get('/api/weather/:city', (req, res) => {
  const city = decodeURIComponent(req.params.city);
  res.json({
    city,
    temperature: Math.round(20 + Math.random() * 15),
    description: ['clear sky', 'partly cloudy', 'light rain', 'haze'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(50 + Math.random() * 40),
    windSpeed: (2 + Math.random() * 6).toFixed(1),
    icon: ['01d', '02d', '10d', '50d'][Math.floor(Math.random() * 4)]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Fetching live Hindi news from NewsData.io`);
  console.log(`API Key: ${NEWS_API_KEY ? 'Loaded' : 'MISSING'}`);
});