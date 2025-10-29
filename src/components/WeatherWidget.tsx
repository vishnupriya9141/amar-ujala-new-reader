import { useState, useEffect, useCallback } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

/**
 * WeatherWidget component that displays current weather information based on user location.
 */
const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      const data = await response.json();

      // Extract city name from the response
      const city = data.address?.city ||
                   data.address?.town ||
                   data.address?.village ||
                   data.address?.municipality ||
                   data.display_name?.split(',')[0] ||
                   'Delhi'; // fallback

      return city;
    } catch (error) {
      console.error('Error getting city from coordinates:', error);
      return 'Delhi'; // fallback
    }
  };

  const fetchWeatherForLocation = async (city?: string) => {
    try {
      setLoading(true);
      setError(null);

      let targetCity = city || 'Delhi';

      if (!city && !locationRequested) {
        // Try to get user's location
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
              });
            });

            const { latitude, longitude } = position.coords;
            targetCity = await getCityFromCoordinates(latitude, longitude);
            setLocationRequested(true);
          } catch (geoError) {
            console.warn('Geolocation failed, using default city:', geoError);
            setLocationRequested(true);
          }
        }
      }

      const response = await fetch(`http://localhost:3002/api/weather/${encodeURIComponent(targetCity)}`);
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

  useEffect(() => {
    fetchWeatherForLocation();
  }, []);

  const handleRefreshLocation = useCallback(() => {
    setLocationRequested(false);
    fetchWeatherForLocation();
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
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Weather
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshLocation}
            className="h-6 w-6 p-0 hover:bg-blue-100"
            title="Refresh location"
          >
            <MapPin className="w-3 h-3" />
          </Button>
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