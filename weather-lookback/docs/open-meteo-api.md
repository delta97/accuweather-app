# Open-Meteo API Documentation

This document provides detailed information about the Open-Meteo APIs used in this application.

## API Endpoints Overview

### 1. Historical Weather Archive API
**Endpoint**: `https://archive-api.open-meteo.com/v1/archive`

**Purpose**: Access historical weather data from the past

**Date Range**:
- Historical data from **1940 to present** (with a 5-day delay)
- Data becomes available in the archive approximately 5 days after the actual date

**Data Sources**:
- ERA5: 1940 to present
- ERA5-Land: 1950 to present
- ECMWF IFS: 2017 to present
- CERRA: 1985 to June 2021

**When to Use**:
- For dates older than 5 days from today
- When you need historical climate data
- For weather research and analysis

**Example API Call**:
```
https://archive-api.open-meteo.com/v1/archive?
  latitude=52.52&
  longitude=13.41&
  start_date=2024-10-31&
  end_date=2024-11-14&
  daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&
  timezone=auto
```

---

### 2. Weather Forecast API
**Endpoint**: `https://api.open-meteo.com/v1/forecast`

**Purpose**: Get current weather conditions and future forecasts

**Date Range**:
- Recent past (last few days) via "Past Days" feature
- Current conditions
- Future forecasts (up to 16 days ahead)

**When to Use**:
- For dates within the last 5 days
- For current weather conditions
- For future weather forecasts
- When you need real-time or near-real-time data

**Example API Call**:
```
https://api.open-meteo.com/v1/forecast?
  latitude=52.52&
  longitude=13.41&
  start_date=2025-11-10&
  end_date=2025-11-15&
  daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&
  timezone=auto
```

---

### 3. Geocoding API
**Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`

**Purpose**: Convert location names to latitude/longitude coordinates

**Parameters**:
- `name`: Location name to search for
- `count`: Number of results to return (default: 10)
- `language`: Response language (e.g., 'en')
- `format`: Response format (json)

**Example API Call**:
```
https://geocoding-api.open-meteo.com/v1/search?
  name=San%20Diego&
  count=5&
  language=en&
  format=json
```

---

## Implementation in This Application

### Automatic Endpoint Selection

Our application automatically selects the correct endpoint based on the requested date:

```typescript
const requestedDate = new Date(date);
const today = new Date();
const daysDiff = Math.floor((today - requestedDate) / (1000 * 60 * 60 * 24));

// Use archive API for dates older than 5 days
const useArchive = daysDiff > 5;

const baseUrl = useArchive
  ? 'https://archive-api.open-meteo.com/v1/archive'
  : 'https://api.open-meteo.com/v1/forecast';
```

**Logic**:
- If the date is **more than 5 days old**: Use Archive API
- If the date is **within the last 5 days or in the future**: Use Forecast API

This ensures:
- Historical data uses the comprehensive archive with data back to 1940
- Recent/current data uses the real-time forecast API
- No 404 errors from requesting unavailable data

---

## Common Parameters

### Required Parameters
- `latitude`: Geographic latitude (decimal degrees)
- `longitude`: Geographic longitude (decimal degrees)
- `start_date`: Start date in ISO 8601 format (YYYY-MM-DD)
- `end_date`: End date in ISO 8601 format (YYYY-MM-DD)

### Daily Weather Variables Used
- `temperature_2m_max`: Maximum daily temperature at 2 meters (°C or °F)
- `temperature_2m_min`: Minimum daily temperature at 2 meters
- `temperature_2m_mean`: Mean daily temperature at 2 meters
- `precipitation_sum`: Total daily precipitation (mm or inches)
- `weathercode`: WMO weather condition code
- `windspeed_10m_max`: Maximum daily wind speed at 10 meters
- `winddirection_10m_dominant`: Dominant daily wind direction
- `sunrise`: Sunrise time (ISO 8601)
- `sunset`: Sunset time (ISO 8601)

### Optional Parameters
- `timezone`: Timezone for dates (e.g., 'auto', 'America/New_York')
- `temperature_unit`: celsius (default) or fahrenheit
- `windspeed_unit`: kmh (default), mph, ms, kn
- `precipitation_unit`: mm (default) or inch

---

## Rate Limits & Best Practices

### Rate Limits
- **Free Tier**: 10,000 API calls per day
- **Commercial Use**: Requires API key (with `customer-` prefix)

### Best Practices
1. **Cache Results**: Store weather data locally to reduce API calls
2. **Batch Requests**: Request multiple days in a single API call when possible
3. **Use Appropriate Endpoint**: Let the automatic selection handle archive vs forecast
4. **Handle Errors Gracefully**: API may be unavailable or return errors
5. **Respect Rate Limits**: Implement exponential backoff for retries
6. **Climate Research**: Use ERA5 or ERA5-Land exclusively for consistency over decades

---

## Weather Code Mapping (WMO Codes)

| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1 | Mainly clear |
| 2 | Partly cloudy |
| 3 | Overcast |
| 45, 48 | Fog |
| 51, 53, 55 | Drizzle (light, moderate, dense) |
| 61, 63, 65 | Rain (slight, moderate, heavy) |
| 71, 73, 75 | Snow (slight, moderate, heavy) |
| 80, 81, 82 | Rain showers (slight, moderate, violent) |
| 95, 96, 99 | Thunderstorm (with slight or heavy hail) |

---

## Error Handling

### Common Errors
- **404 Not Found**: Date not available in the selected endpoint
  - Solution: Check if date is too recent for archive API
- **400 Bad Request**: Invalid parameters
  - Solution: Verify latitude, longitude, and date format
- **429 Too Many Requests**: Rate limit exceeded
  - Solution: Implement request throttling

### Error Response Example
```json
{
  "error": true,
  "reason": "Data not available for this date range"
}
```

---

## Additional Resources

- [Open-Meteo Homepage](https://open-meteo.com/)
- [Historical Weather API Docs](https://open-meteo.com/en/docs/historical-weather-api)
- [Forecast API Docs](https://open-meteo.com/en/docs)
- [Geocoding API Docs](https://open-meteo.com/en/docs/geocoding-api)

---

## License & Attribution

Open-Meteo data is provided under:
- Attribution 4.0 International (CC BY 4.0)
- Weather data by Open-Meteo.com

Required attribution in applications:
```
Weather data by Open-Meteo.com
```
