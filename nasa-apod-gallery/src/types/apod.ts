/**
 * NASA APOD API Response Types
 * Documentation: https://api.nasa.gov/
 */

export interface APODData {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
}

export interface APODError {
  code: number;
  msg: string;
  service_version: string;
}

export interface APODFilters {
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  mediaType?: 'image' | 'video' | 'all';
}

export interface FavoriteAPOD {
  data: APODData;
  favoritedAt: string;
}
