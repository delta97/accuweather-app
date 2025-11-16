import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import type { WeatherData, TemperatureUnit } from '../services/weatherApi';
import { getWeatherDescription } from '../services/weatherApi';

interface WeatherRangeProps {
  weatherRange: WeatherData[];
  selectedDate: string;
  temperatureUnit: TemperatureUnit;
}

export default function WeatherRange({ weatherRange, selectedDate, temperatureUnit }: WeatherRangeProps) {
  const tempSymbol = temperatureUnit === 'fahrenheit' ? '°F' : '°C';

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return faSun;
    if (code === 2 || code === 3) return faCloud;
    if (code >= 45 && code <= 48) return faSmog;
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return faCloudRain;
    if (code >= 71 && code <= 75) return faSnowflake;
    if (code >= 95) return faBolt;
    return faCloud;
  };

  const formatDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatMonthDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isSelectedDate = (date: string) => date === selectedDate;

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 opacity-90">Weather Timeline</h3>
      <div className="grid grid-cols-11 gap-2">
        {weatherRange.map((weather, index) => {
          const isSelected = isSelectedDate(weather.date);
          return (
            <div
              key={weather.date}
              className={`relative rounded-xl p-3 transition-all duration-200 ${
                isSelected
                  ? 'bg-white/40 backdrop-blur-md shadow-xl ring-2 ring-white/50 scale-105'
                  : 'bg-white/20 backdrop-blur-sm shadow-md hover:bg-white/30'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  Selected
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                {/* Day of week */}
                <div className={`text-xs font-semibold ${isSelected ? 'opacity-100' : 'opacity-75'}`}>
                  {formatDayOfWeek(weather.date)}
                </div>

                {/* Date */}
                <div className={`text-xs ${isSelected ? 'font-bold' : 'opacity-60'}`}>
                  {formatMonthDay(weather.date)}
                </div>

                {/* Weather icon */}
                <div className="my-1">
                  <FontAwesomeIcon
                    icon={getWeatherIcon(weather.weathercode)}
                    className={`text-2xl ${isSelected ? 'scale-110' : ''}`}
                  />
                </div>

                {/* Temperature range */}
                <div className="text-center">
                  <div className={`text-sm font-bold ${isSelected ? 'text-base' : ''}`}>
                    {Math.round(weather.temperature_max)}{tempSymbol}
                  </div>
                  <div className={`text-xs opacity-60 ${isSelected ? 'opacity-75' : ''}`}>
                    {Math.round(weather.temperature_min)}{tempSymbol}
                  </div>
                </div>

                {/* Weather condition (only on hover or selected) */}
                {isSelected && (
                  <div className="text-xs text-center opacity-75 leading-tight mt-1">
                    {getWeatherDescription(weather.weathercode)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
