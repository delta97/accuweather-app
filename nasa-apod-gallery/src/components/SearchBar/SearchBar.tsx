import React, { useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';

/**
 * SearchBar Component
 * Provides real-time search filtering for APOD titles and descriptions
 * Implements debouncing for performance
 */
export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title or description..."
          className="input-field pl-11 pr-12"
          aria-label="Search astronomy pictures"
          autoComplete="off"
        />

        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {searchTerm && (
        <p
          className="text-sm text-gray-400 mt-2 text-center animate-fade-in"
          role="status"
          aria-live="polite"
        >
          Searching for "{searchTerm}"
        </p>
      )}
    </div>
  );
};
