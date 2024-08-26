import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IApplicantInfoMapped,
  IApplicantInfoReduxState,
} from '../../utils/interfaces/IInfoApplicant';
import { getInfoApplicantAction } from '../actions/infoApplicantActions';

const initialState: IApplicantInfoReduxState = {
  infoApplicant: {
    id: '',
    dniCif: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    photo: '',
    cv: '',
    ubication: '',
    typeJob: '',
    internType: '',
    wantedRol: [],
    mainSkills: [],
    geographically_mobile: false,
    disponibility: false,
    preferredOffers: [],
    suscribedOffers: [],
    __v: 0,
  },
  loadedApplicant: false,
};

export const applicantInfoSlice = createSlice({
  name: 'applicantInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getInfoApplicantAction.fulfilled,
      (state, action: PayloadAction<IApplicantInfoMapped>) => {
        state.infoApplicant = action.payload;
        state.loadedApplicant = true;
      }
    );
  },
});
