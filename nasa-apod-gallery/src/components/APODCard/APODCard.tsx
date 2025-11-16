import React, { useState } from 'react';
import type { APODData } from '../../types/apod';
import { useAppContext } from '../../contexts/AppContext';
import { useFavorites } from '../../hooks/useFavorites';

interface APODCardProps {
  apod: APODData;
}

/**
 * APODCard Component
 * Displays an individual APOD with image, title, date, and favorite toggle
 * Implements:
 * - Progressive image loading
 * - Hover effects
 * - Favorite functionality
 * - Accessibility features
 */
export const APODCard: React.FC<APODCardProps> = ({ apod }) => {
  const { openModal } = useAppContext();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    openModal(apod);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(apod);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article
      className="masonry-item card cursor-pointer group animate-fade-in"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${apod.title}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-space-dark aspect-video sm:aspect-auto">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-nasa-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
            <svg
              className="w-16 h-16 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Video content</p>
          </div>
        ) : (
          <>
            <img
              src={apod.url}
              alt={apod.title}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 z-10"
          aria-label={
            isFavorite(apod.date) ? 'Remove from favorites' : 'Add to favorites'
          }
          aria-pressed={isFavorite(apod.date)}
        >
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
              isFavorite(apod.date)
                ? 'text-nasa-red fill-current scale-110'
                : 'text-white fill-none'
            }`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Media Type Badge */}
        {apod.media_type === 'video' && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-nasa-blue/90 rounded text-xs font-semibold flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>VIDEO</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <time
          className="text-xs sm:text-sm text-gray-400 font-medium"
          dateTime={apod.date}
        >
          {formatDate(apod.date)}
        </time>
        <h2 className="mt-2 text-lg sm:text-xl font-bold text-white line-clamp-2 group-hover:text-nasa-blue transition-colors">
          {apod.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400 line-clamp-3">
          {apod.explanation}
        </p>

        {apod.copyright && (
          <p className="mt-3 text-xs text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            © {apod.copyright}
          </p>
        )}
      </div>
    </article>
  );
};
