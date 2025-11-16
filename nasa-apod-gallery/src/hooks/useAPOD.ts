import { useState, useEffect, useCallback } from 'react';
import type { APODData } from '../types/apod';
import { fetchRecentAPODs, fetchRandomAPODs } from '../services/nasaApi';

interface UseAPODResult {
  apods: APODData[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  hasMore: boolean;
}

/**
 * Custom hook for fetching and managing APOD data
 */
export const useAPOD = (initialDays: number = 30): UseAPODResult => {
  const [apods, setApods] = useState<APODData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDays, setCurrentDays] = useState(initialDays);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fetch initial APODs
   */
  const fetchAPODs = useCallback(async (days: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchRecentAPODs(days);
      setApods(data);

      // APOD started on 1995-06-16, so we can calculate max available
      const apodStartDate = new Date('1995-06-16');
      const today = new Date();
      const maxDays = Math.floor(
        (today.getTime() - apodStartDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      setHasMore(days < maxDays);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch APODs';
      setError(errorMessage);
      console.error('Error fetching APODs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Load more APODs (increase the date range)
   */
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    const newDays = currentDays + 30;
    setCurrentDays(newDays);
    await fetchAPODs(newDays);
  }, [currentDays, hasMore, isLoading, fetchAPODs]);

  /**
   * Refresh APODs (reload current range)
   */
  const refresh = useCallback(async () => {
    await fetchAPODs(currentDays);
  }, [currentDays, fetchAPODs]);

  // Initial load
  useEffect(() => {
    fetchAPODs(initialDays);
  }, [initialDays, fetchAPODs]);

  return {
    apods,
    isLoading,
    error,
    loadMore,
    refresh,
    hasMore,
  };
};

/**
 * Hook for fetching random APODs
 */
export const useRandomAPOD = (count: number = 10) => {
  const [apods, setApods] = useState<APODData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchRandomAPODs(count);
      setApods(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch random APODs';
      setError(errorMessage);
      console.error('Error fetching random APODs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return {
    apods,
    isLoading,
    error,
    refresh: fetchRandom,
  };
};
