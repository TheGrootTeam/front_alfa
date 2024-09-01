import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompanyInfoMapped, ICompanyInfoReduxState } from '../../utils/interfaces/IInfoCompany';
import { getInfoCompanyAction } from '../actions/infoCompanyActions';

const initialState: ICompanyInfoReduxState = {
  infoCompany: {
    id: '',
    dniCif: '',
    name: '',
    email: '',
    phone: '',
    sector: { _id: '', sector: '' },
    ubication: '',
    description: '',
    logo: '',
    publishedOffers: [],
    __v: 0,
  },
  loadedCompany: false,
};

export const companyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    resetCompanyInfoStore: (state) => {
      state.infoCompany = initialState.infoCompany;
      state.loadedCompany = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getInfoCompanyAction.fulfilled,
      (state, action: PayloadAction<ICompanyInfoMapped>) => {
        state.infoCompany = action.payload;
        state.loadedCompany = true;
      }
    );
  },
});
