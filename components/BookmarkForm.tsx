'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Category } from '@/lib/types';
import {
  generateId,
  normalizeUrl,
  validateUrl,
  fetchPageMetadata,
  PageMetadata,
} from '@/lib/utils';

interface BookmarkFormProps {
  categories: Category[];
  onSubmit: (bookmark: Bookmark) => void;
  initialData?: Bookmark;
  onCancel?: () => void;
}

export const BookmarkForm = ({
  categories,
  onSubmit,
  initialData,
  onCancel,
}: BookmarkFormProps) => {
  const [url, setUrl] = useState(initialData?.url || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [category, setCategory] = useState(
    initialData?.category || 'uncategorized'
  );
  const [favicon, setFavicon] = useState(initialData?.favicon || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [urlError, setUrlError] = useState('');

  const fetchMetadata = async (urlValue: string) => {
    if (!urlValue.trim()) return;

    const normalized = normalizeUrl(urlValue);
    if (!validateUrl(normalized)) {
      setUrlError('Invalid URL');
      return;
    }

    setUrlError('');
    setIsLoading(true);

    try {
      const metadata = await fetchPageMetadata(normalized);
      if (metadata.title) setTitle(metadata.title);
      if (metadata.description) setDescription(metadata.description);
      if (metadata.favicon) setFavicon(metadata.favicon);
    } catch {
      // Silently fail, user can enter manually
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlBlur = () => {
    if (url.trim() && !title) {
      fetchMetadata(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    const normalized = normalizeUrl(url);
    if (!validateUrl(normalized)) {
      setUrlError('Invalid URL');
      return;
    }

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    setUrlError('');

    const bookmark: Bookmark = {
      id: initialData?.id || generateId(),
      url: normalized,
      title: title.trim(),
      description: description.trim(),
      notes: notes.trim(),
      category: category || 'uncategorized',
      isFavorite: initialData?.isFavorite || false,
      favicon: favicon || undefined,
      viewCount: initialData?.viewCount || 0,
      createdAt: initialData?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    onSubmit(bookmark);
    if (!initialData) {
      setUrl('');
      setTitle('');
      setDescription('');
      setNotes('');
      setFavicon('');
      setCategory('uncategorized');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL *
        </label>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onBlur={handleUrlBlur}
          placeholder="https://example.com"
          disabled={initialData !== undefined}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {urlError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{urlError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Bookmark title"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Bookmark description"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Additional notes"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Fetching...' : initialData ? 'Update' : 'Add'} Bookmark
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
