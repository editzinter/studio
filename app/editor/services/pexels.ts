import { cache } from 'react';

const PEXELS_API_KEY = 'rhP5KG2sSUks8X4pAOzij6gJha8ovivZokLIGlyk5eA97rSa8wGgrZkJ';

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsSearchResult {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

// Cache search requests to minimize API calls
export const searchPexelsPhotos = cache(async (
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<PexelsSearchResult> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return {
      page: 1,
      per_page: perPage,
      photos: [],
      total_results: 0
    };
  }
});

// Cache curated photos request
export const getCuratedPhotos = cache(async (
  page: number = 1,
  perPage: number = 20
): Promise<PexelsSearchResult> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching curated images from Pexels:', error);
    return {
      page: 1,
      per_page: perPage,
      photos: [],
      total_results: 0
    };
  }
});

// Get photo by ID
export const getPhotoById = cache(async (id: number): Promise<PexelsPhoto | null> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/photos/${id}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return null;
  }
}); 