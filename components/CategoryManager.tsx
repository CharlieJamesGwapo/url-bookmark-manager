'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { generateId, getColorVariant } from '@/lib/utils';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoryManager = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagerProps) => {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      setError('Category name is required');
      return;
    }

    if (
      categories.some(
        c => c.name.toLowerCase() === newName.toLowerCase() && c.id !== 'uncategorized'
      )
    ) {
      setError('Category already exists');
      return;
    }

    const newCategory: Category = {
      id: generateId(),
      name: newName.trim(),
      color: getColorVariant(categories.length),
      createdAt: Date.now(),
    };

    onAddCategory(newCategory);
    setNewName('');
    setError('');
  };

  const handleUpdateCategory = (id: string) => {
    if (!editName.trim()) {
      setError('Category name is required');
      return;
    }

    if (
      categories.some(
        c => c.name.toLowerCase() === editName.toLowerCase() && c.id !== id
      )
    ) {
      setError('Category already exists');
      return;
    }

    onUpdateCategory(id, { name: editName.trim() });
    setEditingId(null);
    setEditName('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Category
        </h3>
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Category name"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add
          </button>
        </form>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div
              key={category.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {editingId === category.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {category.name}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {editingId === category.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateCategory(category.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditName('');
                        setError('');
                      }}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {category.id !== 'uncategorized' && (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(category.id);
                            setEditName(category.name);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => onDeleteCategory(category.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
