export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherData {
  date: string;
  temperature_max: number;
  temperature_min: number;
  temperature_mean: number;
  precipitation: number;
  weathercode: number;
  windspeed_max: number;
  windDirection: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherTheme {
  name: string;
  gradient: string;
  textColor: string;
  cardBg: string;
  iconColor: string;
}

// Weather code mapping based on WMO codes
export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return weatherCodes[code] || 'Unknown';
};

// Get weather theme based on weather code
export const getWeatherTheme = (code: number): WeatherTheme => {
  // Clear/Sunny (0-1)
  if (code <= 1) {
    return {
      name: 'sunny',
      gradient: 'from-sky-400 via-blue-400 to-blue-500',
      textColor: 'text-white',
      cardBg: 'bg-white/20 backdrop-blur-lg',
      iconColor: 'text-yellow-300',
    };
  }

  // Partly cloudy (2-3)
  if (code <= 3) {
    return {
      name: 'cloudy',
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      textColor: 'text-white',
      cardBg: 'bg-white/20 backdrop-blur-lg',
      iconColor: 'text-gray-200',
    };
  }

  // Foggy (45-48)
  if (code >= 45 && code <= 48) {
    return {
      name: 'foggy',
      gradient: 'from-gray-300 via-gray-400 to-gray-500',
      textColor: 'text-gray-900',
      cardBg: 'bg-white/30 backdrop-blur-lg',
      iconColor: 'text-gray-600',
    };
  }

  // Rain/Drizzle (51-65, 80-82)
  if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
    return {
      name: 'rainy',
      gradient: 'from-slate-600 via-slate-700 to-slate-800',
      textColor: 'text-white',
      cardBg: 'bg-slate-900/30 backdrop-blur-lg',
      iconColor: 'text-blue-300',
    };
  }

  // Snow (71-75)
  if (code >= 71 && code <= 75) {
    return {
      name: 'snowy',
      gradient: 'from-blue-200 via-blue-300 to-blue-400',
      textColor: 'text-slate-800',
      cardBg: 'bg-white/40 backdrop-blur-lg',
      iconColor: 'text-blue-100',
    };
  }

  // Thunderstorm (95-99)
  if (code >= 95) {
    return {
      name: 'stormy',
      gradient: 'from-purple-900 via-slate-800 to-slate-900',
      textColor: 'text-white',
      cardBg: 'bg-purple-900/30 backdrop-blur-lg',
      iconColor: 'text-yellow-400',
    };
  }

  // Default
  return {
    name: 'default',
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    textColor: 'text-white',
    cardBg: 'bg-white/20 backdrop-blur-lg',
    iconColor: 'text-white',
  };
};

// Geocoding API - convert city name or coordinates to location
export const searchLocations = async (query: string): Promise<Location[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=5&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search locations');
  }

  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((result: any) => ({
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    admin1: result.admin1,
  }));
};

export type TemperatureUnit = 'celsius' | 'fahrenheit';

// Fetch historical weather data for a date range
export const getHistoricalWeatherRange = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
  temperatureUnit: TemperatureUnit = 'fahrenheit'
): Promise<WeatherData[]> => {
  // Parse the requested dates
  const requestedStartDate = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate days difference
  const daysDiff = Math.floor((today.getTime() - requestedStartDate.getTime()) / (1000 * 60 * 60 * 24));

  // Open-Meteo archive API only works for dates older than ~5 days
  // Use forecast API for recent/future dates, archive API for older dates
  const useArchive = daysDiff > 5;

  const baseUrl = useArchive
    ? 'https://archive-api.open-meteo.com/v1/archive'
    : 'https://api.open-meteo.com/v1/forecast';

  const tempUnit = temperatureUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  const windUnit = temperatureUnit === 'fahrenheit' ? 'mph' : 'kmh';
  const precipUnit = temperatureUnit === 'fahrenheit' ? 'inch' : 'mm';

  const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,weathercode,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
    throw new Error('No weather data available for this date range');
  }

  // Map all days in the response to WeatherData objects
  return data.daily.time.map((date: string, index: number) => ({
    date,
    temperature_max: data.daily.temperature_2m_max[index],
    temperature_min: data.daily.temperature_2m_min[index],
    temperature_mean: data.daily.temperature_2m_mean[index],
    precipitation: data.daily.precipitation_sum[index],
    weathercode: data.daily.weathercode[index],
    windspeed_max: data.daily.windspeed_10m_max[index],
    windDirection: data.daily.winddirection_10m_dominant[index],
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
  }));
};

// Fetch historical weather data for a single date (convenience wrapper)
export const getHistoricalWeather = async (
  latitude: number,
  longitude: number,
  date: string,
  temperatureUnit: TemperatureUnit = 'fahrenheit'
): Promise<WeatherData> => {
  const results = await getHistoricalWeatherRange(latitude, longitude, date, date, temperatureUnit);
  return results[0];
};
