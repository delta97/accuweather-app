import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import type { Location } from '../services/weatherApi';
import { searchLocations } from '../services/weatherApi';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const locations = await searchLocations(query);
          setResults(locations);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching locations:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleSelect = (location: Location) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowResults(false);
    onLocationSelect(location);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FontAwesomeIcon
            icon={loading ? faSpinner : faSearch}
            className={`text-gray-400 ${loading ? 'animate-spin' : ''}`}
          />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city or zip code..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl flex items-start gap-3 group"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-500 mt-1 group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="font-semibold text-gray-800">{location.name}</div>
                <div className="text-sm text-gray-500">
                  {location.admin1 && `${location.admin1}, `}
                  {location.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 px-4 py-3 text-gray-500 text-center">
          No locations found
        </div>
      )}
    </div>
  );
}
