import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

export interface RoleSend {
  role_name: string;
  description: string;
}
export interface DataRecievedWhileFecthRoles {
  data: RoleRecieved[];
}
export interface RoleRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  role_name: string;
  description: string;
}

export interface RoleState {
  roles: RoleRecieved[];
  role: RoleRecieved | null;
  isRoleLoading: boolean;
  isRoleError: string | null;
}

const initialState: RoleState = {
  roles: [],
  role: null,
  isRoleLoading: false,
  isRoleError: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchRole.pending, (state) => {
        state.isRoleLoading = true;
        state.isRoleError = null;
      })
      .addCase(
        handleFetchRole.fulfilled,
        (state, action: PayloadAction<DataRecievedWhileFecthRoles>) => {
          state.roles = action.payload.data;
          state.isRoleLoading = false;
          state.isRoleError = null;
        }
      )
      .addCase(handleFetchRole.rejected, (state, action) => {
        state.isRoleLoading = false;
        state.isRoleError = action.error.message as string;
      });
  },
});

export const handleFetchRole = createAsyncThunk<DataRecievedWhileFecthRoles>(
  "role/fetchRole",
  async () => {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/roles`;

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

export const {} = roleSlice.actions;
export default roleSlice.reducer;
