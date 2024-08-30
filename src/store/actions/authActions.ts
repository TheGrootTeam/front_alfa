import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from '../../utils/services/authService';
import { ILoginData, IToken } from '../../utils/interfaces/IAuth';
import { router } from '../../router';
import { applicantInfoSlice } from '../reducers/infoApplicantSlice';
import { getApplicantInfoLoaded, getCompanyInfoLoaded } from '../selectors';
import { RootState } from '../store';
import { companyInfoSlice } from '../reducers/infoCompanySlice';

export const authLogin = createAsyncThunk<
  IToken,
  ILoginData,
  { rejectValue: string; extra: { router: typeof router } }
>('auth/login', async (data: ILoginData, { rejectWithValue, extra }) => {
  try {
    // configure header's Content-Type as JSON
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    const { router } = extra;
    const dataObject = (await login(data)) as IToken;
    // redirect to the user or company dashboard
    dataObject.isCompany
      ? router.navigate('/company')
      : router.navigate('/user');

    console.log('AUTH SLICE: ', dataObject);
    return dataObject;
  } catch (error: any) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});

export const authLogout = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>('auth/logout', async (_, { getState, rejectWithValue, dispatch }) => {
  const state = getState();
  try {
    await logout();
    // if an applicant or Company was loged, reset the state
    if (getApplicantInfoLoaded(state)) {
      dispatch(applicantInfoSlice.actions.resetApplicantInfoStore());
    }
    //BALIZA
    if (getCompanyInfoLoaded(state)) {
      dispatch(companyInfoSlice.actions.resetCompanyInfoStore());
    }
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});
