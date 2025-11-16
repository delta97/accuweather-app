# Open-Meteo Weather API - Complete Guide

## Table of Contents
- [Overview](#overview)
- [Key Advantages](#key-advantages)
- [Available APIs](#available-apis)
- [Weather Variables](#weather-variables)
- [Rate Limits & Pricing](#rate-limits--pricing)
- [Weather Models](#weather-models)
- [Code Examples](#code-examples)
- [Comparison with Alternatives](#comparison-with-alternatives)
- [Interactive Display Ideas](#interactive-display-ideas)
- [Resources](#resources)

---

## Overview

**Open-Meteo** is a free, open-source weather API that provides high-resolution weather forecasts and historical data without requiring API keys or registration. It aggregates data from national weather services worldwide, making professional weather data accessible to everyone.

### Quick Facts
- **No API key required** - Start using immediately
- **No registration** - No email or credit card needed
- **High resolution** - 1-11 km globally, up to 1 km regionally
- **80+ years** of historical data
- **Open source** - AGPLv3 license
- **Free tier** - 10,000 API calls/day for non-commercial use
- **Commercial friendly** - CC BY 4.0 data license

---

## Key Advantages

### Immediate Access
Unlike OpenWeatherMap and other services, Open-Meteo requires:
- ❌ No registration
- ❌ No API key
- ❌ No waiting for activation
- ❌ No credit card
- ✅ Just start making requests

### Superior Resolution
- **Global models**: 11 km resolution
- **Regional models**: 1-1.5 km resolution
- **Premium areas**: Up to 1 km in select regions
- **Temporal**: Hourly, 15-minute, daily data

### Comprehensive Data
- **Forecast**: Up to 16 days ahead
- **Historical**: 80 years back (1940-present)
- **Variables**: 50+ weather parameters
- **Storage**: 50 TB of weather information

### Cost Effective
| Provider | Free Tier | Commercial Start |
|----------|-----------|-----------------|
| Open-Meteo | 10,000/day | €29/mo (1M calls) |
| OpenWeatherMap | 1,000/day | $40/mo (1M calls) |
| WeatherAPI | 1M/mo | $10/mo (1M calls) |
| Visual Crossing | 1,000/day | $0.0001/call |

---

## Available APIs

### 1. Weather Forecast API

**Endpoint**: `https://api.open-meteo.com/v1/forecast`

**Features**:
- 7-16 day forecasts (configurable)
- Hourly, daily, and current weather
- 50+ weather variables
- Multiple weather models
- Global coverage

**Example Request**:
```
https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,precipitation&daily=temperature_2m_max,precipitation_sum
```

**Response Structure**:
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "timezone": "America/New_York",
  "current": {
    "time": "2025-11-16T10:00",
    "temperature_2m": 15.2,
    "wind_speed_10m": 12.5
  },
  "hourly": {
    "time": ["2025-11-16T00:00", "2025-11-16T01:00", ...],
    "temperature_2m": [14.1, 13.8, ...],
    "precipitation": [0, 0.2, ...]
  },
  "daily": {
    "time": ["2025-11-16", "2025-11-17", ...],
    "temperature_2m_max": [18.5, 19.2, ...],
    "precipitation_sum": [2.5, 0.1, ...]
  }
}
```

### 2. Historical Weather API

**Endpoint**: `https://api.open-meteo.com/v1/archive`

**Features**:
- 80 years of data (1940-2025)
- 10 km resolution
- Same variables as forecast API
- Perfect for ML training and analysis

**Example Request**:
```
https://api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2020-01-01&end_date=2020-12-31&daily=temperature_2m_max,temperature_2m_min,precipitation_sum
```

**Use Cases**:
- Climate trend analysis
- Machine learning model training
- Historical comparisons
- Weather pattern research
- Agricultural planning

### 3. Marine Weather API

**Endpoint**: `https://api.open-meteo.com/v1/marine`

**Features**:
- Wave height, direction, period
- Swell data (primary, secondary)
- Ocean currents
- Sea surface temperature
- Global ocean coverage

**Variables**:
- `wave_height` - Significant wave height
- `wave_direction` - Direction of waves
- `wave_period` - Time between waves
- `swell_wave_height` - Swell-only height
- `ocean_current_velocity` - Current speed
- `ocean_current_direction` - Current direction

### 4. Air Quality API

**Endpoint**: `https://api.open-meteo.com/v1/air-quality`

**Features**:
- Particulate matter (PM2.5, PM10)
- Gases (O3, NO2, SO2, CO)
- European and US AQI indices
- 5-day forecasts
- Historical data

**Variables**:
- `pm10` - Particulate matter < 10μm
- `pm2_5` - Particulate matter < 2.5μm
- `carbon_monoxide` - CO concentration
- `nitrogen_dioxide` - NO2 concentration
- `sulphur_dioxide` - SO2 concentration
- `ozone` - O3 concentration
- `us_aqi` - US Air Quality Index
- `european_aqi` - European Air Quality Index

### 5. Climate Change API

**Endpoint**: `https://api.open-meteo.com/v1/climate`

**Features**:
- IPCC climate projections
- Multiple warming scenarios
- Temperature and precipitation changes
- Data through 2050-2100
- Statistical ensembles

**Scenarios**:
- `SSP1-2.6` - 1.5°C warming (optimistic)
- `SSP2-4.5` - 2°C warming (moderate)
- `SSP3-7.0` - 3°C warming (high emissions)
- `SSP5-8.5` - 4°C warming (worst case)

### 6. Flood API

**Endpoint**: `https://api.open-meteo.com/v1/flood`

**Features**:
- River discharge forecasts
- 90-day predictions
- Historical flood data
- Ensemble forecasts
- Global river coverage

**Variables**:
- `river_discharge` - Flow rate (m³/s)
- `river_discharge_mean` - Ensemble mean
- `river_discharge_median` - Ensemble median
- `river_discharge_max` - Maximum forecast
- `river_discharge_min` - Minimum forecast

### 7. Geocoding API

**Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`

**Features**:
- City name to coordinates
- Location search with autocomplete
- Timezone information
- Population data
- Country and region info

**Example**:
```
https://geocoding-api.open-meteo.com/v1/search?name=New York&count=5
```

### 8. Elevation API

**Endpoint**: `https://api.open-meteo.com/v1/elevation`

**Features**:
- Terrain elevation data
- 90m resolution globally
- Batch coordinate support

**Example**:
```
https://api.open-meteo.com/v1/elevation?latitude=40.7128&longitude=-74.0060
```

---

## Weather Variables

### Temperature Variables

| Variable | Description | Unit |
|----------|-------------|------|
| `temperature_2m` | Air temperature at 2 meters | °C / °F |
| `temperature_80m` | Temperature at 80m height | °C / °F |
| `temperature_120m` | Temperature at 120m height | °C / °F |
| `apparent_temperature` | Feels like temperature | °C / °F |
| `dewpoint_2m` | Dew point temperature | °C / °F |
| `soil_temperature_0cm` | Surface soil temperature | °C / °F |
| `soil_temperature_6cm` | Soil temp at 6cm depth | °C / °F |

### Precipitation Variables

| Variable | Description | Unit |
|----------|-------------|------|
| `precipitation` | Total precipitation | mm |
| `rain` | Liquid precipitation only | mm |
| `snowfall` | Snow accumulation | cm |
| `precipitation_probability` | Chance of precipitation | % |
| `showers` | Shower precipitation | mm |
| `weathercode` | WMO weather code | Code |

### Wind Variables

| Variable | Description | Unit |
|----------|-------------|------|
| `wind_speed_10m` | Wind speed at 10m | km/h |
| `wind_speed_80m` | Wind speed at 80m | km/h |
| `wind_direction_10m` | Wind direction at 10m | ° |
| `wind_gusts_10m` | Maximum wind gusts | km/h |

### Cloud & Visibility

| Variable | Description | Unit |
|----------|-------------|------|
| `cloud_cover` | Total cloud cover | % |
| `cloud_cover_low` | Low-level clouds | % |
| `cloud_cover_mid` | Mid-level clouds | % |
| `cloud_cover_high` | High-level clouds | % |
| `visibility` | Horizontal visibility | meters |

### Atmospheric Variables

| Variable | Description | Unit |
|----------|-------------|------|
| `pressure_msl` | Sea level pressure | hPa |
| `surface_pressure` | Surface air pressure | hPa |
| `relative_humidity_2m` | Relative humidity | % |
| `evapotranspiration` | Water evaporation | mm |
| `vapour_pressure_deficit` | VPD | kPa |

### Solar Radiation

| Variable | Description | Unit |
|----------|-------------|------|
| `shortwave_radiation` | Total solar radiation | W/m² |
| `direct_radiation` | Direct sunlight | W/m² |
| `diffuse_radiation` | Scattered sunlight | W/m² |
| `direct_normal_irradiance` | DNI for solar panels | W/m² |
| `sunshine_duration` | Minutes of sunshine | seconds |

### Weather Codes (WMO)

| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1, 2, 3 | Mainly clear, partly cloudy, overcast |
| 45, 48 | Fog and depositing rime fog |
| 51, 53, 55 | Drizzle: Light, moderate, dense |
| 61, 63, 65 | Rain: Slight, moderate, heavy |
| 71, 73, 75 | Snow fall: Slight, moderate, heavy |
| 80, 81, 82 | Rain showers: Slight, moderate, violent |
| 95 | Thunderstorm |
| 96, 99 | Thunderstorm with hail |

---

## Rate Limits & Pricing

### Free Tier (Non-Commercial)

**Limits**:
- 10,000 API calls per day
- No throttling for reasonable use
- No API key required
- All weather variables included
- All API endpoints available

**Perfect for**:
- Personal projects
- Educational use
- Research
- Prototyping
- Open-source projects

### Commercial Plans

**Starter - €29/month**:
- 1,000,000 API calls
- €0.000029 per call
- All features included
- Email support

**Professional - €79/month**:
- 5,000,000 API calls
- €0.0000158 per call
- Priority support
- Higher rate limits

**Business - €149/month**:
- 20,000,000 API calls
- €0.00000745 per call
- Dedicated support
- Custom solutions available

**Enterprise**:
- Custom pricing
- Unlimited calls
- SLA guarantees
- On-premise options

---

## Weather Models

Open-Meteo aggregates data from multiple national weather services:

### Global Models

| Model | Provider | Resolution | Coverage | Update |
|-------|----------|------------|----------|--------|
| ECMWF IFS | European Centre | 0.25° (~25 km) | Global | 4x daily |
| GFS | NOAA (USA) | 0.25° (~25 km) | Global | 4x daily |
| GEM | Environment Canada | 15 km | Global | 2x daily |
| JMA | Japan Met. Agency | 5 km | Global | 4x daily |
| Met Office UM | UK Met Office | 10 km | Global | 4x daily |

### Regional Models (High Resolution)

| Model | Provider | Resolution | Coverage | Update |
|-------|----------|------------|----------|--------|
| ICON-D2 | DWD (Germany) | 2 km | Central Europe | Hourly |
| ICON-EU | DWD (Germany) | 7 km | Europe | Hourly |
| HRRR | NOAA (USA) | 3 km | North America | Hourly |
| AROME | Météo-France | 1.5 km | France/Europe | 8x daily |
| HARMONIE-AROME | Met Norway | 1 km | Nordic region | 8x daily |
| GFS HRRR | NOAA (USA) | 3 km | USA | Hourly |

### Model Selection

**Automatic (Recommended)**:
```
?latitude=52.52&longitude=13.41&current=temperature_2m
```
Open-Meteo automatically selects the best model for the location.

**Manual Selection**:
```
?latitude=52.52&longitude=13.41&current=temperature_2m&models=icon_d2
```

Available model parameters:
- `best_match` - Highest resolution for location (default)
- `ecmwf_ifs04` - ECMWF global
- `gfs_seamless` - GFS with HRRR for USA
- `icon_seamless` - ICON with D2 for Europe
- `gem_seamless` - GEM for Canada

---

## Code Examples

### JavaScript/TypeScript

**Basic Fetch**:
```javascript
async function getCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weathercode
  };
}

// Usage
getCurrentWeather(40.7128, -74.0060).then(weather => {
  console.log(`Temperature: ${weather.temperature}°C`);
  console.log(`Humidity: ${weather.humidity}%`);
  console.log(`Wind: ${weather.windSpeed} km/h`);
});
```

**7-Day Forecast**:
```javascript
async function getWeeklyForecast(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weathercode&timezone=auto`;

  const response = await fetch(url);
  const data = await response.json();

  return data.daily.time.map((date, index) => ({
    date: date,
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    precipitation: data.daily.precipitation_sum[index],
    rainChance: data.daily.precipitation_probability_max[index],
    weatherCode: data.daily.weathercode[index]
  }));
}
```

**Hourly Data for Charts**:
```javascript
async function getHourlyData(lat, lon, days = 7) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m&forecast_days=${days}&timezone=auto`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    labels: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    precipitation: data.hourly.precipitation,
    windSpeed: data.hourly.wind_speed_10m
  };
}
```

### Python

**Basic Usage**:
```python
import requests

def get_current_weather(lat, lon):
    url = f"https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,wind_speed_10m,weathercode"
    }

    response = requests.get(url, params=params)
    data = response.json()

    return {
        "temperature": data["current"]["temperature_2m"],
        "wind_speed": data["current"]["wind_speed_10m"],
        "weather_code": data["current"]["weathercode"]
    }

# Usage
weather = get_current_weather(52.52, 13.41)
print(f"Temperature: {weather['temperature']}°C")
```

**With Official SDK**:
```python
import openmeteo_requests

# Initialize client
om = openmeteo_requests.Client()

# Prepare parameters
params = {
    "latitude": 52.52,
    "longitude": 13.41,
    "hourly": ["temperature_2m", "precipitation", "wind_speed_10m"],
    "current": ["temperature_2m", "weather_code"],
    "daily": ["temperature_2m_max", "precipitation_sum"],
    "timezone": "auto",
    "forecast_days": 7
}

# Make request
responses = om.weather_api("https://api.open-meteo.com/v1/forecast", params=params)
response = responses[0]

# Access current weather
current = response.Current()
current_temp = current.Variables(0).Value()
current_weather_code = current.Variables(1).Value()

print(f"Current temperature: {current_temp}°C")
print(f"Weather code: {current_weather_code}")

# Access hourly data
hourly = response.Hourly()
hourly_temp = hourly.Variables(0).ValuesAsNumpy()
hourly_precipitation = hourly.Variables(1).ValuesAsNumpy()

print(f"Hourly temperatures: {hourly_temp}")
```

**Historical Data Analysis**:
```python
import pandas as pd
import matplotlib.pyplot as plt

def analyze_historical_weather(lat, lon, start_date, end_date):
    url = "https://api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum"
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Convert to DataFrame
    df = pd.DataFrame({
        "date": pd.to_datetime(data["daily"]["time"]),
        "max_temp": data["daily"]["temperature_2m_max"],
        "min_temp": data["daily"]["temperature_2m_min"],
        "precipitation": data["daily"]["precipitation_sum"]
    })

    return df

# Analyze 5 years of data
df = analyze_historical_weather(52.52, 13.41, "2019-01-01", "2023-12-31")

# Plot temperature trends
plt.figure(figsize=(12, 6))
plt.plot(df["date"], df["max_temp"], label="Max Temperature")
plt.plot(df["date"], df["min_temp"], label="Min Temperature")
plt.legend()
plt.show()
```

### React Example

```jsx
import { useState, useEffect } from 'react';

function WeatherWidget({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="weather-widget">
      <h2>Current Weather</h2>
      <p>Temperature: {weather.current.temperature_2m}°C</p>
      <p>Wind Speed: {weather.current.wind_speed_10m} km/h</p>
      <h3>Today's Forecast</h3>
      <p>High: {weather.daily.temperature_2m_max[0]}°C</p>
      <p>Low: {weather.daily.temperature_2m_min[0]}°C</p>
    </div>
  );
}
```

---

## Comparison with Alternatives

### Open-Meteo vs OpenWeatherMap

| Feature | Open-Meteo | OpenWeatherMap |
|---------|-----------|----------------|
| **Setup** | No registration | Requires API key |
| **Free calls/day** | 10,000 | 1,000 (60/min) |
| **Forecast length** | 16 days | 5 days (free tier) |
| **Resolution** | 1-11 km | ~10-25 km |
| **Historical data** | 80 years free | Limited/paid |
| **Data sources** | National weather services | Crowdsourced + models |
| **Commercial start** | €29/mo (1M) | $40/mo (1M) |
| **Weather models** | 10+ selectable | 1 proprietary |
| **Hourly forecast** | Up to 384 hours | Up to 120 hours |

### Open-Meteo vs Visual Crossing

| Feature | Open-Meteo | Visual Crossing |
|---------|-----------|----------------|
| **Free tier** | 10,000/day | 1,000/day |
| **Registration** | Not required | Required |
| **Historical data** | 80 years | 70 years |
| **Pricing model** | Fixed monthly | Pay per call |
| **Weather queries** | Yes | Yes |
| **Timeline API** | Yes (hourly) | Yes (advanced) |
| **Data granularity** | 15-min to daily | Hourly to daily |

### Open-Meteo vs WeatherAPI

| Feature | Open-Meteo | WeatherAPI |
|---------|-----------|------------|
| **Free tier** | 10,000/day | 1M/month |
| **API key** | Not required | Required |
| **Forecast** | 16 days | 14 days |
| **Historical** | 80 years | Since 2015 |
| **Marine data** | Yes | Limited |
| **Air quality** | Yes | Yes |
| **Astronomy** | Limited | Yes (sun/moon) |

---

## Interactive Display Ideas

### 1. Weather Time Machine
Compare current conditions with historical data from the same date in past years.

**Features**:
- Side-by-side comparison slider
- Temperature trend graphs
- "X years ago today" snapshots
- Decade-by-decade averages
- Climate change visualization

### 2. Hyperlocal Weather Dashboard
1km resolution neighborhood weather with interactive maps.

**Features**:
- Street-level accuracy
- Live weather radar overlay
- Microclimate detection
- Temperature heatmaps
- Wind flow animations

### 3. Multi-Model Forecast Comparison
Display predictions from different weather models side-by-side.

**Features**:
- ECMWF vs GFS vs ICON
- Ensemble spread visualization
- Model accuracy statistics
- Confidence intervals
- Best/worst case scenarios

### 4. 80-Year Climate Trends
Long-term weather pattern analysis with interactive charts.

**Features**:
- Annual temperature trends
- Precipitation changes over decades
- Extreme weather events timeline
- Seasonal shift detection
- Climate model projections (to 2100)

### 5. Real-Time Weather Alerts
Location-based notifications for weather changes.

**Features**:
- Temperature drop warnings
- Precipitation alerts
- Wind speed notifications
- Severe weather tracking
- Customizable thresholds

### 6. Agricultural Weather Planner
Specialized dashboard for farming and gardening.

**Features**:
- Soil moisture predictions
- Frost warnings
- Growing degree days
- Optimal planting windows
- Irrigation scheduling

### 7. Air Quality + Weather Combo
Correlate weather patterns with pollution levels.

**Features**:
- AQI overlays on weather maps
- Pollution forecast
- Health recommendations
- Pollen predictions (when available)
- Best outdoor activity times

### 8. Marine Weather Station
Comprehensive ocean and coastal weather.

**Features**:
- Wave height forecasts
- Swell direction animations
- Sailing conditions calculator
- Fishing weather index
- Beach safety ratings

### 9. Energy Optimization Dashboard
Solar and wind power planning.

**Features**:
- Solar radiation forecasts
- Wind power generation estimates
- Heating/cooling degree days
- Energy cost predictions
- Battery storage optimization

### 10. Weather Data Playground
Create custom visualizations from API data.

**Features**:
- Drag-and-drop chart builder
- Multiple variable comparisons
- Export data as CSV/JSON
- Share visualizations
- Embed code generator

---

## Resources

### Official Documentation
- **Main Website**: https://open-meteo.com/
- **API Docs**: https://open-meteo.com/en/docs
- **Features**: https://open-meteo.com/en/features

### Code & Community
- **GitHub**: https://github.com/open-meteo/open-meteo
- **Python SDK**: https://pypi.org/project/openmeteo-requests/
- **npm Package**: https://www.npmjs.com/package/openmeteo

### Support
- **Email**: info@open-meteo.com
- **Issues**: GitHub Issues
- **Community**: GitHub Discussions

### Related Services
- **Geocoding API**: https://geocoding-api.open-meteo.com/v1/search
- **Elevation API**: https://api.open-meteo.com/v1/elevation

---

## License

**Code**: AGPLv3 - Open source, modifications must be shared

**Data**: CC BY 4.0 - Free to use, commercial allowed with attribution

**Attribution Example**:
```
Weather data provided by Open-Meteo.com (https://open-meteo.com/)
```

---

## Getting Started Checklist

- [ ] Choose your location (lat/lon)
- [ ] Decide on weather variables needed
- [ ] Select forecast length (7 or 16 days)
- [ ] Choose temporal resolution (hourly/daily/current)
- [ ] Test API endpoint in browser
- [ ] Integrate into your application
- [ ] Add error handling
- [ ] Implement caching (respect rate limits)
- [ ] Add attribution to UI
- [ ] Monitor usage for commercial needs

**First API Call**:
```
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m
```

Copy this URL into your browser right now - no setup needed!
