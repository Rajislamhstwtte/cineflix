import { JIKAN_BASE_URL } from '../constants';
import { Anime } from '../types';

const fetchFromJikan = async <T,>(endpoint: string): Promise<T> => {
  const url = `${JIKAN_BASE_URL}/${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Jikan API request failed for endpoint: ${endpoint}`);
  }
  // Add a small delay to respect Jikan's rate limits
  await new Promise(resolve => setTimeout(resolve, 300));
  return response.json();
};

export const getTopAnime = async (): Promise<Anime[]> => {
  const data = await fetchFromJikan<{ data: Anime[] }>('top/anime?filter=bypopularity');
  return data.data;
};

export const getAnimeDetails = async (id: string): Promise<Anime> => {
  const data = await fetchFromJikan<{ data: Anime }>(`anime/${id}/full`);
  return data.data;
};

export const getAnimeRecommendations = async (id: string): Promise<Anime[]> => {
    const data = await fetchFromJikan<{ data: { entry: Anime }[] }>(`anime/${id}/recommendations`);
    return data.data.map(rec => rec.entry);
};