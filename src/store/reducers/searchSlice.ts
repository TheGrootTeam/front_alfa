// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { getSearchResultsAction } from '../actions/searchActions';

export interface SearchState {
  results: IOfferMapped[];
  error: string | null;
  loading: boolean;
  hasSearched: boolean;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}

const initialState: SearchState = {
  results: [],
  error: null,
  loading: false,
  hasSearched: false,
  searchTerm: '',
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
  limit: 10, // Default limit per page
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setHasSearched: (state, action: PayloadAction<boolean>) => {
      state.hasSearched = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload; // Update searchTerm in Redux state
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchResultsAction.fulfilled, (state, action) => {
        state.results = action.payload.offers;
        state.totalResults = action.payload.totalResults;
        state.totalPages = Math.ceil(action.payload.totalResults / state.limit);
        state.loading = false;
        state.hasSearched = true;

        // This ensures the current page is retained after loading new data
        if (action.meta.arg.page) {
          state.currentPage = action.meta.arg.page;
        }
      })
      .addCase(getSearchResultsAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.hasSearched = true;
      });
  },
});

export const { setHasSearched, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
