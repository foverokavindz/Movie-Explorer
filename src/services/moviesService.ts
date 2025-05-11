import axios from 'axios';

// TMDB API configuration
const BASE_URL = import.meta.env.VITE_TMDB_URL;
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// Interfaces for API responses
interface MovieDetailsResponse {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string | null;
  vote_average: number;
  title: string;
}

interface CastMemberResponse {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

// This function fetches detailed information about a specific movie using its ID
export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetailsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract only the required fields
    const {
      backdrop_path,
      genres,
      id,
      imdb_id,
      origin_country,
      original_language,
      overview,
      popularity,
      poster_path,
      release_date,
      runtime,
      status,
      tagline,
      vote_average,
      title,
    } = response.data;

    return {
      backdrop_path,
      genres,
      id,
      imdb_id,
      origin_country,
      original_language,
      overview,
      popularity,
      poster_path,
      release_date,
      runtime,
      status,
      tagline,
      vote_average,
      title,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// This function fetches the cast members of a specific movie using its ID
export const getMovieCast = async (
  movieId: number
): Promise<CastMemberResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // Filter to include only cast members with known_for_department as "Acting"
    const actors = response.data.cast
      .filter((castMember: any) => castMember.known_for_department === 'Acting')
      .map(
        ({ id, name, character, profile_path, order }: CastMemberResponse) => ({
          id,
          name,
          character,
          profile_path,
          order,
        })
      );

    return actors;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

// This function fetches the trailer for a specific movie using its ID
export const getMovieTrailer = async (
  movieId: number
): Promise<string | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const trailers = response.data.results.filter(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (trailers.length > 0) {
      return trailers[0].key;
    }

    return null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    throw error;
  }
};
