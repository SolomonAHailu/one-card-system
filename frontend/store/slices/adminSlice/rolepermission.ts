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
      )
      .addCase(handleUpdateRolePermissionByRoleId.pending, (state) => {
        state.isRolePermissionLoading = true;
        state.isRolePermissionError = null;
      })
      .addCase(
        handleUpdateRolePermissionByRoleId.fulfilled,
        (state, action: PayloadAction<RolePermissionRecievedData>) => {
          state.rolePermissions = action.payload.data;
          state.isRolePermissionLoading = false;
          state.isRolePermissionError = null;
        }
      )
      .addCase(handleUpdateRolePermissionByRoleId.rejected, (state, action) => {
        state.isRolePermissionLoading = false;
        state.isRolePermissionError = action.error.message as string;
      });
  },
});

export const handleFetchPermissionForSpecificRole = createAsyncThunk<
  RolePermissionRecievedData,
  RolePermissionSend
>("rolepermission/fetchpermissionsforrole", async ({ role_id }) => {
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

export const handleUpdateRolePermissionByRoleId = createAsyncThunk<
  RolePermissionRecievedData,
  { role_id: number; permission_ids: number[] }
>(
  "rolepermission/updaterolepermission",
  async ({ role_id, permission_ids }) => {
    console.log("DATA SEND TO UPDATE ROLE PERMISSION", {
      role_id,
      permission_ids,
    });
    const payload = { role_id, permission_ids };
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/rolepermission/${role_id}`;
    const config: AxiosRequestConfig = {
      url,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: payload,
    };

    try {
      const response = await axios(config);
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Update role permissions failed");
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Update role permissions failed"
      );
    }
  }
);

export const {} = rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
