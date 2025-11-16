# NASA & Space APIs - Complete Guide

## Table of Contents
- [Overview](#overview)
- [NASA APIs](#nasa-apis)
- [Other Space APIs](#other-space-apis)
- [Interactive Display Ideas](#interactive-display-ideas)
- [Code Examples](#code-examples)
- [API Comparison](#api-comparison)
- [Resources](#resources)

---

## Overview

NASA and other space agencies provide free access to an incredible wealth of space data, imagery, and real-time information. From stunning astronomy pictures to Mars rover photos, asteroid tracking to ISS positions, these APIs make space exploration accessible to everyone.

### Why Use Space APIs?

- **Inspiring Content**: Stunning imagery and fascinating data
- **Educational Value**: Perfect for learning and teaching
- **Real-time Data**: Live tracking of spacecraft and celestial objects
- **Historical Archives**: Decades of space exploration data
- **Free Access**: Most require only a free API key or no key at all

---

## NASA APIs

NASA collects over **15 terabytes of data daily** and makes it publicly accessible through various APIs.

### Getting Your NASA API Key

1. Visit https://api.nasa.gov/
2. Fill out the simple registration form (~5 minutes)
3. Receive your API key via email
4. Start making requests immediately

### Rate Limits

- **DEMO_KEY**: 30 requests/hour, 50 requests/day (for testing)
- **Personal API Key**: Higher limits suitable for production apps

---

## NASA API Endpoints

### 1. Astronomy Picture of the Day (APOD)

The most beloved NASA API - delivers a stunning astronomical image daily with professional explanations.

**Endpoint**: `https://api.nasa.gov/planetary/apod`

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `api_key` | string | Your NASA API key (required) |
| `date` | YYYY-MM-DD | Specific date (optional, defaults to today) |
| `start_date` | YYYY-MM-DD | Starting date for range query |
| `end_date` | YYYY-MM-DD | Ending date for range query |
| `count` | integer | Number of random images (max 100) |
| `thumbs` | boolean | Include thumbnail URL for videos |

**Response Example**:
```json
{
  "date": "2025-11-16",
  "explanation": "Why does this galaxy have such a long tail?",
  "hdurl": "https://apod.nasa.gov/apod/image/2511/galaxy_hubble_4096.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "A Long Tail for Galaxy AM 0644-741",
  "url": "https://apod.nasa.gov/apod/image/2511/galaxy_hubble_1024.jpg",
  "copyright": "NASA, ESA, Hubble"
}
```

**Example Requests**:
```bash
# Today's picture
https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY

# Specific date
https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY&date=2024-12-25

# Date range
https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY&start_date=2024-01-01&end_date=2024-01-07

# Random selection
https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY&count=10
```

**Use Cases**:
- Daily space wallpaper apps
- Educational astronomy websites
- Social media bots
- Screen savers
- Digital signage

---

### 2. Mars Rover Photos

Access thousands of images from NASA's Mars rovers: Curiosity, Opportunity, Spirit, and Perseverance.

**Endpoint**: `https://api.nasa.gov/mars-photos/api/v1/rovers/{rover_name}/photos`

**Available Rovers**:
- **Curiosity** (2012 - present) - Most active
- **Perseverance** (2021 - present) - Latest rover
- **Opportunity** (2004 - 2018) - Historic mission
- **Spirit** (2004 - 2010) - Historic mission

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `sol` | integer | Martian day (0 = landing day) |
| `earth_date` | YYYY-MM-DD | Earth calendar date |
| `camera` | string | Filter by camera (see below) |
| `page` | integer | Pagination (25 photos per page) |
| `api_key` | string | Your NASA API key |

**Camera Types**:

**Curiosity Cameras**:
- `FHAZ` - Front Hazard Avoidance Camera
- `RHAZ` - Rear Hazard Avoidance Camera
- `MAST` - Mast Camera (main imaging)
- `CHEMCAM` - Chemistry and Camera Complex
- `MAHLI` - Mars Hand Lens Imager
- `MARDI` - Mars Descent Imager
- `NAVCAM` - Navigation Camera

**Perseverance Cameras**:
- `EDL_RUCAM` - Rover Up-Look Camera
- `EDL_RDCAM` - Rover Down-Look Camera
- `EDL_DDCAM` - Descent Stage Down-Look Camera
- `NAVCAM_LEFT/RIGHT` - Navigation Cameras
- `MCZ_LEFT/RIGHT` - Mast Camera Zoom
- `FRONT_HAZCAM_LEFT/RIGHT` - Hazard Cameras
- `SHERLOC_WATSON` - Wide Angle Topographic Sensor

**Response Example**:
```json
{
  "photos": [
    {
      "id": 102693,
      "sol": 1000,
      "camera": {
        "name": "FHAZ",
        "full_name": "Front Hazard Avoidance Camera"
      },
      "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/...",
      "earth_date": "2015-05-30",
      "rover": {
        "name": "Curiosity",
        "landing_date": "2012-08-06",
        "launch_date": "2011-11-26",
        "status": "active"
      }
    }
  ]
}
```

**Example Requests**:
```bash
# Curiosity photos from Sol 1000
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YOUR_KEY

# Perseverance photos from Earth date
https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=2024-01-15&api_key=YOUR_KEY

# Specific camera only
https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=MAST&api_key=YOUR_KEY
```

**Additional Endpoints**:
```bash
# Get rover manifest (available sols, total photos)
https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=YOUR_KEY
```

---

### 3. Near Earth Object Web Service (NeoWs)

Track asteroids and comets approaching Earth with orbital data and hazard classifications.

**Endpoint**: `https://api.nasa.gov/neo/rest/v1/feed`

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | YYYY-MM-DD | Starting date (max 7 day range) |
| `end_date` | YYYY-MM-DD | Ending date |
| `api_key` | string | Your NASA API key |

**Response Data**:
- Asteroid name and ID
- Close approach date/time
- Relative velocity (km/s, km/h, mph)
- Miss distance (astronomical, lunar, kilometers, miles)
- Estimated diameter (min/max in meters, km, feet, miles)
- Potentially hazardous classification
- Orbital data

**Response Example**:
```json
{
  "element_count": 15,
  "near_earth_objects": {
    "2025-11-16": [
      {
        "id": "2021277",
        "name": "21277 (1996 TO5)",
        "absolute_magnitude_h": 16.1,
        "estimated_diameter": {
          "meters": {
            "estimated_diameter_min": 1589.2,
            "estimated_diameter_max": 3553.5
          }
        },
        "is_potentially_hazardous_asteroid": false,
        "close_approach_data": [
          {
            "close_approach_date": "2025-11-16",
            "relative_velocity": {
              "kilometers_per_hour": "97342.7"
            },
            "miss_distance": {
              "lunar": "19.3",
              "kilometers": "7425380"
            }
          }
        ]
      }
    ]
  }
}
```

**Additional Endpoints**:

```bash
# Lookup specific asteroid
https://api.nasa.gov/neo/rest/v1/neo/{asteroid_id}?api_key=YOUR_KEY

# Browse all NEOs
https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=YOUR_KEY

# Get today's close approaches
https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-11-16&api_key=YOUR_KEY
```

---

### 4. Earth Polychromatic Imaging Camera (EPIC)

Full-disc imagery of Earth from NASA's DSCOVR satellite at the L1 Lagrange point.

**Endpoint**: `https://api.nasa.gov/EPIC/api/natural`

**Image Types**:
- **Natural** - True color images
- **Enhanced** - Enhanced color for better visibility

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `api_key` | string | Your NASA API key |
| `date` | YYYY-MM-DD | Specific date (optional) |

**Response Example**:
```json
[
  {
    "identifier": "20151031003633",
    "caption": "This image was taken by NASA's EPIC camera...",
    "image": "epic_1b_20151031003633",
    "version": "03",
    "centroid_coordinates": {
      "lat": 1.418989,
      "lon": -175.328125
    },
    "dscovr_j2000_position": {
      "x": -1283061.5,
      "y": -669893.9,
      "z": -130240.3
    },
    "lunar_j2000_position": {
      "x": 24760.9,
      "y": -328603.6,
      "z": -143761.8
    },
    "sun_j2000_position": {
      "x": 133079296.0,
      "y": -56190550.4,
      "z": -24353616.0
    },
    "date": "2015-10-31 00:31:45"
  }
]
```

**Image URL Construction**:
```
https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/png/epic_1b_20151031003633.png
```

**Example Requests**:
```bash
# Latest images
https://api.nasa.gov/EPIC/api/natural?api_key=YOUR_KEY

# Specific date
https://api.nasa.gov/EPIC/api/natural/date/2015-10-31?api_key=YOUR_KEY

# All available dates
https://api.nasa.gov/EPIC/api/natural/all?api_key=YOUR_KEY

# Enhanced color
https://api.nasa.gov/EPIC/api/enhanced?api_key=YOUR_KEY
```

---

### 5. Earth Observatory Natural Event Tracker (EONET)

Real-time tracking of natural events like wildfires, storms, volcanoes, and floods.

**Endpoint**: `https://eonet.gsfc.nasa.gov/api/v3/events`

**No API Key Required** ✨

**Event Categories**:
- Drought
- Dust and Haze
- Earthquakes
- Floods
- Landslides
- Manmade
- Sea and Lake Ice
- Severe Storms
- Snow
- Temperature Extremes
- Volcanoes
- Water Color
- Wildfires

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | `open` or `closed` (default: all) |
| `limit` | integer | Max number of events (default: 5) |
| `days` | integer | Events in last N days |
| `category` | string | Filter by category ID |

**Response Example**:
```json
{
  "title": "EONET Events",
  "events": [
    {
      "id": "EONET_6204",
      "title": "Wildfire - California, United States",
      "description": "",
      "link": "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6204",
      "categories": [
        {
          "id": "wildfires",
          "title": "Wildfires"
        }
      ],
      "sources": [
        {
          "id": "InciWeb",
          "url": "http://inciweb.nwcg.gov/..."
        }
      ],
      "geometry": [
        {
          "magnitudeValue": null,
          "magnitudeUnit": null,
          "date": "2024-08-15T00:00:00Z",
          "type": "Point",
          "coordinates": [-120.345, 38.234]
        }
      ]
    }
  ]
}
```

**Example Requests**:
```bash
# Open events only
https://eonet.gsfc.nasa.gov/api/v3/events?status=open

# Wildfires in last 30 days
https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&days=30

# Get 50 recent events
https://eonet.gsfc.nasa.gov/api/v3/events?limit=50

# Categories list
https://eonet.gsfc.nasa.gov/api/v3/categories
```

---

## Other Space APIs

### 1. SpaceX API

Open-source REST API for SpaceX mission data - **no authentication required**.

**Base URL**: `https://api.spacexdata.com/v5/`

**Endpoints**:

```bash
# Latest launch
https://api.spacexdata.com/v5/launches/latest

# Upcoming launches
https://api.spacexdata.com/v5/launches/upcoming

# Past launches
https://api.spacexdata.com/v5/launches/past

# All rockets
https://api.spacexdata.com/v5/rockets

# All capsules
https://api.spacexdata.com/v5/capsules

# Starlink satellites
https://api.spacexdata.com/v5/starlink

# Launchpads
https://api.spacexdata.com/v5/launchpads

# Landing pads
https://api.spacexdata.com/v5/landpads

# Company info
https://api.spacexdata.com/v5/company
```

**Example Response (Latest Launch)**:
```json
{
  "id": "5eb87d47ffd86e000604b38a",
  "name": "Starlink-5 (v1.0)",
  "date_utc": "2024-03-15T09:22:00.000Z",
  "success": true,
  "rocket": "5e9d0d95eda69973a809d1ec",
  "crew": [],
  "ships": [],
  "payloads": ["5eb0e4d0b6c3bb0006eeb253"],
  "launchpad": "5e9e4501f509094ba4566f84",
  "details": "Starlink mission launching 60 satellites",
  "links": {
    "patch": {
      "small": "https://images2.imgbox.com/...",
      "large": "https://images2.imgbox.com/..."
    },
    "reddit": {
      "launch": "https://www.reddit.com/r/spacex/..."
    },
    "webcast": "https://www.youtube.com/watch?v=..."
  }
}
```

**Query Features**:
- Filter by date range
- Search by name
- Sort by any field
- Pagination support
- Population (join related data)

---

### 2. Where The ISS At? (WTIA)

Real-time International Space Station position tracking.

**Base URL**: `https://api.wheretheiss.at/v1/`

**No authentication required** - Rate limit: ~1 request/second

**Endpoints**:

**Current ISS Position**:
```bash
https://api.wheretheiss.at/v1/satellites/25544
```

**Response**:
```json
{
  "name": "iss",
  "id": 25544,
  "latitude": 45.5232,
  "longitude": -73.5673,
  "altitude": 420.134,
  "velocity": 27560.2,
  "visibility": "daylight",
  "footprint": 4528.8,
  "timestamp": 1700150400,
  "daynum": 2460272.5,
  "solar_lat": -18.234,
  "solar_lon": 156.789,
  "units": "kilometers"
}
```

**Parameters**:
- `units=miles` or `units=kilometers` (default: km)
- `timestamp` - Unix timestamp for prediction

**Historical Positions**:
```bash
https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1700150400,1700150460,1700150520
```

Returns up to 10 positions for specified timestamps (comma-delimited).

**TLE Data (Orbital Elements)**:
```bash
https://api.wheretheiss.at/v1/satellites/25544/tles
```

Returns Two-Line Element data for orbital calculations.

**Geographic Information**:
```bash
https://api.wheretheiss.at/v1/coordinates/45.5232,-73.5673
```

Returns timezone, UTC offset, and country code for coordinates.

---

### 3. Open Astronomy Catalogs API

Machine-readable astronomical catalogs for research.

**Catalogs Available**:
- **Supernovae** - https://api.astrocats.space/supernova
- **Tidal Disruptions** - https://api.astrocats.space/tde
- **Kilonovae** - https://api.astrocats.space/kilonova
- **Fast Stars** - https://api.astrocats.space/faststars

**Example Request**:
```bash
# Get supernova SN2011fe
https://api.astrocats.space/supernova/SN2011fe
```

**Features**:
- Photometry data
- Spectroscopy
- Classifications
- Discovery dates
- Host galaxies

---

### 4. Astronomy API

Planetary positions, moon phases, and celestial events.

**Website**: https://astronomyapi.com/

**Features**:
- Planet positions
- Moon phases
- Solar/lunar eclipses
- Star charts
- Rise/set times
- Constellations

**Requires registration for API key**

---

## Interactive Display Ideas

### NASA-Specific Ideas

#### 1. APOD Gallery Wall
**Description**: Pinterest-style masonry grid of astronomy pictures

**Features**:
- Infinite scroll loading past entries
- Full-screen modal with descriptions
- Filter by date range
- Search by keywords in titles/descriptions
- Save favorites to localStorage
- Share on social media
- Animated image transitions
- Video player integration
- Timeline slider for date navigation

**Tech Stack**:
- React Masonry CSS
- Framer Motion for animations
- React Router for deep linking
- LocalStorage API

#### 2. Mars Rover Command Center
**Description**: Interactive dashboard for exploring Mars

**Features**:
- Multi-rover comparison view
- Camera selector with rover diagram
- Sol calendar with mission milestones
- 3D photo carousel
- Mission statistics dashboard
- "Random photo" discovery
- Panoramic photo stitcher
- Download high-res images
- Filter by weather conditions

**Interactive Elements**:
- Toggle between rovers
- Animate through sols
- Side-by-side comparison
- Fullscreen gallery mode
- Photo metadata overlay

#### 3. Asteroid Watch
**Description**: Real-time near-Earth object tracker

**Features**:
- 3D solar system visualization
- Asteroid approach timeline
- Size comparison tool (vs landmarks)
- Orbit path animations
- "Potentially hazardous" alerts
- Distance calculator (AU, km, lunar distances)
- Countdown to next approach
- Historical close approaches
- Impact risk assessment

**Visualization**:
- Three.js 3D scene
- Clickable asteroids
- Zoom/rotate controls
- Time acceleration
- Trajectory predictions

#### 4. Earth Observer
**Description**: Living Earth viewer with EPIC imagery

**Features**:
- Daily Earth image gallery
- Time-lapse of Earth rotation
- EONET event overlays
- Storm/fire/flood tracking
- Before/after comparisons
- Seasonal changes
- Cloud pattern animations
- Lunar transit detection

**Layers**:
- Natural color
- Enhanced color
- Weather events
- Day/night terminator
- City lights (composite)

#### 5. Space Event Calendar
**Description**: Unified astronomical event timeline

**Features**:
- SpaceX launch schedule
- Asteroid close approaches
- ISS visible passes (user location)
- Daily APOD notifications
- Mars rover milestones
- Natural Earth events
- Countdown timers
- iCal/Google Calendar export
- Reminder system

---

### Combined API Concepts

#### 6. ISS Tracker + Earth View
**Description**: Track ISS over live Earth imagery

**Features**:
- Real-time ISS position on EPIC images
- Orbital path prediction (next 90 minutes)
- Live telemetry (altitude, velocity)
- Visibility calculator for ground
- Crew information
- Next pass over your location
- Simulated ISS camera view
- Ground track visualization

**Data Sources**:
- WTIA API for position
- NASA EPIC for Earth images
- Predictive orbital calculations

#### 7. Multi-Source Space Dashboard
**Description**: Comprehensive space monitoring

**Features**:
- Today's APOD
- Latest Mars rover photo
- Next asteroid approach
- ISS current position
- Recent SpaceX launch
- Active natural events
- Space weather alerts
- Customizable widgets

**Layout**:
- Drag-and-drop widgets
- Responsive grid
- Dark/light themes
- Auto-refresh intervals

#### 8. Cosmic Photo Comparison
**Description**: Side-by-side image analysis

**Features**:
- APOD vs Mars rover
- Earth from ISS vs EPIC
- Same location, different dates
- Size comparisons (planets, asteroids)
- Spectral wavelength comparisons

**Interface**:
- Drag slider reveal
- Swap comparison sources
- Annotation tools
- Share comparisons

---

### Advanced Concepts

#### 9. AR Space Explorer
**Description**: Mobile augmented reality experience

**Features**:
- Point phone at sky for ISS tracking
- AR asteroid size comparisons
- Place Mars rover in your room
- Solar system scale model
- Star identification
- Planet positions overlay

**Technology**:
- WebXR API
- AR.js
- Three.js
- Device orientation API

#### 10. Data Visualization Playground
**Description**: Create custom charts from space data

**Features**:
- Asteroid size distribution
- Mars temperature trends
- Launch success rates over time
- Photo counts by rover/camera
- Natural event frequency maps
- APOD media type breakdown

**Interactivity**:
- Choose data sources
- Multiple chart types (line, bar, scatter, heat)
- Custom date ranges
- Export as PNG/SVG/CSV
- Embed code generator

---

## Code Examples

### JavaScript/Fetch

**APOD - Today's Picture**:
```javascript
async function getTodaysAPOD() {
  const API_KEY = 'YOUR_NASA_API_KEY';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    title: data.title,
    explanation: data.explanation,
    url: data.url,
    hdurl: data.hdurl,
    mediaType: data.media_type
  };
}

// Usage
getTodaysAPOD().then(apod => {
  console.log(apod.title);
  document.getElementById('apod-image').src = apod.url;
});
```

**Mars Rover - Latest Photos**:
```javascript
async function getMarsPhotos(rover, sol, camera = null) {
  const API_KEY = 'YOUR_NASA_API_KEY';
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`;

  if (camera) {
    url += `&camera=${camera}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.photos.map(photo => ({
    id: photo.id,
    imageUrl: photo.img_src,
    earthDate: photo.earth_date,
    camera: photo.camera.full_name
  }));
}

// Get Curiosity photos from Sol 1000
getMarsPhotos('curiosity', 1000, 'MAST').then(photos => {
  console.log(`Found ${photos.length} photos`);
});
```

**NEO - Upcoming Asteroids**:
```javascript
async function getUpcomingAsteroids(days = 7) {
  const API_KEY = 'YOUR_NASA_API_KEY';
  const today = new Date();
  const endDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(today)}&end_date=${formatDate(endDate)}&api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const asteroids = [];
  for (const date in data.near_earth_objects) {
    data.near_earth_objects[date].forEach(neo => {
      asteroids.push({
        name: neo.name,
        date: date,
        isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
        missDistance: neo.close_approach_data[0].miss_distance.kilometers,
        velocity: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        diameter: neo.estimated_diameter.meters.estimated_diameter_max
      });
    });
  }

  return asteroids;
}
```

**ISS Position**:
```javascript
async function getISSPosition() {
  const url = 'https://api.wheretheiss.at/v1/satellites/25544';

  const response = await fetch(url);
  const data = await response.json();

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    altitude: data.altitude,
    velocity: data.velocity,
    visibility: data.visibility,
    timestamp: new Date(data.timestamp * 1000)
  };
}

// Track ISS in real-time
setInterval(async () => {
  const iss = await getISSPosition();
  console.log(`ISS is at ${iss.latitude.toFixed(2)}, ${iss.longitude.toFixed(2)}`);
  // Update map marker
}, 5000);
```

**SpaceX - Next Launch**:
```javascript
async function getNextSpaceXLaunch() {
  const url = 'https://api.spacexdata.com/v5/launches/next';

  const response = await fetch(url);
  const data = await response.json();

  return {
    name: data.name,
    launchDate: new Date(data.date_utc),
    details: data.details,
    webcast: data.links.webcast,
    patch: data.links.patch.large
  };
}
```

**EONET - Active Events**:
```javascript
async function getActiveNaturalEvents(category = null) {
  let url = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50';

  if (category) {
    url += `&category=${category}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.events.map(event => ({
    id: event.id,
    title: event.title,
    category: event.categories[0].title,
    coordinates: event.geometry[0].coordinates,
    date: event.geometry[0].date
  }));
}

// Get active wildfires
getActiveNaturalEvents('wildfires').then(fires => {
  console.log(`${fires.length} active wildfires`);
});
```

---

### React Component Examples

**APOD Component**:
```jsx
import { useState, useEffect } from 'react';

function APOD({ apiKey }) {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        const data = await response.json();
        setApod(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, [apiKey]);

  if (loading) return <div>Loading today's cosmic wonder...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="apod">
      <h1>{apod.title}</h1>
      <p className="date">{apod.date}</p>

      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} />
      ) : (
        <iframe src={apod.url} title={apod.title} />
      )}

      <p className="explanation">{apod.explanation}</p>

      {apod.copyright && (
        <p className="copyright">© {apod.copyright}</p>
      )}
    </div>
  );
}
```

**ISS Tracker Component**:
```jsx
import { useState, useEffect } from 'react';

function ISSTracker() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchPosition = async () => {
      const response = await fetch(
        'https://api.wheretheiss.at/v1/satellites/25544'
      );
      const data = await response.json();
      setPosition(data);
    };

    fetchPosition();
    const interval = setInterval(fetchPosition, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!position) return <div>Locating ISS...</div>;

  return (
    <div className="iss-tracker">
      <h2>International Space Station</h2>
      <div className="stats">
        <div>
          <strong>Latitude:</strong> {position.latitude.toFixed(4)}°
        </div>
        <div>
          <strong>Longitude:</strong> {position.longitude.toFixed(4)}°
        </div>
        <div>
          <strong>Altitude:</strong> {position.altitude.toFixed(2)} km
        </div>
        <div>
          <strong>Velocity:</strong> {position.velocity.toFixed(2)} km/h
        </div>
        <div>
          <strong>Status:</strong> {position.visibility}
        </div>
      </div>
    </div>
  );
}
```

---

## API Comparison

| API | Auth | Rate Limit | Best For | Cost |
|-----|------|------------|----------|------|
| **NASA APOD** | API Key | 30/hr (demo), higher with key | Daily space imagery | Free |
| **NASA Mars Rovers** | API Key | Same as APOD | Mars surface photos | Free |
| **NASA NeoWs** | API Key | Same as APOD | Asteroid tracking | Free |
| **NASA EPIC** | API Key | Same as APOD | Earth imagery | Free |
| **NASA EONET** | None | Generous | Natural event tracking | Free |
| **SpaceX API** | None | Unspecified (generous) | Launch data | Free |
| **ISS Tracker** | None | ~1/sec | Real-time ISS position | Free |
| **Astronomy API** | API Key | Varies | Planetary data | Freemium |

---

## Resources

### NASA APIs
- **Main Portal**: https://api.nasa.gov/
- **GitHub**: https://github.com/nasa/api-docs
- **Contact**: hq-open-innovation@mail.nasa.gov

### SpaceX API
- **GitHub**: https://github.com/r-spacex/SpaceX-API
- **Docs**: https://github.com/r-spacex/SpaceX-API/tree/master/docs
- **Postman**: https://www.postman.com/api-evangelist/workspace/space

### ISS Tracker
- **Website**: https://wheretheiss.at/
- **Developer Docs**: https://wheretheiss.at/w/developer

### EONET
- **Website**: https://eonet.gsfc.nasa.gov/
- **API Docs**: https://eonet.gsfc.nasa.gov/docs/v3

---

## Best Practices

### API Key Security
```javascript
// ❌ Don't expose API keys in frontend
const API_KEY = 'YOUR_KEY_HERE';

// ✅ Use environment variables
const API_KEY = process.env.REACT_APP_NASA_API_KEY;

// ✅ Or use a backend proxy
const response = await fetch('/api/nasa/apod');
```

### Caching
```javascript
// Cache APOD for 24 hours
const CACHE_KEY = 'apod_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

async function getCachedAPOD() {
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const data = await fetchAPOD();
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));

  return data;
}
```

### Error Handling
```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Show user-friendly message
    // Log to error tracking service
    throw error;
  }
}
```

### Rate Limit Management
```javascript
class RateLimiter {
  constructor(maxRequests, perMilliseconds) {
    this.max = maxRequests;
    this.window = perMilliseconds;
    this.requests = [];
  }

  async throttle(fn) {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.window);

    if (this.requests.length >= this.max) {
      const oldestRequest = this.requests[0];
      const waitTime = this.window - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requests.push(Date.now());
    return fn();
  }
}

// NASA demo key: 30 requests per hour
const limiter = new RateLimiter(30, 60 * 60 * 1000);

// Usage
await limiter.throttle(() => fetchAPOD());
```

---

## Getting Started Checklist

- [ ] Register for NASA API key at https://api.nasa.gov/
- [ ] Test APOD endpoint with your key
- [ ] Explore Mars rover photos
- [ ] Check upcoming asteroid approaches
- [ ] Track ISS position
- [ ] Browse SpaceX launch history
- [ ] Monitor active natural events
- [ ] Implement error handling
- [ ] Add response caching
- [ ] Build your first space app! 🚀

**Your First API Call**:
```
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```

Try it now - copy this URL into your browser!
