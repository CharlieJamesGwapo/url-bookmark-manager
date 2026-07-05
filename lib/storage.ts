import { Bookmark, Category, Settings } from './types';

const BOOKMARKS_KEY = 'bookmarks';
const CATEGORIES_KEY = 'categories';
const SETTINGS_KEY = 'settings';

export const storageUtils = {
  // Bookmarks
  getBookmarks: (): Bookmark[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveBookmarks: (bookmarks: Bookmark[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  },

  addBookmark: (bookmark: Bookmark): void => {
    const bookmarks = storageUtils.getBookmarks();
    bookmarks.push(bookmark);
    storageUtils.saveBookmarks(bookmarks);
  },

  updateBookmark: (id: string, updates: Partial<Bookmark>): void => {
    const bookmarks = storageUtils.getBookmarks();
    const index = bookmarks.findIndex(b => b.id === id);
    if (index !== -1) {
      bookmarks[index] = { ...bookmarks[index], ...updates, updatedAt: Date.now() };
      storageUtils.saveBookmarks(bookmarks);
    }
  },

  deleteBookmark: (id: string): void => {
    const bookmarks = storageUtils.getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== id);
    storageUtils.saveBookmarks(filtered);
  },

  deleteBookmarks: (ids: string[]): void => {
    const bookmarks = storageUtils.getBookmarks();
    const filtered = bookmarks.filter(b => !ids.includes(b.id));
    storageUtils.saveBookmarks(filtered);
  },

  // Categories
  getCategories: (): Category[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (!stored) {
      const defaultCategories = [
        { id: 'uncategorized', name: 'Uncategorized', color: '#6B7280', createdAt: Date.now() },
      ];
      storageUtils.saveCategories(defaultCategories);
      return defaultCategories;
    }
    return JSON.parse(stored);
  },

  saveCategories: (categories: Category[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  addCategory: (category: Category): void => {
    const categories = storageUtils.getCategories();
    categories.push(category);
    storageUtils.saveCategories(categories);
  },

  updateCategory: (id: string, updates: Partial<Category>): void => {
    const categories = storageUtils.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      storageUtils.saveCategories(categories);
    }
  },

  deleteCategory: (id: string): void => {
    if (id === 'uncategorized') return; // Can't delete uncategorized
    const categories = storageUtils.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    storageUtils.saveCategories(filtered);

    // Move bookmarks to uncategorized
    const bookmarks = storageUtils.getBookmarks();
    bookmarks.forEach(b => {
      if (b.category === id) {
        b.category = 'uncategorized';
      }
    });
    storageUtils.saveBookmarks(bookmarks);
  },

  // Settings
  getSettings: (): Settings => {
    if (typeof window === 'undefined') return { theme: 'system', sortBy: 'recent' };
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : { theme: 'system', sortBy: 'recent' };
  },

  saveSettings: (settings: Settings): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // Import/Export
  exportData: () => {
    const bookmarks = storageUtils.getBookmarks();
    const categories = storageUtils.getCategories();
    const settings = storageUtils.getSettings();
    return {
      version: '1.0',
      exportDate: new Date().toISOString(),
      bookmarks,
      categories,
      settings,
    };
  },

  importData: (data: any) => {
    if (!data.bookmarks || !Array.isArray(data.bookmarks)) {
      throw new Error('Invalid import data: missing bookmarks array');
    }
    storageUtils.saveBookmarks(data.bookmarks);
    if (data.categories && Array.isArray(data.categories)) {
      storageUtils.saveCategories(data.categories);
    }
    if (data.settings) {
      storageUtils.saveSettings(data.settings);
    }
  },
};
