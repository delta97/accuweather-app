import React, { useEffect, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useFavorites } from '../../hooks/useFavorites';

/**
 * APODModal Component
 * Full-screen modal for viewing APOD details
 * Implements:
 * - Keyboard navigation (ESC to close)
 * - Focus trap
 * - Backdrop click to close
 * - High-resolution image display
 * - ARIA accessibility attributes
 */
export const APODModal: React.FC = () => {
  const { selectedAPOD, isModalOpen, closeModal } = useAppContext();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Close modal on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, handleKeyDown]);

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isModalOpen || !selectedAPOD) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownload = () => {
    if (selectedAPOD.hdurl || selectedAPOD.url) {
      window.open(selectedAPOD.hdurl || selectedAPOD.url, '_blank');
    }
  };

  const handleFavoriteClick = () => {
    toggleFavorite(selectedAPOD);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 z-10 group"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:rotate-90 transition-transform duration-300"
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

        {/* Modal Content */}
        <div className="max-w-7xl mx-auto animate-scale-in">
          {/* Image/Video */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl mb-6">
            {selectedAPOD.media_type === 'image' ? (
              <img
                src={selectedAPOD.hdurl || selectedAPOD.url}
                alt={selectedAPOD.title}
                className="w-full h-auto max-h-[70vh] object-contain bg-space-dark"
              />
            ) : (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={selectedAPOD.url}
                  title={selectedAPOD.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="glass-effect rounded-lg p-6 sm:p-8 space-y-4">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <time
                  className="text-sm text-gray-400 font-medium"
                  dateTime={selectedAPOD.date}
                >
                  {formatDate(selectedAPOD.date)}
                </time>
                <h1
                  id="modal-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2"
                >
                  {selectedAPOD.title}
                </h1>
                {selectedAPOD.copyright && (
                  <p className="text-sm text-gray-400 mt-2 flex items-center">
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
                    </svg>
                    © {selectedAPOD.copyright}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleFavoriteClick}
                  className={`btn-secondary flex items-center space-x-2 ${
                    isFavorite(selectedAPOD.date) ? 'bg-nasa-red hover:bg-nasa-red/90' : ''
                  }`}
                  aria-label={
                    isFavorite(selectedAPOD.date)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                  aria-pressed={isFavorite(selectedAPOD.date)}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isFavorite(selectedAPOD.date) ? 'currentColor' : 'none'}
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
                  <span className="hidden sm:inline">
                    {isFavorite(selectedAPOD.date) ? 'Favorited' : 'Favorite'}
                  </span>
                </button>

                {selectedAPOD.media_type === 'image' && (
                  <button
                    onClick={handleDownload}
                    className="btn-primary flex items-center space-x-2"
                    aria-label="Download high-resolution image"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="hidden sm:inline">Download HD</span>
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-white/10">
              <h2 className="text-lg font-semibold text-white mb-3">
                Explanation
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedAPOD.explanation}
              </p>
            </div>

            {/* Media Type Badge */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <span className="text-sm text-gray-400">Media Type:</span>
              <span className="px-3 py-1 bg-nasa-blue/20 text-nasa-blue rounded-full text-sm font-medium uppercase">
                {selectedAPOD.media_type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
