import { TMDB_API_KEY, TMDB_BASE_URL } from '../constants';
import { Content, Genre, TVSeason } from '../types';

const fetchFromTMDb = async <T,>(endpoint: string): Promise<T> => {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${TMDB_BASE_URL}/${endpoint}${separator}api_key=${TMDB_API_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDb API request failed for endpoint: ${endpoint}`);
  }
  return response.json();
};

export const getTrending = async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Content[]> => {
  const data = await fetchFromTMDb<{ results: Content[] }>(`trending/${mediaType}/week`);
  return data.results;
};

export const getPopular = async (mediaType: 'movie' | 'tv' = 'movie'): Promise<Content[]> => {
    const data = await fetchFromTMDb<{ results: Content[] }>(`${mediaType}/popular`);
    return data.results;
};

export const getByGenre = async (mediaType: 'movie' | 'tv', genreId: number): Promise<Content[]> => {
  const data = await fetchFromTMDb<{ results: Content[] }>(`discover/${mediaType}?with_genres=${genreId}`);
  return data.results;
};

export const getDiscover = async (mediaType: 'movie' | 'tv', params: Record<string, string>): Promise<Content[]> => {
    const queryParams = new URLSearchParams(params).toString();
    const queryString = `discover/${mediaType}?${queryParams}`;
    const data = await fetchFromTMDb<{ results: Content[] }>(queryString);
    return data.results;
}

export const getGenres = async (mediaType: 'movie' | 'tv'): Promise<Genre[]> => {
    const data = await fetchFromTMDb<{ genres: Genre[] }>(`genre/${mediaType}/list`);
    return data.genres;
};

export const getContentDetails = async (mediaType: 'movie' | 'tv', id: string): Promise<Content> => {
  // FIX: Added 'credits' to append_to_response to fetch cast and crew information.
  return fetchFromTMDb<Content>(`${mediaType}/${id}?append_to_response=videos,external_ids,watch/providers,credits`);
};

export const getTVSeason = async (tvId: string, seasonNumber: number): Promise<TVSeason> => {
  return fetchFromTMDb<TVSeason>(`tv/${tvId}/season/${seasonNumber}`);
};

export const searchContent = async (query: string): Promise<(Content)[]> => {
    const data = await fetchFromTMDb<{ results: (Content)[] }>(`search/multi?query=${encodeURIComponent(query)}`);
    return data.results.filter(item => item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv'));
};

export const getSimilarContent = async (mediaType: 'movie' | 'tv', id: string): Promise<Content[]> => {
    const data = await fetchFromTMDb<{ results: Content[] }>(`${mediaType}/${id}/similar`);
    return data.results;
};
