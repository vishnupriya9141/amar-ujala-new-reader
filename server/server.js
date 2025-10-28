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

// Weather API endpoint - using OpenWeatherMap API
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    // Note: In production, use environment variable for API key
    // For demo purposes, using a mock response since we don't have a real API key
    const mockWeatherData = {
      city: city,
      temperature: 22.5,
      description: "clear sky",
      humidity: 65,
      windSpeed: 3.5,
      icon: "01d"
    };

    // Uncomment below for real API call when you have an API key:
    // const apiKey = process.env.OPENWEATHER_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // const response = await fetch(url);
    // const data = await response.json();
    // if (response.ok) {
    //   res.json({
    //     city: data.name,
    //     temperature: data.main.temp,
    //     description: data.weather[0].description,
    //     humidity: data.main.humidity,
    //     windSpeed: data.wind.speed,
    //     icon: data.weather[0].icon
    //   });
    // } else {
    //   res.status(response.status).json({ error: data.message });
    // }

    res.json(mockWeatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});