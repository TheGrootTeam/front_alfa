import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchOffers } from '../../utils/services/searchService'; // Import your new search service
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { RootState } from '../store';

export const getSearchResultsAction = createAsyncThunk<
  { offers: IOfferMapped[]; totalResults: number }, // Updated return type
  { searchTerm: string; page: number; limit: number }, // Accept page and limit as parameters
  { rejectValue: string; state: RootState }
>(
  'search/getSearchResultsAction',
  async ({ searchTerm, page, limit }, { rejectWithValue }) => {
    try {
      const response = await searchOffers(searchTerm, page, limit); // Pass page and limit to the service
      return response; // Response should include offers and totalResults
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch search results');
    }
  }
);
