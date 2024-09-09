import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchOffers } from '../../utils/services/searchService'; // Import your new search service
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { RootState } from '../store';

export const getSearchResultsAction = createAsyncThunk<
  IOfferMapped[],
  string,
  { rejectValue: string; state: RootState }
>(
  'search/getSearchResultsAction',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      console.log('SEARCH TERM ', searchTerm);
      const results = await searchOffers(searchTerm);
      return results;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch search results');
    }
  }
);
