# URL Bookmark Manager

A simple, elegant, and powerful bookmark manager for organizing and managing your favorite URLs. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Everything runs locally in your browser with localStorage - no backend required.

## Features

- **Save Bookmarks** - Add URLs with title, description, and personal notes
- **Auto-Fetch Metadata** - Automatically fetch page title, description, and favicon when you add a URL
- **Organize into Categories** - Create custom categories to organize your bookmarks
- **Smart Search** - Search across titles, URLs, descriptions, notes, and categories
- **Favorites** - Mark bookmarks as favorites and view them separately
- **Bulk Operations** - Select multiple bookmarks to move or delete them at once
- **URL Validation** - Automatic URL validation and normalization
- **View Tracking** - Track how many times you've viewed each bookmark
- **Dark Mode** - Full dark mode support with system preference detection
- **Import/Export** - Backup and restore bookmarks as JSON files
- **Category Management** - Create, rename, and delete categories
- **Bookmark Details** - View full bookmark information with edit capabilities
- **Responsive Design** - Works perfectly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks + localStorage
- **Storage**: Browser localStorage (client-side only)
- **Icons**: SVG icons (no external dependencies)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CharlieJamesGwapo/url-bookmark-manager.git
cd url-bookmark-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Bookmark

1. On the home page, fill in the bookmark form:
   - **URL**: Enter the website URL (required)
   - **Title**: The bookmark name (required)
   - **Description**: Optional description from the page
   - **Notes**: Optional personal notes
   - **Category**: Select from existing categories

2. When you enter a URL and move to the next field, the app will:
   - Fetch the page's title, description, and favicon automatically
   - Validate the URL format

3. Click "Add Bookmark" to save

### Managing Bookmarks

- **Search**: Use the search bar to find bookmarks by title, URL, description, notes, or category
- **Filter**: Click category buttons to filter bookmarks by category
- **View Details**: Click on a bookmark title to see full details
- **Edit**: Click the edit icon or use the detail page to modify a bookmark
- **Delete**: Click the delete icon to remove a bookmark
- **Favorite**: Click the star icon to mark/unmark as favorite

### Bulk Operations

1. Select multiple bookmarks using the checkboxes
2. The bulk action bar will appear showing your selections
3. Choose to:
   - Move all selected bookmarks to a category
   - Delete all selected bookmarks

### Managing Categories

1. Go to the "Categories" page
2. Add new categories with custom colors
3. Rename existing categories
4. Delete categories (bookmarks will move to "Uncategorized")

### Backup & Restore

1. Go to "Settings"
2. Click "Import/Export Bookmarks"
3. **Export**: Download your bookmarks as a JSON file
4. **Import**: Upload a previously exported JSON file to restore bookmarks

### Dark Mode

Click the moon/sun icon in the navigation to toggle dark mode. Your preference is automatically saved.

## Data Storage

All data is stored locally in your browser's localStorage:

- **Bookmarks**: Complete bookmark information with metadata
- **Categories**: Custom categories with colors
- **Settings**: Your theme preference and sort options

Your data never leaves your device and is not sent to any server.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page (bookmark list)
│   ├── favorites/         # Favorites page
│   ├── categories/        # Category management page
│   ├── settings/          # Settings & import/export
│   ├── [id]/              # Bookmark detail page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BookmarkForm.tsx       # Add/edit bookmark form
│   ├── BookmarkCard.tsx       # Bookmark display card
│   ├── SearchBar.tsx          # Search functionality
│   ├── CategoryFilter.tsx     # Category filter buttons
│   ├── CategoryManager.tsx    # Category management
│   ├── BulkActions.tsx        # Bulk select actions
│   ├── ImportExportModal.tsx  # Import/export dialog
│   ├── DarkModeToggle.tsx     # Theme toggle
│   └── Navigation.tsx         # Top navigation bar
└── lib/
    ├── types.ts           # TypeScript type definitions
    ├── storage.ts         # localStorage utilities
    ├── hooks.ts           # Custom React hooks
    └── utils.ts           # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The app is highly optimized:
- No external API calls (except for metadata fetching)
- Instant search with client-side filtering
- Lightweight bundle (single-page app)
- Responsive and smooth interactions

## Limitations

- Metadata fetching may be limited by CORS on some websites
- Data is stored locally in localStorage (limited to ~5-10MB depending on browser)
- No cloud sync between devices
- No sharing features

## Future Enhancements

Potential features for future versions:
- Browser extension
- Tags system
- Collections/groups of bookmarks
- Export to different formats (HTML, CSV)
- Bookmark preview images
- Cloud sync (optional)
- Browser shortcuts

## License

MIT License - feel free to use and modify as needed.

## Support

For issues, suggestions, or feedback, please open an issue on the GitHub repository.

---

**Built with ❤️ for organizing URLs the simple way**
