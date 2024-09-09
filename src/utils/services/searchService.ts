import { IOfferMapped } from '../interfaces/IOffer';
import { client } from '../../api/client';

export const searchOffers = async (
  searchTerm: string
): Promise<IOfferMapped[]> => {
  try {
    // Force TypeScript to treat the response as IOfferMapped[]
    const response = (await client.get('/search', {
      params: { searchTerm },
    })) as IOfferMapped[];

    console.log('RESPONSE HERE', response); // Now this should work correctly
    return response;
  } catch (error) {
    throw new Error('Error fetching search results');
  }
};
