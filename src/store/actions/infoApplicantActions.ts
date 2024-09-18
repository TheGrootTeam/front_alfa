import { createAsyncThunk } from '@reduxjs/toolkit';
import { IApplicantInfoMapped } from '../../utils/interfaces/IInfoApplicant';
import { RootState } from '../store';
import { getApplicantInfo, getApplicantInfoLoaded } from '../selectors';
import { getInfoApplicant } from '../../utils/services/infoApplicantService';
import { infoApplicantMapped } from '../../utils/utilsInfoApplicant';

export const getInfoApplicantAction = createAsyncThunk<
  IApplicantInfoMapped,
  void,
  { state: RootState; rejectValue: string }
>('applicants/getApplicantsInfo', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const loadedInfoApplicant = getApplicantInfoLoaded(state);

  if (loadedInfoApplicant) {
    return getApplicantInfo(state);
  }

  try {
    const info = await getInfoApplicant();
    const mappedInfo = infoApplicantMapped(info);
    return mappedInfo;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});
