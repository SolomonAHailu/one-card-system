import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

export interface CreatePermissionDataSend {
  permissions_name: string;
  description: string;
}

export interface PermissionRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  permissions_name: string;
  description: string;
}

export interface PermissionsRecievedData {
  data: PermissionRecieved[];
}
export interface PermissionRecievedData {
  data: PermissionRecieved[];
}

interface PermissionState {
  permissions: PermissionRecieved[];
  permission: PermissionRecieved | null;
  isPermissionLoading: boolean;
  isPermissionError: string | null;
}

const initialState: PermissionState = {
  permissions: [],
  permission: null,
  isPermissionLoading: false,
  isPermissionError: null,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchPermissions.pending, (state) => {
        state.isPermissionLoading = true;
        state.isPermissionError = null;
      })
      .addCase(
        handleFetchPermissions.fulfilled,
        (state, action: PayloadAction<PermissionsRecievedData>) => {
          state.permissions = action.payload.data;
          state.isPermissionLoading = false;
          state.isPermissionError = null;
        }
      )
      .addCase(handleFetchPermissions.rejected, (state, action) => {
        state.isPermissionLoading = false;
        state.isPermissionError = action.error.message as string;
      });
  },
});

export const handleFetchPermissions = createAsyncThunk<PermissionsRecievedData>(
  "permission/fetchPermission",
  async () => {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/permissions`;

    const config: AxiosRequestConfig = {
      url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await axios(config);
      if (response.data) {
        console.log("RESPONSE FOUND", response);
        return response.data;
      } else {
        throw new Error("Get role Failed");
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Get role Failed");
    }
  }
);

export const {} = permissionSlice.actions;
export default permissionSlice.reducer;
