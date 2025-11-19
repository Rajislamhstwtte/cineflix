export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderCountryDetails {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface WatchProviderResults {
  [countryCode: string]: WatchProviderCountryDetails;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
}

export interface TVSeason {
  episodes: Episode[];
  season_number: number;
  _id: string;
  air_date: string;
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Content {
  id: number;
  title: string;
  name?: string; // For TV shows
  original_title?: string; // For movies
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  genres?: { id: number; name: string }[];
  runtime?: number; // For movie details
  episode_run_time?: number[]; // For TV show details
  number_of_seasons?: number; // For TV show details
  seasons?: TVSeason[];
  external_ids?: {
    imdb_id?: string;
  };
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
  'watch/providers'?: {
    results: WatchProviderResults;
  };
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  media_type?: 'movie' | 'tv';
}

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
  year: number;
  episodes: number;
  genres: { mal_id: number; name: string }[];
  trailer: {
    youtube_id: string;
  };
}

export type ContentType = 'movie' | 'tv' | 'anime';

export interface WatchlistItem {
  id: number;
  type: ContentType;
  title: string;
  poster_path: string | null;
}

// FIX: Added missing types for Live TV features.
export type LiveChannelCategory = 'Movies' | 'Comedy' | 'Documentary' | 'Sports' | 'India' | 'News' | 'Entertainment' | 'Music' | 'Kids' | 'International';

export interface LiveChannel {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: LiveChannelCategory;
  provider: string;
}
