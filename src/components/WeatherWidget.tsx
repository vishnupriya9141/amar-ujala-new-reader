import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

/**
 * WeatherWidget component that displays current weather information.
 */
const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Default city - you can make this configurable
        const response = await fetch('http://localhost:3001/api/weather/Delhi');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (icon: string) => {
    // Map OpenWeatherMap icons to Lucide icons
    if (icon.includes('01')) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (icon.includes('02') || icon.includes('03') || icon.includes('04')) return <Cloud className="w-8 h-8 text-gray-500" />;
    if (icon.includes('09') || icon.includes('10')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    return <Cloud className="w-8 h-8 text-gray-500" />;
  };

  if (loading) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Weather data unavailable</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Thermometer className="w-5 h-5" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{weather.city}</h3>
            <p className="text-sm text-gray-600 capitalize">{weather.description}</p>
          </div>
          {getWeatherIcon(weather.icon)}
        </div>

        <div className="text-3xl font-bold text-gray-900">
          {Math.round(weather.temperature)}°C
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{weather.windSpeed} m/s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;