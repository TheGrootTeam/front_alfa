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
}

const initialState: SearchState = {
  results: [],
  error: null,
  loading: false,
  hasSearched: false,
  searchTerm: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setHasSearched: (state, action: PayloadAction<boolean>) => {
      state.hasSearched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultsAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.searchTerm = action.meta.arg; // Store the search term when the search starts
      })
      .addCase(
        getSearchResultsAction.fulfilled,
        (state, action: PayloadAction<IOfferMapped[]>) => {
          state.results = action.payload;
          state.loading = false;
          state.hasSearched = true;
        }
      )
      .addCase(getSearchResultsAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.hasSearched = true;
      });
  },
});

export const { setHasSearched } = searchSlice.actions;

export default searchSlice.reducer;
