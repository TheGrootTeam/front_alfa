import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getInfoCompany } from "../../utils/services/infoCompanyService";
import { ICompanyInfoMapped } from "../../utils/interfaces/IInfoCompany";
import { getCompanyInfo, getCompanyInfoLoaded, getMustRecharge, getOffersState } from "../selectors";
import { resetMustRecharge } from "../reducers/editOfferSlice";
import { getOffersAction } from "../actions/offersActions";

export const getInfoCompanyAction = createAsyncThunk<
  ICompanyInfoMapped,
  void,
  { state: RootState; rejectValue: string }
>('companies/getCompaniesInfo', async (_, { getState, dispatch, rejectWithValue }) => {

  const state = getState();
  const loadedInfoCompany = getCompanyInfoLoaded(state);

  //Test if offers is loaded in state
  const offers = getOffersState(state);
  if (!offers || offers.length === 0) {
    await dispatch(getOffersAction()); // Load in the state the offers
  }

  //Check if there have been any edition in the offers (and take it the data of the status or the DB )
  const mustRecharge = getMustRecharge(state);
  if (loadedInfoCompany && (mustRecharge === false || mustRecharge === null || mustRecharge === undefined)) {
    return getCompanyInfo(state);
  }

  try {
    const info = await getInfoCompany();
    if (mustRecharge) {
      dispatch(resetMustRecharge());
    }
    return info;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});