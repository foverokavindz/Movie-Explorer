// Helper function to get genre name from ID
const getGenreName = (genreId: number) => {
  const genreMap: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  return genreMap[genreId] || 'Unknown';
};

// Function to get primary genre for a movie
const getPrimaryGenre = (genreIds: any) => {
  if (!genreIds || genreIds.length === 0) return 'Unknown';
  return getGenreName(genreIds[0]);
};

// Function to format the poster URL
const getPosterUrl = (posterPath: any) => {
  if (!posterPath) return '/placeholder-poster.jpg';
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

// Function to format the backdrop URL
const getBackdropUrl = (backdropPath: any) => {
  if (!backdropPath) return '/placeholder-backdrop.jpg';
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
};

// Export the data and helper functions
export { getGenreName, getPrimaryGenre, getPosterUrl, getBackdropUrl };
