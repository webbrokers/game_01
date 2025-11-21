# Product Showcase & Admin Panel

A simple product showcase website with a built-in admin panel for managing content.

## Features
- **Showcase Page (`index.html`)**: Displays a list of financial products with details and "Get Money" links.
- **Admin Panel (`admin.html`)**:
    - Secure login (default: `admin` / `admin`).
    - Add, edit, and delete products.
    - Drag and drop to reorder products.
- **Data Persistence**: Uses `localStorage` to save data in the browser. No backend required.

## Setup
1. Open `index.html` in your browser to view the showcase.
2. Open `admin.html` to manage the content.

## Usage
1. Go to `admin.html`.
2. Login with username: `admin` and password: `admin`.
3. Use the "Add Product" button to create new entries.
4. Drag items in the list to change their order on the showcase page.
5. Changes are saved automatically and will appear on `index.html` (refresh required).

## Note
Since this project uses `localStorage`, the data is stored in your specific browser instance. Clearing browser data will reset the product list to defaults.
