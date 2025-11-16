# Free Public APIs - Research Documentation

Welcome! This repository contains comprehensive research on free-to-use public APIs for building interactive applications with space, weather, and science data.

## Documentation

### 📡 [NASA & Space APIs](./NASA_APIS.md)
Complete guide to NASA and space-related APIs including:
- **NASA APOD** - Astronomy Picture of the Day
- **Mars Rover Photos** - Images from Curiosity, Perseverance, Opportunity, Spirit
- **NeoWs** - Near-Earth Object tracking and asteroid data
- **EPIC** - Earth imagery from DSCOVR satellite
- **EONET** - Real-time natural event tracking
- **SpaceX API** - Launch data, rockets, Starlink satellites
- **ISS Tracker** - Real-time International Space Station position
- Interactive display ideas and code examples

[View NASA & Space APIs Documentation →](./NASA_APIS.md)

### 🌤️ [Open-Meteo Weather API](./OPEN_METEO.md)
Comprehensive guide to the Open-Meteo weather API:
- **No API key required** - Start using immediately
- **High resolution** - 1-11km globally, up to 1km regionally
- **80+ years** of historical weather data
- **Multiple weather models** - ECMWF, GFS, ICON, HRRR, and more
- Marine weather, air quality, climate projections
- Free tier: 10,000 API calls/day
- Detailed code examples and interactive display ideas

[View Open-Meteo Documentation →](./OPEN_METEO.md)

## Quick Start Examples

### Get Today's Astronomy Picture (NASA)
```javascript
const API_KEY = 'YOUR_NASA_API_KEY'; // Get free at api.nasa.gov
const response = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
);
const apod = await response.json();
console.log(apod.title, apod.url);
```

### Get Current Weather (Open-Meteo)
```javascript
// No API key needed!
const response = await fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m'
);
const weather = await response.json();
console.log(`Temperature: ${weather.current.temperature_2m}°C`);
```

### Track the ISS in Real-Time
```javascript
// No API key needed!
const response = await fetch(
  'https://api.wheretheiss.at/v1/satellites/25544'
);
const iss = await response.json();
console.log(`ISS Location: ${iss.latitude}, ${iss.longitude}`);
```

## API Comparison

| API | Auth Required | Rate Limit | Best For | Documentation |
|-----|--------------|------------|----------|---------------|
| NASA APOD | API Key (free) | 30/hr demo | Daily space images | [View](./NASA_APIS.md#1-astronomy-picture-of-the-day-apod) |
| NASA Mars Rovers | API Key (free) | 30/hr demo | Mars surface photos | [View](./NASA_APIS.md#2-mars-rover-photos) |
| NASA NeoWs | API Key (free) | 30/hr demo | Asteroid tracking | [View](./NASA_APIS.md#3-near-earth-object-web-service-neows) |
| SpaceX API | None | Generous | Launch data | [View](./NASA_APIS.md#1-spacex-api) |
| ISS Tracker | None | ~1/sec | Real-time position | [View](./NASA_APIS.md#2-where-the-iss-at-wtia) |
| Open-Meteo | None | 10,000/day | Weather forecasts | [View](./OPEN_METEO.md) |
| EONET | None | Generous | Natural events | [View](./NASA_APIS.md#5-earth-observatory-natural-event-tracker-eonet) |

## Getting Started

### 1. Choose Your APIs
Browse the documentation to find APIs that match your project needs:
- **Space enthusiasts**: Check out [NASA APIs](./NASA_APIS.md)
- **Weather apps**: Explore [Open-Meteo](./OPEN_METEO.md)
- **Both!**: Combine them for space weather dashboards

### 2. Get API Keys (if needed)
- **NASA APIs**: Register at https://api.nasa.gov/ (~5 minutes, free)
- **Open-Meteo**: No registration needed!
- **SpaceX & ISS**: No authentication required

### 3. Start Building
Both documentation files include:
- Detailed API endpoint descriptions
- Complete parameter references
- Response examples
- Code snippets in JavaScript/Python
- React component examples
- Interactive display ideas
- Best practices

## Interactive Display Ideas

We've brainstormed **20+ creative concepts** for displaying this data:

**Space-Focused**:
- APOD Gallery Wall with infinite scroll
- Mars Rover Command Center
- 3D Asteroid Tracker
- ISS Position over Live Earth
- Space Event Calendar

**Weather-Focused**:
- Weather Time Machine (80 years of data)
- Hyperlocal Weather Dashboard (1km resolution)
- Multi-Model Forecast Comparison
- Climate Trend Visualizer
- Air Quality + Weather Combo

**Advanced**:
- AR Space Explorer (mobile)
- Data Visualization Playground
- Cosmic Photo Comparisons
- Energy Optimization Dashboard

See full details in the respective documentation files.

## Technology Stack Recommendations

**Frontend Frameworks**:
- React, Vue, Svelte for UI components
- Three.js for 3D visualizations (asteroids, Earth, ISS)
- D3.js or Chart.js for data charts
- Leaflet or Mapbox for maps

**Utilities**:
- TanStack Query for API caching
- date-fns for date manipulation
- Framer Motion for animations

**Styling**:
- Tailwind CSS for rapid development
- CSS Grid/Flexbox for layouts

## Resources

### Official Sites
- NASA APIs: https://api.nasa.gov/
- Open-Meteo: https://open-meteo.com/
- SpaceX API: https://github.com/r-spacex/SpaceX-API
- ISS Tracker: https://wheretheiss.at/

### Documentation in This Repo
- [NASA & Space APIs Guide](./NASA_APIS.md)
- [Open-Meteo Weather Guide](./OPEN_METEO.md)

## License

This research documentation is provided for educational and development purposes.

**API Licenses**:
- NASA APIs: Public domain (US Government)
- Open-Meteo: Data CC BY 4.0, Code AGPLv3
- SpaceX API: Apache 2.0
- ISS Tracker: Free to use

Always respect individual API usage policies and rate limits.

---

## Contributing

Found an error or want to add information? This repository documents free public APIs for building interactive applications. Contributions are welcome!

## Support

For API-specific issues:
- NASA: hq-open-innovation@mail.nasa.gov
- Open-Meteo: info@open-meteo.com
- SpaceX API: GitHub Issues
- ISS Tracker: Via website

---

**Ready to build something amazing? Start with the documentation:**
- [NASA & Space APIs →](./NASA_APIS.md)
- [Open-Meteo Weather →](./OPEN_METEO.md)

Happy coding! 🚀🌍☁️
