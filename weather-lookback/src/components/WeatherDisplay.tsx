import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
  faWind,
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faCloudSun,
  faCloudMoon,
} from '@fortawesome/free-solid-svg-icons';
import type { WeatherData } from '../services/weatherApi';
import { getWeatherDescription } from '../services/weatherApi';

interface WeatherDisplayProps {
  weather: WeatherData;
  locationName: string;
}

export default function WeatherDisplay({ weather, locationName }: WeatherDisplayProps) {
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return faSun;
    if (code === 2 || code === 3) return faCloud;
    if (code >= 45 && code <= 48) return faSmog;
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return faCloudRain;
    if (code >= 71 && code <= 75) return faSnowflake;
    if (code >= 95) return faBolt;
    return faCloud;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-8 shadow-2xl">
            <FontAwesomeIcon
              icon={getWeatherIcon(weather.weathercode)}
              className="text-7xl md:text-8xl drop-shadow-lg"
            />
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            {Math.round(weather.temperature_mean)}°C
          </h2>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            {getWeatherDescription(weather.weathercode)}
          </p>
          <p className="text-lg md:text-xl mt-2 opacity-75">
            {locationName}
          </p>
          <p className="text-base md:text-lg opacity-60 mt-1">
            {formatDate(weather.date)}
          </p>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faTemperatureHigh} className="text-2xl" />
            <span className="text-sm font-medium opacity-75">High</span>
          </div>
          <p className="text-3xl font-bold">{Math.round(weather.temperature_max)}°C</p>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FontAwesomeIcon icon={faTemperatureLow} className="text-2xl" />
            <span className="text-sm font-medium opacity-75">Low</span>
          </div>
          <p className="text-3xl font-bold">{Math.round(weather.temperature_min)}°C</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wind */}
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <FontAwesomeIcon icon={faWind} className="text-xl" />
            <span className="font-medium">Wind</span>
          </div>
          <p className="text-2xl font-bold">
            {Math.round(weather.windspeed_max)} km/h
          </p>
          <p className="text-sm opacity-75 mt-1">
            Direction: {getWindDirection(weather.windDirection)} ({weather.windDirection}°)
          </p>
        </div>

        {/* Precipitation */}
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <FontAwesomeIcon icon={faDroplet} className="text-xl" />
            <span className="font-medium">Precipitation</span>
          </div>
          <p className="text-2xl font-bold">
            {weather.precipitation.toFixed(1)} mm
          </p>
          <p className="text-sm opacity-75 mt-1">
            {weather.precipitation === 0 ? 'No rainfall' : 'Total rainfall'}
          </p>
        </div>

        {/* Sunrise */}
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <FontAwesomeIcon icon={faCloudSun} className="text-xl" />
            <span className="font-medium">Sunrise</span>
          </div>
          <p className="text-2xl font-bold">
            {formatTime(weather.sunrise)}
          </p>
        </div>

        {/* Sunset */}
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <FontAwesomeIcon icon={faCloudMoon} className="text-xl" />
            <span className="font-medium">Sunset</span>
          </div>
          <p className="text-2xl font-bold">
            {formatTime(weather.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}
