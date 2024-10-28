import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "..";

// Define your types
interface LoginUser {
  email: string;
  password: string;
}

interface Data {
  data: User;
}
interface User {
  ID: number;
  first_name: string;
  father_name: string;
  grand_father_name: string;
  email: string;
  role_id: number;
  role: Role;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  password: null;
}

interface Role {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  role_name: string;
  description: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create the slice
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
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = (action.payload as Data).data;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

// Thunk for handling login
export const handleLogin = createAsyncThunk<
  Data,
  { data: LoginUser; router: any }
>("auth/login", async ({ data, router }) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/user/login`;
  const config: AxiosRequestConfig = {
    url,
    method: "POST",
    data: data,
  };

  try {
    const response = await axios(config);
    if (response.data.data) {
      router.push(`${response.data.data.role?.role_name.toLowerCase().trim()}`);
      return response.data;
    } else {
      throw new Error("Invalid login data");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
});

// Thunk for handling logout
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (
    { router, languagePrefix }: { router: any; languagePrefix: string },
    { dispatch }: { dispatch: AppDispatch }
  ) => {
    dispatch(clearAuthUser());
    router.push(`/${languagePrefix}/login`);
  }
);

export const { setLoading, setError, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
