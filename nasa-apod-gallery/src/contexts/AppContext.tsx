import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { APODData } from '../types/apod';

interface AppContextType {
  selectedAPOD: APODData | null;
  setSelectedAPOD: (apod: APODData | null) => void;
  isModalOpen: boolean;
  openModal: (apod: APODData) => void;
  closeModal: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: 'gallery' | 'favorites';
  setViewMode: (mode: 'gallery' | 'favorites') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Global application context provider
 * Manages modal state, search, and view mode
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedAPOD, setSelectedAPOD] = useState<APODData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'gallery' | 'favorites'>('gallery');

  const openModal = (apod: APODData) => {
    setSelectedAPOD(apod);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAPOD(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const value: AppContextType = {
    selectedAPOD,
    setSelectedAPOD,
    isModalOpen,
    openModal,
    closeModal,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use the app context
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
