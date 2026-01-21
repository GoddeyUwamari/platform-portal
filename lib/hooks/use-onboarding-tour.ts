'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { dependenciesTour, tourConfig } from '@/lib/tours/dependencies-tour';

export function useOnboardingTour(tourId: string) {
  const [hasSeenTour, setHasSeenTour] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Check if user has seen this tour before
    const seen = localStorage.getItem(`tour-${tourId}-completed`);
    setHasSeenTour(seen === 'true');
  }, [tourId, isClient]);

  const startTour = () => {
    const driverObj = driver({
      ...tourConfig,
      steps: dependenciesTour,
      onDestroyed: () => {
        // Mark tour as completed
        localStorage.setItem(`tour-${tourId}-completed`, 'true');
        setHasSeenTour(true);
      },
    });

    driverObj.drive();
  };

  const resetTour = () => {
    localStorage.removeItem(`tour-${tourId}-completed`);
    setHasSeenTour(false);
  };

  // Auto-start tour for first-time users
  useEffect(() => {
    if (!isClient || hasSeenTour) return;

    // Delay slightly to ensure elements are rendered
    const timer = setTimeout(() => {
      startTour();
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasSeenTour, isClient]);

  return {
    hasSeenTour,
    startTour,
    resetTour,
  };
}
