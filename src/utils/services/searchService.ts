import { IOfferMapped } from '../interfaces/IOffer';
import { client } from '../../api/client';

interface SearchResponse {
  offers: IOfferMapped[];
  totalResults: number;
}

export const searchOffers = async (
  searchTerm: string,
  page: number,
  limit: number
): Promise<SearchResponse> => {
  try {
    const response = await client.get<SearchResponse>('/search', {
      params: {
        searchTerm,
        page,
        limit,
      },
    });

    // TypeScript now knows `response` is the data object
    return response as unknown as SearchResponse; // Cast to the expected structure
  } catch (error) {
    throw new Error('Error fetching search results');
  }
};
