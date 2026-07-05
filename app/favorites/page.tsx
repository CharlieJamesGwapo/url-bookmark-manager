'use client';

import { useState, useEffect } from 'react';
import { BookmarkCard } from '@/components/BookmarkCard';
import { useBookmarks, useCategories } from '@/lib/hooks';

export default function FavoritesPage() {
  const { bookmarks, isLoaded, updateBookmark, deleteBookmark } = useBookmarks();
  const { categories, isLoaded: categoriesLoaded } = useCategories();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorites = bookmarks.filter(b => b.isFavorite);

  if (!mounted || !isLoaded || !categoriesLoaded) {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ⭐ Favorite Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
          </p>
        </div>

        <div className="space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              No favorite bookmarks yet. Star some bookmarks to see them here!
            </div>
          ) : (
            favorites
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map(bookmark => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  category={categories.find(c => c.id === bookmark.category)}
                  onDelete={deleteBookmark}
                  onToggleFavorite={id =>
                    updateBookmark(id, {
                      isFavorite: !bookmarks.find(b => b.id === id)?.isFavorite,
                    })
                  }
                />
              ))
          )}
        </div>
      </div>
    </main>
  );
}
