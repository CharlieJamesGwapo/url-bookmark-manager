# Manual Testing Guide

## Prerequisites
- Run `npm run dev` to start the development server
- Open http://localhost:3000 in a browser

## Test Cases

### 1. Add a Bookmark
- [ ] Click "Add Bookmark" section
- [ ] Enter URL: `https://github.com`
- [ ] Press Tab/blur to fetch metadata
- [ ] Verify title auto-populated with "GitHub"
- [ ] Verify favicon appears
- [ ] Enter notes: "My favorite code repository"
- [ ] Click "Add Bookmark"
- [ ] Verify bookmark appears in the list

### 2. Search Bookmarks
- [ ] Add multiple bookmarks (at least 3)
- [ ] Type in search box: "github"
- [ ] Verify only GitHub bookmark is shown
- [ ] Clear search - all bookmarks return

### 3. Filter by Category
- [ ] Create a new category: "Development"
- [ ] Add a bookmark and assign to "Development"
- [ ] Click "Development" filter button
- [ ] Verify only that bookmark is shown
- [ ] Click "All" - all bookmarks return

### 4. Favorite Bookmarks
- [ ] Click star icon on a bookmark
- [ ] Verify star becomes filled
- [ ] Navigate to "⭐ Favorites"
- [ ] Verify only starred bookmarks appear
- [ ] Click star again to remove from favorites

### 5. Bulk Operations
- [ ] Select multiple bookmarks with checkboxes
- [ ] Verify bulk action bar appears
- [ ] Move selected to a category
- [ ] Verify all selected bookmarks moved
- [ ] Select again and delete
- [ ] Confirm deletion dialog

### 6. Edit Bookmark
- [ ] Click edit icon on a bookmark
- [ ] Modify title, description, notes
- [ ] Click "Update Bookmark"
- [ ] Verify changes saved

### 7. View Bookmark Details
- [ ] Click on bookmark title
- [ ] Verify detail page shows all information
- [ ] Test edit from detail page
- [ ] Test delete from detail page

### 8. Category Management
- [ ] Go to Categories page
- [ ] Create new category
- [ ] Rename category
- [ ] Delete category (verify bookmarks move to Uncategorized)

### 9. Dark Mode
- [ ] Click theme toggle (moon/sun icon)
- [ ] Verify page switches to dark mode
- [ ] Refresh page - dark mode persists
- [ ] Switch back to light mode

### 10. Import/Export
- [ ] Go to Settings
- [ ] Click "Import/Export Bookmarks"
- [ ] Click "Export Bookmarks"
- [ ] Verify JSON file downloads
- [ ] Open JSON file - verify valid JSON with all bookmarks
- [ ] Delete all bookmarks
- [ ] Click "Import Bookmarks"
- [ ] Select downloaded JSON file
- [ ] Verify all bookmarks restored

### 11. URL Validation
- [ ] Try adding invalid URL (e.g., "invalid")
- [ ] Verify error message appears
- [ ] Try adding URL without protocol (e.g., "example.com")
- [ ] Verify it's normalized to "https://example.com"

### 12. View Count
- [ ] Click on a bookmark (detail view)
- [ ] Navigate back to home
- [ ] View count should increase
- [ ] Repeat - count keeps increasing

## Browser Compatibility
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on mobile device

## Performance
- [ ] Add 50+ bookmarks
- [ ] Verify app remains responsive
- [ ] Test search with many bookmarks
- [ ] Test import/export with large dataset
