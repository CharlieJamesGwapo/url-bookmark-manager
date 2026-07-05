'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useBookmarks, useCategories } from '@/lib/hooks';
import { BookmarkForm } from '@/components/BookmarkForm';

export default function BookmarkDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookmarkId = params.id as string;

  const { bookmarks, isLoaded, updateBookmark, deleteBookmark } = useBookmarks();
  const { categories, isLoaded: categoriesLoaded } = useCategories();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bookmark = bookmarks.find(b => b.id === bookmarkId);

  useEffect(() => {
    if (mounted && isLoaded && !bookmark) {
      router.push('/');
    }
  }, [mounted, isLoaded, bookmark, router]);

  const handleDelete = () => {
    if (confirm('Delete this bookmark?')) {
      deleteBookmark(bookmarkId);
      router.push('/');
    }
  };

  if (!mounted || !isLoaded || !categoriesLoaded || !bookmark) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      </main>
    );
  }

  const category = categories.find(c => c.id === bookmark.category);

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Bookmarks
        </Link>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {bookmark.favicon && (
                    <img
                      src={bookmark.favicon}
                      alt=""
                      className="w-12 h-12 rounded flex-shrink-0 object-cover"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {bookmark.title}
                    </h1>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {bookmark.url}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() =>
                    updateBookmark(bookmark.id, {
                      isFavorite: !bookmark.isFavorite,
                    })
                  }
                  className="text-4xl hover:scale-110 transition-transform flex-shrink-0"
                  title={
                    bookmark.isFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  {bookmark.isFavorite ? '⭐' : '☆'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                  {category && (
                    <span
                      className="px-3 py-1 rounded-full text-white text-sm font-medium inline-block"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Views</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {bookmark.viewCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Updated</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(bookmark.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {bookmark.description && (
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                    Description
                  </p>
                  <p className="text-gray-900 dark:text-white">{bookmark.description}</p>
                </div>
              )}

              {bookmark.notes && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                    Notes
                  </p>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {bookmark.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit Bookmark
            </h2>
            <BookmarkForm
              categories={categories}
              initialData={bookmark}
              onSubmit={updatedBookmark => {
                updateBookmark(bookmark.id, updatedBookmark);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
