'use client';

import { useState, useEffect } from 'react';
import { CategoryManager } from '@/components/CategoryManager';
import { useCategories } from '@/lib/hooks';

export default function CategoriesPage() {
  const { categories, isLoaded, addCategory, updateCategory, deleteCategory } =
    useCategories();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
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
            Manage Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categories.filter(c => c.id !== 'uncategorized').length} custom{' '}
            {categories.filter(c => c.id !== 'uncategorized').length === 1
              ? 'category'
              : 'categories'}
          </p>
        </div>

        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onUpdateCategory={updateCategory}
          onDeleteCategory={deleteCategory}
        />
      </div>
    </main>
  );
}
