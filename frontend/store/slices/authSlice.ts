import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuthUser: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserIdAsync.fulfilled, (state, action) => {
        state.userId = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(setUserIdAsync.rejected, (state) => {
        state.isLoading = false;
        state.error = "Error fetching user ID";
      });
  },
});

export const setUserIdAsync = createAsyncThunk(
  "auth/setUserIdAsync",
  async () => {
    const response = await fetch("/api/user");
    return response.json();
  }
);

export const { setLoading, setError, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
