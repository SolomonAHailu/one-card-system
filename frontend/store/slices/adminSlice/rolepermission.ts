import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PermissionRecieved } from "./permission";
import { RoleRecieved } from "./role";
import axios, { AxiosRequestConfig } from "axios";

export interface RolePermissionSend {
  role_id: number;
}

export interface RolePermissionRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  role_id: number;
  permission_id: number;
  role: RoleRecieved;
  permission: PermissionRecieved;
}

export interface RolePermissionRecievedData {
  data: RolePermissionRecieved[];
}

export interface RolePermissionState {
  rolePermissions: RolePermissionRecieved[];
  rolePermission: RolePermissionRecieved | null;
  isRolePermissionLoading: boolean;
  isRolePermissionError: string | null;
}

const initialState: RolePermissionState = {
  rolePermissions: [],
  rolePermission: null,
  isRolePermissionLoading: false,
  isRolePermissionError: null,
};

const rolePermissionSlice = createSlice({
  name: "rolePermission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchPermissionForSpecificRole.pending, (state) => {
        state.isRolePermissionLoading = true;
        state.isRolePermissionError = null;
      })
      .addCase(
        handleFetchPermissionForSpecificRole.fulfilled,
        (state, action: PayloadAction<RolePermissionRecievedData>) => {
          state.rolePermissions = action.payload.data;
          state.isRolePermissionLoading = false;
          state.isRolePermissionError = null;
        }
      )
      .addCase(
        handleFetchPermissionForSpecificRole.rejected,
        (state, action) => {
          state.isRolePermissionLoading = false;
          state.isRolePermissionError = action.error.message as string;
        }
      );
  },
});

export const handleFetchPermissionForSpecificRole = createAsyncThunk<
  RolePermissionRecievedData,
  RolePermissionSend
>("rolepermission/fetchpermissionsfor role", async ({ role_id }) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/rolepermission/${role_id}`;
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
      return response.data;
    } else {
      throw new Error("Fetch role permissions failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Fetch role permissions failed"
    );
  }
});

export const {} = rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
