import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useFavorites } from '../../hooks/useFavorites';

/**
 * Header Component
 * Displays app branding, navigation, and view toggle
 * Following Nielsen Norman Group principles:
 * - Clear visual hierarchy
 * - Consistent navigation
 * - User control and freedom
 */
export const Header: React.FC = () => {
  const { viewMode, setViewMode } = useAppContext();
  const { getFavoriteCount } = useFavorites();

  return (
    <header className="sticky top-0 z-50 bg-space-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-nasa-blue to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                NASA <span className="text-gradient">APOD</span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-400">
                Astronomy Picture of the Day
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="flex items-center space-x-2 sm:space-x-4"
            role="navigation"
            aria-label="Main navigation"
          >
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'gallery'
                  ? 'bg-nasa-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label="View gallery"
              aria-current={viewMode === 'gallery' ? 'page' : undefined}
            >
              <span className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="hidden sm:inline">Gallery</span>
              </span>
            </button>

            <button
              onClick={() => setViewMode('favorites')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                viewMode === 'favorites'
                  ? 'bg-nasa-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={`View favorites (${getFavoriteCount()} items)`}
              aria-current={viewMode === 'favorites' ? 'page' : undefined}
            >
              <span className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill={viewMode === 'favorites' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Favorites</span>
              </span>
              {getFavoriteCount() > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-nasa-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  aria-label={`${getFavoriteCount()} favorites`}
                >
                  {getFavoriteCount()}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
