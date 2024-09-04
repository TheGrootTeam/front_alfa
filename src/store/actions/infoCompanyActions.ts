import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getInfoCompany } from "../../utils/services/infoCompanyService";
import { ICompanyInfoMapped } from "../../utils/interfaces/IInfoCompany";
import { getCompanyInfo, getCompanyInfoLoaded } from "../selectors";

export const getInfoCompanyAction = createAsyncThunk<
  ICompanyInfoMapped,
  void,
  { state: RootState; rejectValue: string }
>('companies/getCompaniesInfo', async (_, { getState, rejectWithValue }) => {
  //>('applicants/getApplicantsInfo', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const loadedInfoCompany = getCompanyInfoLoaded(state);

  if (loadedInfoCompany) {
    return getCompanyInfo(state);
  }

  try {
    const info = await getInfoCompany();
    return info;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});