import type { APODData } from '../types/apod';

/**
 * NASA API Service
 * Handles all interactions with NASA's Astronomy Picture of the Day API
 */

const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Use environment variable for API key, fallback to DEMO_KEY for development
const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

/**
 * Format date to YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  return formatDate(new Date());
};

/**
 * Fetch today's APOD
 */
export const fetchTodayAPOD = async (): Promise<APODData> => {
  try {
    const response = await fetch(`${NASA_API_BASE_URL}?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: APODData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching today\'s APOD:', error);
    throw error;
  }
};

/**
 * Fetch APOD for a specific date
 */
export const fetchAPODByDate = async (date: string): Promise<APODData> => {
  try {
    const response = await fetch(
      `${NASA_API_BASE_URL}?api_key=${API_KEY}&date=${date}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: APODData = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching APOD for date ${date}:`, error);
    throw error;
  }
};

/**
 * Fetch APODs for a date range
 * Note: Maximum 7-day range to respect API limits
 */
export const fetchAPODRange = async (
  startDate: string,
  endDate: string
): Promise<APODData[]> => {
  try {
    const response = await fetch(
      `${NASA_API_BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: APODData[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching APOD range ${startDate} to ${endDate}:`, error);
    throw error;
  }
};

/**
 * Fetch random APODs
 */
export const fetchRandomAPODs = async (count: number = 10): Promise<APODData[]> => {
  try {
    const response = await fetch(
      `${NASA_API_BASE_URL}?api_key=${API_KEY}&count=${Math.min(count, 100)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: APODData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random APODs:', error);
    throw error;
  }
};

/**
 * Fetch APODs for the last N days
 */
export const fetchRecentAPODs = async (days: number = 30): Promise<APODData[]> => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const results: APODData[] = [];

    // NASA API allows max 7 days per request, so we need to batch
    const maxDaysPerRequest = 7;
    let currentStart = new Date(startDate);

    while (currentStart < endDate) {
      const currentEnd = new Date(currentStart);
      currentEnd.setDate(currentEnd.getDate() + maxDaysPerRequest - 1);

      if (currentEnd > endDate) {
        currentEnd.setTime(endDate.getTime());
      }

      const batch = await fetchAPODRange(
        formatDate(currentStart),
        formatDate(currentEnd)
      );

      results.push(...batch);

      currentStart.setDate(currentStart.getDate() + maxDaysPerRequest);
    }

    return results.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error(`Error fetching recent APODs for ${days} days:`, error);
    throw error;
  }
};

/**
 * Validate if a date is within valid range (after 1995-06-16, not in future)
 */
export const isValidAPODDate = (date: string): boolean => {
  const inputDate = new Date(date);
  const minDate = new Date('1995-06-16'); // APOD started on this date
  const maxDate = new Date();

  return inputDate >= minDate && inputDate <= maxDate;
};
