import React, { useMemo } from 'react';
import { APODCard } from '../APODCard/APODCard';
import { useAPOD } from '../../hooks/useAPOD';
import { useAppContext } from '../../contexts/AppContext';

/**
 * Gallery Component
 * Displays APOD cards in a responsive masonry grid layout
 * Features:
 * - Real-time search filtering
 * - Infinite scroll/load more
 * - Loading states
 * - Error handling
 * - Responsive design
 */
export const Gallery: React.FC = () => {
  const { apods, isLoading, error, loadMore, hasMore } = useAPOD(30);
  const { searchTerm } = useAppContext();

  // Filter APODs based on search term
  const filteredApods = useMemo(() => {
    if (!searchTerm) return apods;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return apods.filter(
      (apod) =>
        apod.title.toLowerCase().includes(lowerSearchTerm) ||
        apod.explanation.toLowerCase().includes(lowerSearchTerm)
    );
  }, [apods, searchTerm]);

  // Loading state
  if (isLoading && apods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 border-4 border-nasa-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-lg">Loading cosmic wonders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 px-4">
        <svg
          className="w-20 h-20 text-nasa-red"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-xl font-bold text-white">Oops! Something went wrong</h2>
        <p className="text-gray-400 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No results state
  if (filteredApods.length === 0) {
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
          {searchTerm
            ? `No astronomy pictures match "${searchTerm}". Try a different search term.`
            : 'No astronomy pictures available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12">
      {/* Results count */}
      <div className="mb-6 text-center">
        <p className="text-gray-400">
          Showing{' '}
          <span className="text-white font-semibold">{filteredApods.length}</span>{' '}
          {filteredApods.length === 1 ? 'picture' : 'pictures'}
          {searchTerm && (
            <>
              {' '}
              matching "<span className="text-nasa-blue">{searchTerm}</span>"
            </>
          )}
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid max-w-7xl mx-auto">
        {filteredApods.map((apod) => (
          <APODCard key={apod.date} apod={apod} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !searchTerm && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            aria-label="Load more astronomy pictures"
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>Load More</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      )}

      {/* End of results message */}
      {!hasMore && apods.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            🎉 You've reached the beginning of NASA's APOD archive!
          </p>
        </div>
      )}
    </div>
  );
};
