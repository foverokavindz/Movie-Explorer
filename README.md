# Movie Explorer

Movie Explorer is a web application that allows users to discover, search, and explore movies from various genres and time periods.

## Features Implemented

- User authentication
- Browse movies by trending and featured
- Improved Search functionality with filters
- Detailed movie information pages
- Watchlist functionality
- Responsive design for mobile and desktop
- light/dark mode options
- clean and intuitive UI design

## Prerequisites

- Node.js (v14.0 or higher)
- npm or yarn
- API key from TMDB (The Movie Database)

## How to Setup

1. Clone the repository:

   ```
   git clone https://github.com/foverokavindz/MovieExplorer.git
   cd MovieExplorer
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_TMDB_TOKEN=your_tmdb_token
   VITE_TMDB_URL=https://api.themoviedb.org/3
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

To test the application without creating a new account, you can use the following credentials:

**Email:** admin@admin.com  
**Password:** password

## Technologies Used

### Frontend

- React.js
- Typescript
- Vite
- Redux for state management
- React Router for navigation
- Material UI for styling
- Axios for API requests
- React hot toast for notifications
