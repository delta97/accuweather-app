import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import LocationSearch from './components/LocationSearch';
import DatePicker from './components/DatePicker';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherRange from './components/WeatherRange';
import Settings from './components/Settings';
import type { Location, WeatherData, TemperatureUnit } from './services/weatherApi';
import { getHistoricalWeatherRange, getWeatherTheme } from './services/weatherApi';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherRange, setWeatherRange] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('fahrenheit');

  const theme = weatherData ? getWeatherTheme(weatherData.weathercode) : null;

  // Refetch weather data when temperature unit changes (only if we already have data)
  useEffect(() => {
    if (selectedLocation && weatherData) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureUnit]);

  const handleSearch = async () => {
    if (!selectedLocation) {
      setError('Please select a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch only the selected date initially
      const rangeData = await getHistoricalWeatherRange(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedDate,
        selectedDate,
        temperatureUnit
      );

      setWeatherRange(rangeData);
      setWeatherData(rangeData[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setWeatherRange([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPrevious5Days = async () => {
    if (!selectedLocation || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const selectedDateObj = new Date(selectedDate);
      const startDateObj = new Date(selectedDateObj);
      startDateObj.setDate(startDateObj.getDate() - 5);

      const startDate = startDateObj.toISOString().split('T')[0];

      // Fetch 6 days (5 before + selected day)
      const rangeData = await getHistoricalWeatherRange(
        selectedLocation.latitude,
        selectedLocation.longitude,
        startDate,
        selectedDate,
        temperatureUnit
      );

      setWeatherRange(rangeData);
      // Keep the same selected day data
      const selectedDayData = rangeData.find(day => day.date === selectedDate);
      if (selectedDayData) {
        setWeatherData(selectedDayData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadNext5Days = async () => {
    if (!selectedLocation || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const selectedDateObj = new Date(selectedDate);
      const endDateObj = new Date(selectedDateObj);
      endDateObj.setDate(endDateObj.getDate() + 5);

      // Ensure end date doesn't exceed yesterday
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      // Cap the end date at yesterday
      if (endDateObj > yesterday) {
        endDateObj.setTime(yesterday.getTime());
      }

      const endDate = endDateObj.toISOString().split('T')[0];

      // Fetch from selected day to 5 days after
      const rangeData = await getHistoricalWeatherRange(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedDate,
        endDate,
        temperatureUnit
      );

      setWeatherRange(rangeData);
      // Keep the same selected day data
      const selectedDayData = rangeData.find(day => day.date === selectedDate);
      if (selectedDayData) {
        setWeatherData(selectedDayData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        theme ? `bg-gradient-to-br ${theme.gradient}` : 'bg-gradient-to-br from-blue-500 to-purple-600'
      }`}
    >
      <div className="min-h-screen backdrop-blur-sm">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1"></div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCloudSun} className="text-4xl text-white drop-shadow-lg" />
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  Weather Lookback
                </h1>
              </div>
              <div className="flex-1 flex justify-end">
                <Settings
                  temperatureUnit={temperatureUnit}
                  onTemperatureUnitChange={setTemperatureUnit}
                />
              </div>
            </div>
            <p className="text-center text-white/90 text-lg md:text-xl">
              Explore 80 years of weather history
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Controls */}
            <div
              className={`rounded-2xl shadow-2xl p-6 md:p-8 mb-8 transition-all duration-500 ${
                theme ? theme.cardBg : 'bg-white/20 backdrop-blur-lg'
              }`}
            >
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme ? theme.textColor : 'text-white'}`}>
                    Location
                  </label>
                  <LocationSearch onLocationSelect={setSelectedLocation} />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme ? theme.textColor : 'text-white'}`}>
                    Date
                  </label>
                  <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={loading || !selectedLocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Get Weather'
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/90 backdrop-blur-sm text-white rounded-2xl p-6 mb-8 shadow-2xl animate-fadeIn flex items-start gap-3">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-2xl mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Weather Range */}
            {weatherRange.length > 0 && selectedLocation && !error && (
              <div
                className={`rounded-2xl shadow-2xl p-6 md:p-8 mb-8 transition-all duration-500 ${
                  theme ? `${theme.cardBg} ${theme.textColor}` : 'bg-white/20 backdrop-blur-lg text-white'
                }`}
              >
                <WeatherRange
                  weatherRange={weatherRange}
                  selectedDate={selectedDate}
                  temperatureUnit={temperatureUnit}
                  onLoadPrevious={handleLoadPrevious5Days}
                  onLoadNext={handleLoadNext5Days}
                  loading={loading}
                />
              </div>
            )}

            {/* Weather Display */}
            {weatherData && selectedLocation && !error && (
              <div
                className={`rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-500 ${
                  theme ? `${theme.cardBg} ${theme.textColor}` : 'bg-white/20 backdrop-blur-lg text-white'
                }`}
              >
                <WeatherDisplay
                  weather={weatherData}
                  locationName={`${selectedLocation.name}, ${selectedLocation.country}`}
                  temperatureUnit={temperatureUnit}
                />
              </div>
            )}

            {/* Empty State */}
            {!weatherData && !loading && !error && (
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center text-white">
                <FontAwesomeIcon icon={faCloudSun} className="text-6xl mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Ready to explore?</h2>
                <p className="text-lg opacity-75">
                  Select a location and date to view historical weather data
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center text-white/75">
          <p className="text-sm">
            Weather data provided by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Open-Meteo.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
