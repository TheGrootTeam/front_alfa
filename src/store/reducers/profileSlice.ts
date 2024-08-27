import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profileData: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileData: {},
  loading: false,
  error: null,
};

// Función para serializar las fechas
function serializeDates(data: any): any {
  const serializedData = { ...data };
  Object.keys(serializedData).forEach((key) => {
    if (serializedData[key] instanceof Date) {
      serializedData[key] = serializedData[key].toISOString();
    }
  });
  return serializedData;
}

// Función para deserializar las fechas
export function deserializeDates(data: any): any {
  // Exporta la función
  const deserializedData = { ...data };
  Object.keys(deserializedData).forEach((key) => {
    if (
      typeof deserializedData[key] === 'string' &&
      deserializedData[key].match(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      )
    ) {
      deserializedData[key] = new Date(deserializedData[key]);
    }
  });
  return deserializedData;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadUserProfile(state) {
      state.loading = true;
    },
    updateUserProfile(state, action: PayloadAction<any>) {
      // Serializa los datos antes de almacenarlos en Redux
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
