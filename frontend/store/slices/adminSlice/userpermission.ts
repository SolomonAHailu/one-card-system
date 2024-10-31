import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { increareCurrentPage } from "./user";

export interface DataSendToCreateUserPermission {
  user_id: number;
  permission_ids: number[];
}

export interface DataReceivedWhileCreateUserPermission {
  message: string;
}

interface UserPermissionState {
  userPermission: DataReceivedWhileCreateUserPermission | null;
  isUserPermissionLoading: boolean;
  isUserPermissionError: string | null;
}

const initialState: UserPermissionState = {
  userPermission: null,
  isUserPermissionLoading: false,
  isUserPermissionError: null,
};

// Define the slice
const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState,
  reducers: {
    resetUserPermissionState: (state) => {
      state.userPermission = null;
      state.isUserPermissionLoading = false;
      state.isUserPermissionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateUserPermission.pending, (state) => {
        state.isUserPermissionLoading = true;
        state.isUserPermissionError = null;
      })
      .addCase(handleCreateUserPermission.fulfilled, (state, action) => {
        state.userPermission = action.payload;
        state.isUserPermissionLoading = false;
        state.isUserPermissionError = null;
      })
      .addCase(handleCreateUserPermission.rejected, (state, action) => {
        state.isUserPermissionLoading = false;
        state.isUserPermissionError =
          (action.payload as string) || "An error occurred";
      });
  },
});

// Define the async thunk
export const handleCreateUserPermission = createAsyncThunk<
  DataReceivedWhileCreateUserPermission,
  DataSendToCreateUserPermission
>(
  "userPermission/createUserPermission",
  async (data, { rejectWithValue, dispatch }) => {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/createuserpermission`;

    const config: AxiosRequestConfig = {
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    };

    try {
      const response = await axios(config);
      if (response.data) {
        console.log("RESPONSE FOUND TO CREATE USER", response);
        dispatch<any>(increareCurrentPage());
        return response.data;
      } else {
        throw new Error("Create users failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Create users failed"
      );
    }
  }
);

export const { resetUserPermissionState } = userPermissionSlice.actions;
export default userPermissionSlice.reducer;
