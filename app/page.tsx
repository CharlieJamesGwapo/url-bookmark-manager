'use client';

import { useState, useMemo, useEffect } from 'react';
import { BookmarkForm } from '@/components/BookmarkForm';
import { BookmarkCard } from '@/components/BookmarkCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { BulkActions } from '@/components/BulkActions';
import { useBookmarks, useCategories } from '@/lib/hooks';
import { Bookmark } from '@/lib/types';

export default function Home() {
  const { bookmarks, isLoaded, addBookmark, updateBookmark, deleteBookmark, deleteBookmarks } =
    useBookmarks();
  const { categories, isLoaded: categoriesLoaded } = useCategories();

  const [searchResults, setSearchResults] = useState<Bookmark[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBookmarks = useMemo(() => {
    let result = searchResults;
    if (selectedCategory) {
      result = result.filter(b => b.category === selectedCategory);
    }
    return result.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [searchResults, selectedCategory]);

  const handleSelectBookmark = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedBookmarks);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedBookmarks(newSelected);
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedBookmarks.size} bookmarks?`)) {
      deleteBookmarks(Array.from(selectedBookmarks));
      setSelectedBookmarks(new Set());
    }
  };

  const handleBulkMoveToCategory = (categoryId: string) => {
    selectedBookmarks.forEach(id => {
      updateBookmark(id, { category: categoryId });
    });
    setSelectedBookmarks(new Set());
  };

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
            My Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
          </p>
        </div>

        <BookmarkForm
          categories={categories}
          onSubmit={addBookmark}
        />

        <SearchBar bookmarks={bookmarks} onResultsChange={setSearchResults} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {selectedBookmarks.size > 0 && (
          <BulkActions
            selectedCount={selectedBookmarks.size}
            categories={categories}
            onDelete={handleBulkDelete}
            onMoveToCategory={handleBulkMoveToCategory}
            onCancel={() => setSelectedBookmarks(new Set())}
          />
        )}

        <div className="space-y-3">
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              {bookmarks.length === 0
                ? 'No bookmarks yet. Add one to get started!'
                : 'No bookmarks match your search or filter.'}
            </div>
          ) : (
            filteredBookmarks.map(bookmark => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                category={categories.find(c => c.id === bookmark.category)}
                onEdit={b => setEditingId(b.id)}
                onDelete={deleteBookmark}
                onToggleFavorite={id =>
                  updateBookmark(id, {
                    isFavorite: !bookmarks.find(b => b.id === id)?.isFavorite,
                  })
                }
                isSelected={selectedBookmarks.has(bookmark.id)}
                onSelect={handleSelectBookmark}
              />
            ))
          )}
        </div>
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit Bookmark
            </h2>
            <BookmarkForm
              categories={categories}
              initialData={bookmarks.find(b => b.id === editingId)}
              onSubmit={bookmark => {
                updateBookmark(editingId, bookmark);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
