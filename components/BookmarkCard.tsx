'use client';

import Link from 'next/link';
import { Bookmark, Category } from '@/lib/types';
import { truncateString, formatDate } from '@/lib/utils';

interface BookmarkCardProps {
  bookmark: Bookmark;
  category?: Category;
  onEdit?: (bookmark: Bookmark) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
}

export const BookmarkCard = ({
  bookmark,
  category,
  onEdit,
  onDelete,
  onToggleFavorite,
  isSelected,
  onSelect,
}: BookmarkCardProps) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-700 transition-shadow">
      <div className="flex items-start gap-3">
        {onSelect && (
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={e => onSelect(bookmark.id, e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        )}

        {bookmark.favicon && (
          <img
            src={bookmark.favicon}
            alt=""
            className="w-6 h-6 rounded flex-shrink-0 object-cover"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/${bookmark.id}`}
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {bookmark.title}
            </Link>
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(bookmark.id)}
                className="flex-shrink-0 text-xl hover:scale-110 transition-transform"
                title={
                  bookmark.isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                {bookmark.isFavorite ? '⭐' : '☆'}
              </button>
            )}
          </div>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 truncate block mb-2"
          >
            {truncateString(bookmark.url, 60)}
          </a>

          {bookmark.description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
              {bookmark.description}
            </p>
          )}

          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
            {category && (
              <span
                className="px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            )}
            <span>Views: {bookmark.viewCount}</span>
            <span>{formatDate(bookmark.createdAt)}</span>
          </div>

          {bookmark.notes && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 italic">
              {truncateString(bookmark.notes, 100)}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-shrink-0">
          {onEdit && (
            <button
              onClick={() => onEdit(bookmark)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(bookmark.id)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
