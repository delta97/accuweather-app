import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import LocationSearch from './components/LocationSearch';
import DatePicker from './components/DatePicker';
import WeatherDisplay from './components/WeatherDisplay';
import type { Location, WeatherData } from './services/weatherApi';
import { getHistoricalWeather, getWeatherTheme } from './services/weatherApi';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = weatherData ? getWeatherTheme(weatherData.weathercode) : null;

  const handleSearch = async () => {
    if (!selectedLocation) {
      setError('Please select a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getHistoricalWeather(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedDate
      );
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
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
            <div className="flex items-center justify-center gap-3 mb-2">
              <FontAwesomeIcon icon={faCloudSun} className="text-4xl text-white drop-shadow-lg" />
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Weather Lookback
              </h1>
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
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
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
