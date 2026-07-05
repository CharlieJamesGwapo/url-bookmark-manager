export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description: string;
  notes: string;
  category: string;
  isFavorite: boolean;
  favicon?: string;
  viewCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  sortBy: 'recent' | 'title' | 'views';
}
