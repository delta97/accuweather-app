import { useState, useEffect } from 'react';
import type { APODData, FavoriteAPOD } from '../types/apod';

const FAVORITES_STORAGE_KEY = 'nasa_apod_favorites';

/**
 * Custom hook for managing favorite APODs with localStorage persistence
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteAPOD[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteAPOD[];
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites, isLoading]);

  /**
   * Add an APOD to favorites
   */
  const addFavorite = (apod: APODData) => {
    setFavorites((prev) => {
      // Check if already favorited
      if (prev.some((fav) => fav.data.date === apod.date)) {
        return prev;
      }

      const newFavorite: FavoriteAPOD = {
        data: apod,
        favoritedAt: new Date().toISOString(),
      };

      return [newFavorite, ...prev];
    });
  };

  /**
   * Remove an APOD from favorites
   */
  const removeFavorite = (date: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.data.date !== date));
  };

  /**
   * Toggle favorite status
   */
  const toggleFavorite = (apod: APODData) => {
    if (isFavorite(apod.date)) {
      removeFavorite(apod.date);
    } else {
      addFavorite(apod);
    }
  };

  /**
   * Check if an APOD is favorited
   */
  const isFavorite = (date: string): boolean => {
    return favorites.some((fav) => fav.data.date === date);
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  };

  /**
   * Get favorite count
   */
  const getFavoriteCount = (): number => {
    return favorites.length;
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteCount,
  };
};
