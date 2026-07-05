'use client';

import { Category } from '@/lib/types';

interface BulkActionsProps {
  selectedCount: number;
  categories: Category[];
  onDelete: () => void;
  onMoveToCategory: (categoryId: string) => void;
  onCancel: () => void;
}

export const BulkActions = ({
  selectedCount,
  categories,
  onDelete,
  onMoveToCategory,
  onCancel,
}: BulkActionsProps) => {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
        {selectedCount} selected
      </span>
      <div className="flex gap-2 flex-wrap">
        <select
          onChange={e => {
            if (e.target.value) {
              onMoveToCategory(e.target.value);
              e.target.value = '';
            }
          }}
          className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Move to category...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
