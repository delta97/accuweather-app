# 🚀 NASA APOD Gallery

A beautiful, responsive web application showcasing NASA's Astronomy Picture of the Day (APOD) archive. Built with React, TypeScript, and Tailwind CSS V3.

![NASA APOD Gallery](https://img.shields.io/badge/NASA-APOD%20Gallery-0B3D91?style=for-the-badge&logo=nasa)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Core Features
- 🌌 **Browse NASA's APOD Archive** - Explore stunning space imagery and videos from NASA's daily collection
- 🔍 **Real-time Search** - Filter pictures by title or description with instant results
- ❤️ **Favorites System** - Save your favorite space images with localStorage persistence
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop viewing
- 🎨 **Masonry Grid Layout** - Beautiful Pinterest-style image gallery
- 🖼️ **Full-Screen Modal** - View images in high resolution with detailed descriptions
- ♿ **Accessibility** - WCAG 2.1 compliant with ARIA labels and keyboard navigation
- ⚡ **Performance Optimized** - Lazy loading images, efficient API calls, and caching

### User Experience
- Smooth animations and transitions
- Progressive image loading with spinners
- Error handling with user-friendly messages
- Keyboard shortcuts (ESC to close modal, Enter/Space to open cards)
- Focus management and screen reader support
- Dark theme optimized for viewing space imagery

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS V3
- **Build Tool**: Vite
- **API**: NASA Open APIs
- **State Management**: React Context API
- **Storage**: localStorage API

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- A NASA API key (free - get it at [api.nasa.gov](https://api.nasa.gov/))

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your NASA API key:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

**Getting a NASA API Key:**
1. Visit [https://api.nasa.gov/](https://api.nasa.gov/)
2. Fill out the simple registration form (takes ~1 minute)
3. Receive your API key instantly via email
4. For testing, you can use `DEMO_KEY` (limited to 30 requests/hour)

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

Preview production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
nasa-apod-gallery/
├── src/
│   ├── components/          # React components
│   │   ├── Header/         # App header with navigation
│   │   ├── SearchBar/      # Search input component
│   │   ├── APODCard/       # Individual APOD card
│   │   ├── APODModal/      # Full-screen image modal
│   │   ├── Gallery/        # Main gallery grid
│   │   └── FavoritesList/  # Favorites view
│   ├── contexts/           # React Context providers
│   │   └── AppContext.tsx  # Global app state
│   ├── hooks/              # Custom React hooks
│   │   ├── useAPOD.ts      # APOD data fetching
│   │   └── useFavorites.ts # Favorites management
│   ├── services/           # API services
│   │   └── nasaApi.ts      # NASA API integration
│   ├── types/              # TypeScript type definitions
│   │   └── apod.ts         # APOD data types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles + Tailwind
├── public/                 # Static assets
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design Principles

This application follows industry best practices from:

### Nielsen Norman Group
- **Recognition over recall**: Clear visual indicators for favorites and actions
- **User control and freedom**: Easy navigation, ESC key to close modals
- **Consistency**: Uniform button styles, spacing, and interactions
- **Error prevention**: Confirmation dialogs for destructive actions
- **Visibility of system status**: Loading indicators, empty states

### Microsoft Fluent Design
- **Depth**: Layered cards with shadows and elevation
- **Motion**: Smooth, purposeful animations
- **Material**: Glass-effect overlays, backdrop blur
- **Scale**: Responsive breakpoints for all screen sizes

### WCAG 2.1 Accessibility
- **Perceivable**: Alt text for images, semantic HTML
- **Operable**: Keyboard navigation, focus indicators
- **Understandable**: Clear labels, consistent navigation
- **Robust**: ARIA attributes, screen reader support

## 🔑 Key Components

### Header
- Responsive navigation
- View mode toggle (Gallery/Favorites)
- Favorite count badge
- NASA branding

### SearchBar
- Real-time filtering
- Clear button
- Accessible search input

### APODCard
- Progressive image loading
- Hover effects
- Favorite toggle
- Media type indicators
- Responsive images

### APODModal
- Full-screen overlay
- High-resolution images
- Download functionality
- Keyboard shortcuts
- Focus trap

### Gallery
- Masonry grid layout
- Infinite scroll/Load more
- Loading states
- Error handling
- Search results count

### FavoritesList
- Saved favorites display
- Clear all functionality
- Empty state guidance
- Same layout as gallery

## 🎯 API Rate Limits

- **DEMO_KEY**: 30 requests/hour, 50 requests/day
- **Personal API Key**: Higher limits (1000+ requests/hour)

The app implements:
- Efficient batching for date ranges
- localStorage caching
- Smart pagination

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: 1024px - 1536px (3 columns)
- **Large Desktop**: > 1536px (4 columns)

## 🔒 Security Considerations

- API keys stored in environment variables (never in code)
- `.env` file excluded from Git
- No sensitive data in localStorage
- External links use `rel="noopener noreferrer"`
- Content Security Policy compatible

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Gallery View**
   - [ ] Images load correctly
   - [ ] Search filters work
   - [ ] Load more button works
   - [ ] Cards are clickable

2. **Favorites**
   - [ ] Add favorite works
   - [ ] Remove favorite works
   - [ ] Favorites persist on reload
   - [ ] Clear all works

3. **Modal**
   - [ ] Opens on card click
   - [ ] Closes on ESC key
   - [ ] Closes on backdrop click
   - [ ] Download button works
   - [ ] Shows HD images

4. **Responsive Design**
   - [ ] Works on mobile (< 640px)
   - [ ] Works on tablet (640-1024px)
   - [ ] Works on desktop (> 1024px)
   - [ ] Touch interactions work

5. **Accessibility**
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces correctly
   - [ ] Focus visible on all interactive elements
   - [ ] Color contrast meets WCAG AA

## 🚧 Future Enhancements

- [ ] Date range picker for custom queries
- [ ] Share functionality (social media)
- [ ] Print/export favorites
- [ ] Dark/light theme toggle
- [ ] Multiple view layouts (grid, list)
- [ ] Image comparison slider
- [ ] Comments/notes on favorites
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with service workers
- [ ] Animation preferences (respect prefers-reduced-motion)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NASA** for providing the amazing APOD API
- **Nielsen Norman Group** for UX best practices
- **Microsoft** for Fluent Design principles
- **Tailwind Labs** for Tailwind CSS
- **Vite Team** for the blazing-fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [NASA API documentation](https://api.nasa.gov/)
2. Review the Issues page
3. Open a new issue with details

## 🌟 Show Your Support

If you found this project helpful, please consider giving it a ⭐️!

---

**Built with 💙 for space enthusiasts everywhere**
