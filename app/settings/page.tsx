'use client';

import { useState, useEffect } from 'react';
import { ImportExportModal } from '@/components/ImportExportModal';
import { useBookmarks, useCategories, useSettings } from '@/lib/hooks';
import { storageUtils } from '@/lib/storage';

export default function SettingsPage() {
  const { isLoaded: bookmarksLoaded, addBookmark } = useBookmarks();
  const { isLoaded: categoriesLoaded, addCategory } = useCategories();
  const { settings, isLoaded: settingsLoaded, updateSettings } = useSettings();
  const [mounted, setMounted] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImport = (data: any) => {
    try {
      storageUtils.importData(data);
      // Reload page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  if (!mounted || !bookmarksLoaded || !categoriesLoaded || !settingsLoaded) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your preferences and backup your bookmarks
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={e =>
                    updateSettings({
                      theme: e.target.value as 'light' | 'dark' | 'system',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={settings.sortBy}
                  onChange={e =>
                    updateSettings({
                      sortBy: e.target.value as 'recent' | 'title' | 'views',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">Recently Updated</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Data Management
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Export your bookmarks to back them up or import from a previous export.
            </p>
            <button
              onClick={() => setShowImportExport(true)}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Import/Export Bookmarks
            </button>
          </div>
        </div>
      </div>

      {showImportExport && (
        <ImportExportModal
          onImport={handleImport}
          onClose={() => setShowImportExport(false)}
        />
      )}
    </main>
  );
}
