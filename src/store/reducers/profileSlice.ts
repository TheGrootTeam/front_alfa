import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicantProfileState } from '../../utils/interfaces/IProfile';
import { serializeDates } from '../../utils/utilsDates';

const initialState: ApplicantProfileState = {
  profileData: {},
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadUserProfile(state) {
      state.loading = true;
    },
    updateUserProfile(state, action: PayloadAction<any>) {
      const serializedData = serializeDates(action.payload);
      state.loading = false;
      state.profileData = serializedData;
    },
    setProfileError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadUserProfile, updateUserProfile, setProfileError } =
  profileSlice.actions;
export default profileSlice.reducer;
