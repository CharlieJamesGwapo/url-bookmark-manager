'use client';

import { useEffect, useState, useCallback } from 'react';
import { Bookmark, Category, Settings } from './types';
import { storageUtils } from './storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setBookmarks(storageUtils.getBookmarks());
    setIsLoaded(true);
  }, []);

  const addBookmark = useCallback((bookmark: Bookmark) => {
    storageUtils.addBookmark(bookmark);
    setBookmarks(storageUtils.getBookmarks());
  }, []);

  const updateBookmark = useCallback((id: string, updates: Partial<Bookmark>) => {
    storageUtils.updateBookmark(id, updates);
    setBookmarks(storageUtils.getBookmarks());
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    storageUtils.deleteBookmark(id);
    setBookmarks(storageUtils.getBookmarks());
  }, []);

  const deleteBookmarks = useCallback((ids: string[]) => {
    storageUtils.deleteBookmarks(ids);
    setBookmarks(storageUtils.getBookmarks());
  }, []);

  return {
    bookmarks,
    isLoaded,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    deleteBookmarks,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCategories(storageUtils.getCategories());
    setIsLoaded(true);
  }, []);

  const addCategory = useCallback((category: Category) => {
    storageUtils.addCategory(category);
    setCategories(storageUtils.getCategories());
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    storageUtils.updateCategory(id, updates);
    setCategories(storageUtils.getCategories());
  }, []);

  const deleteCategory = useCallback((id: string) => {
    storageUtils.deleteCategory(id);
    setCategories(storageUtils.getCategories());
  }, []);

  return {
    categories,
    isLoaded,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    sortBy: 'recent',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(storageUtils.getSettings());
    setIsLoaded(true);
  }, []);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates };
    storageUtils.saveSettings(newSettings);
    setSettings(newSettings);
  }, [settings]);

  return {
    settings,
    isLoaded,
    updateSettings,
  };
};

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const theme = settings.theme;
    const isDarkMode =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    setIsLoaded(true);
  }, [settings]);

  useEffect(() => {
    if (!isLoaded) return;
    const element = document.documentElement;
    if (isDark) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, [isDark, isLoaded]);

  const toggleDarkMode = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    updateSettings({ theme: newTheme as any });
  }, [isDark, updateSettings]);

  return {
    isDark,
    isLoaded,
    toggleDarkMode,
    theme: settings.theme,
  };
};
