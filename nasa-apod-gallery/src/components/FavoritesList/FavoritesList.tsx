import React, { useMemo } from 'react';
import { APODCard } from '../APODCard/APODCard';
import { useFavorites } from '../../hooks/useFavorites';
import { useAppContext } from '../../contexts/AppContext';

/**
 * FavoritesList Component
 * Displays user's favorite APODs with search filtering
 * Features:
 * - Search filtering
 * - Clear all favorites
 * - Empty state
 * - Loading state
 */
export const FavoritesList: React.FC = () => {
  const { favorites, isLoading, clearFavorites } = useFavorites();
  const { searchTerm } = useAppContext();

  // Filter favorites based on search term
  const filteredFavorites = useMemo(() => {
    if (!searchTerm) return favorites;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return favorites.filter(
      (fav) =>
        fav.data.title.toLowerCase().includes(lowerSearchTerm) ||
        fav.data.explanation.toLowerCase().includes(lowerSearchTerm)
    );
  }, [favorites, searchTerm]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 border-4 border-nasa-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-lg">Loading favorites...</p>
      </div>
    );
  }

  // Empty state
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 px-4">
        <svg
          className="w-24 h-24 text-gray-600"
          fill="none"
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
        <h2 className="text-2xl font-bold text-white">No favorites yet</h2>
        <p className="text-gray-400 text-center max-w-md">
          Start exploring the gallery and click the heart icon on pictures you love
          to save them here!
        </p>
      </div>
    );
  }

  // No search results
  if (filteredFavorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 px-4">
        <svg
          className="w-20 h-20 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 className="text-xl font-bold text-white">No results found</h2>
        <p className="text-gray-400 text-center max-w-md">
          No favorites match "{searchTerm}". Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12">
      {/* Header with count and clear button */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-gray-400">
            {filteredFavorites.length === favorites.length ? (
              <>
                <span className="text-white font-semibold text-xl">
                  {favorites.length}
                </span>{' '}
                {favorites.length === 1 ? 'favorite' : 'favorites'}
              </>
            ) : (
              <>
                Showing{' '}
                <span className="text-white font-semibold">
                  {filteredFavorites.length}
                </span>{' '}
                of{' '}
                <span className="text-white font-semibold">{favorites.length}</span>{' '}
                favorites matching "
                <span className="text-nasa-blue">{searchTerm}</span>"
              </>
            )}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="btn-secondary flex items-center space-x-2 self-start sm:self-auto"
            aria-label="Clear all favorites"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid max-w-7xl mx-auto">
        {filteredFavorites.map((favorite) => (
          <APODCard key={favorite.data.date} apod={favorite.data} />
        ))}
      </div>
    </div>
  );
};
