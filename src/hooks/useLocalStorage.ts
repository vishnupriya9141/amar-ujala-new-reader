import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing localStorage with React state synchronization.
 * Provides type-safe localStorage operations with error handling.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void, () => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Update value function
  const setValue = useCallback((value: T | ((prevValue: T) => T)) => {
    try {
      setStoredValue((prevValue) => {
        const newValue = typeof value === 'function'
          ? (value as (prevValue: T) => T)(prevValue)
          : value;
        return newValue;
      });
    } catch (error) {
      console.error(`Error setting value for localStorage key "${key}":`, error);
    }
  }, [key]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing theme preference in localStorage
 */
export function useThemeStorage() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
        default:
          return 'light';
      }
    });
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}

/**
 * Hook for managing user preferences in localStorage
 */
export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    language: 'hi',
    notifications: true,
    autoPlay: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
  });

  const updatePreference = useCallback(<K extends keyof typeof preferences>(
    key: K,
    value: typeof preferences[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, [setPreferences]);

  return { preferences, updatePreference };
}