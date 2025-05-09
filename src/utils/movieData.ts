const dummyMovies = [
  {
    id: 986056,
    title: 'Thunderbolts*',
    overview:
      'After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.',
    poster_path: '/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
    backdrop_path: '/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    release_date: '2025-04-30',
    vote_average: 7.5,
    genre_ids: [28, 12, 878],
    popularity: 435.3441,
  },
  {
    id: 1241436,
    title: 'Warfare',
    overview:
      'A platoon of Navy SEALs embarks on a dangerous mission in Ramadi, Iraq, with the chaos and brotherhood of war retold through their memories of the event.',
    poster_path: '/j8tqBXwH2PxBPzbtO19BTF9Ukbf.jpg',
    backdrop_path: '/cJvUJEEQ86LSjl4gFLkYpdCJC96.jpg',
    release_date: '2025-04-09',
    vote_average: 7.131,
    genre_ids: [10752, 28],
    popularity: 426.9579,
  },
  {
    id: 1144430,
    title: 'Last Bullet',
    overview:
      'Car genius Lino returns to conclude his vendetta against Areski and the corrupt commander who ruined their lives in this turbo-charged trilogy finale.',
    poster_path: '/qycPITRqXgPai7zj1gKffjCdSB5.jpg',
    backdrop_path: '/1ikqGTVjXA9wkDsESVVzpLP8H1r.jpg',
    release_date: '2025-05-06',
    vote_average: 7.8,
    genre_ids: [28, 80, 53],
    popularity: 219.2462,
  },
  {
    id: 974573,
    title: 'Another Simple Favor',
    overview:
      "Stephanie and Emily reunite on the beautiful island of Capri, Italy for Emily's extravagant wedding to a rich Italian businessman. Along with the glamorous guests, expect murder and betrayal to RSVP for a wedding with more twists and turns than the road from the Marina Grande to the Capri town square.",
    poster_path: '/zboCGZ4aIqPMd7VFI4HWnmc7KYJ.jpg',
    backdrop_path: '/b6e5Nss2QNoQM4wJv2VppChswNP.jpg',
    release_date: '2025-03-07',
    vote_average: 6.152,
    genre_ids: [53, 35, 80],
    popularity: 181.2241,
  },
  {
    id: 1317088,
    title: 'The Assessment',
    overview:
      'In a climate change-ravaged world, a utopian society optimizes life, including parenthood assessments. A successful couple faces scrutiny by an evaluator over seven days to determine their fitness for childbearing.',
    poster_path: '/fTWki5Cl8OU3UjQiMcPIynR9QEV.jpg',
    backdrop_path: '/96w2p3xKIgvuSTJsNVnvNFqOhPJ.jpg',
    release_date: '2025-03-21',
    vote_average: 6.9,
    genre_ids: [878, 18, 53],
    popularity: 5.806,
  },
  {
    id: 1233413,
    title: 'Sinners',
    overview:
      'Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.',
    poster_path: '/jYfMTSiFFK7ffbY2lay4zyvTkEk.jpg',
    backdrop_path: '/nAxGnGHOsfzufThz20zgmRwKur3.jpg',
    release_date: '2025-04-16',
    vote_average: 7.6,
    genre_ids: [28, 27, 53],
    popularity: 166.13,
  },
  {
    id: 668489,
    title: 'Havoc',
    overview:
      "When a drug heist swerves lethally out of control, a jaded cop fights his way through a corrupt city's criminal underworld to save a politician's son.",
    poster_path: '/r46leE6PSzLR3pnVzaxx5Q30yUF.jpg',
    backdrop_path: '/65MVgDa6YjSdqzh7YOA04mYkioo.jpg',
    release_date: '2025-04-24',
    vote_average: 6.582,
    genre_ids: [28, 80, 53],
    popularity: 273.9026,
  },
  {
    id: 1233069,
    title: 'Exterritorial',
    overview:
      'When her son vanishes inside a US consulate, ex-special forces soldier Sara does everything in her power to find him — and uncovers a dark conspiracy.',
    poster_path: '/jM2uqCZNKbiyStyzXOERpMqAbdx.jpg',
    backdrop_path: '/bVm6udIB6iKsRqgMdQh6HywuEBj.jpg',
    release_date: '2025-04-29',
    vote_average: 6.727,
    genre_ids: [53, 28],
    popularity: 599.2458,
  },
];

// Helper function to get genre name from ID
const getGenreName = (genreId: number) => {
  const genreMap = {
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
export {
  dummyMovies,
  getGenreName,
  getPrimaryGenre,
  getPosterUrl,
  getBackdropUrl,
};
