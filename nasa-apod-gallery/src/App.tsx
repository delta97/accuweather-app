import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { Gallery } from './components/Gallery';
import { FavoritesList } from './components/FavoritesList';
import { APODModal } from './components/APODModal';

/**
 * Main App Content Component
 * Handles view switching between gallery and favorites
 */
const AppContent: React.FC = () => {
  const { viewMode } = useAppContext();

  return (
    <div className="min-h-screen bg-space-darker">
      <Header />

      <main role="main" className="pt-6">
        <SearchBar />

        {viewMode === 'gallery' ? <Gallery /> : <FavoritesList />}
      </main>

      <APODModal />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12 bg-space-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2">
            <p className="text-gray-400">
              Powered by{' '}
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nasa-blue hover:text-nasa-blue/80 transition-colors underline"
              >
                NASA Open APIs
              </a>
            </p>
            <p className="text-sm text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * Main App Component
 * Wraps the app with necessary providers
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
