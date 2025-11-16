import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faBolt,
  faSmog,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import type { WeatherData, TemperatureUnit } from '../services/weatherApi';
import { getWeatherDescription } from '../services/weatherApi';

interface WeatherRangeProps {
  weatherRange: WeatherData[];
  selectedDate: string;
  temperatureUnit: TemperatureUnit;
  onLoadPrevious?: () => void;
  onLoadNext?: () => void;
  loading?: boolean;
}

export default function WeatherRange({
  weatherRange,
  selectedDate,
  temperatureUnit,
  onLoadPrevious,
  onLoadNext,
  loading = false
}: WeatherRangeProps) {
  const tempSymbol = temperatureUnit === 'fahrenheit' ? '°F' : '°C';

  // Check if we have only one day (initial state)
  const showOnlySelectedDay = weatherRange.length === 1;

  // Check if selected day is first or last in range
  const selectedIndex = weatherRange.findIndex(w => w.date === selectedDate);
  const canLoadPrevious = selectedIndex !== 0 || showOnlySelectedDay;
  const canLoadNext = selectedIndex !== weatherRange.length - 1 || showOnlySelectedDay;

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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold opacity-90">Weather Timeline</h3>
        <div className="flex gap-2">
          {onLoadPrevious && canLoadPrevious && (
            <button
              onClick={onLoadPrevious}
              disabled={loading}
              className="px-4 py-2 bg-white/30 hover:bg-white/40 disabled:bg-white/20 disabled:opacity-50 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-sm shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Previous 5 Days
            </button>
          )}
          {onLoadNext && canLoadNext && (
            <button
              onClick={onLoadNext}
              disabled={loading}
              className="px-4 py-2 bg-white/30 hover:bg-white/40 disabled:bg-white/20 disabled:opacity-50 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium text-sm shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              Next 5 Days
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>
      <div className={`grid gap-2 ${weatherRange.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-' + Math.min(weatherRange.length, 11)}`} style={{ gridTemplateColumns: `repeat(${Math.min(weatherRange.length, 11)}, minmax(0, 1fr))` }}>
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
