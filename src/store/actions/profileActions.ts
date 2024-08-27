// src/store/actions/profileActions.ts
export const loadUserProfile = () => ({
  type: 'LOAD_USER_PROFILE',
});

export const updateUserProfile = (formData: any) => ({
  type: 'UPDATE_USER_PROFILE',
  payload: formData,
});

export const setProfileError = (error: string) => ({
  type: 'SET_PROFILE_ERROR',
  payload: error,
});
