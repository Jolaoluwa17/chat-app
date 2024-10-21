import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define your auth state
interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: Record<string, any> | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

// Asynchronous thunk for setting credentials and user data in SecureStore
export const saveCredentials = createAsyncThunk(
  "auth/saveCredentials",
  async (
    {
      accessToken,
      refreshToken,
      user,
    }: { accessToken: string; refreshToken: string; user: Record<string, any> },
    { dispatch }
  ) => {
    // Save tokens and user in SecureStore
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    // Update the redux state
    dispatch(setCredentials({ accessToken, refreshToken, user }));
  }
);

// Asynchronous thunk for logging out and clearing SecureStore
export const clearCredentials = createAsyncThunk(
  "auth/clearCredentials",
  async (_, { dispatch }) => {
    // Remove tokens and user from SecureStore
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");

    // Clear the redux state
    dispatch(logout());
  }
);

// Auth slice with standard reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: Record<string, any>;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
