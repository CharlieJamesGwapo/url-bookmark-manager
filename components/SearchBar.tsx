'use client';

import { useState, useMemo } from 'react';
import { Bookmark } from '@/lib/types';

interface SearchBarProps {
  bookmarks: Bookmark[];
  onResultsChange: (results: Bookmark[]) => void;
}

export const SearchBar = ({ bookmarks, onResultsChange }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useMemo(() => {
    if (!query.trim()) {
      onResultsChange(bookmarks);
      return;
    }

    const q = query.toLowerCase();
    const results = bookmarks.filter(
      bookmark =>
        bookmark.title.toLowerCase().includes(q) ||
        bookmark.url.toLowerCase().includes(q) ||
        bookmark.description.toLowerCase().includes(q) ||
        bookmark.notes.toLowerCase().includes(q) ||
        bookmark.category.toLowerCase().includes(q)
    );
    onResultsChange(results);
  }, [query, bookmarks, onResultsChange]);

  return (
    <div className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search bookmarks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
