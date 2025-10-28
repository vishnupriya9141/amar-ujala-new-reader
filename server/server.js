const express = require('express');
const cors = require('cors');
const path = require('path');
const { newsArticles } = require('./newsData.ts');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
app.get('/api/news', (req, res) => {
  res.json(newsArticles);
});

app.get('/api/news/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = newsArticles.find(article => article.id === id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.get('/api/news/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredArticles = newsArticles.filter(article => article.category === category);
  res.json(filteredArticles);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});