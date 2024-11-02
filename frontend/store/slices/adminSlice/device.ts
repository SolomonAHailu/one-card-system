import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

interface DataSendToFetchDevices {
  page: number;
  limit: number;
  name?: string;
}
export interface DataSendToCreateDevice {
  name: string;
  serial_number: string;
  ip_address: string;
  port: string;
  Location: string;
}

export interface DataRecievedWhileFetchDevice {
  currentPage: number;
  totalPages: number;
  totalDevices: number;
  data: DeviceRecieved[];
}
export interface DataRecievedWhileCreateDevice {
  data: DeviceRecieved;
}
export interface DeviceRecieved {
  ID: number;
  name: string;
  serial_number: string;
  ip_address: string;
  port: string;
  Location: string;
}

export interface DeviceState {
  devices: DeviceRecieved[];
  device: DeviceRecieved | null;
//   currentPageUserCreate: number;
  isDeviceLoading: boolean;
  isDeviceCreateLoading: boolean;
  isDeviceError: string | null;
  isDeviceCreateError: string | null;
  currentPage: number;
  totalPages: number;
  totalDevices: number;
}

const initialState: DeviceState = {
  devices: [],
  device: null,
//   currentPageDeviceCreate: 1,
  isDeviceLoading: false,
  isDeviceError: null,
  isDeviceCreateLoading: false,
  isDeviceCreateError: null,
  currentPage: 0,
  totalPages: 0,
  totalDevices: 0,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    increareCurrentPage: (state) => {
    //   state.currentPageDeviceCreate += 1;
    },
    removeCurrentDevice: (state) => {
      state.device = null;
    //   state.currentPageDeviceCreate = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchDevice.pending, (state) => {
        state.isDeviceLoading = true;
        state.isDeviceError = null;
      })
      .addCase(
        handleFetchDevice.fulfilled,
        (state, action: PayloadAction<DataRecievedWhileFetchDevice>) => {
          state.devices = action.payload.data;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalDevices = action.payload.totalDevices;
          state.isDeviceLoading = false;
          state.isDeviceError = null;
        }
      )
      .addCase(handleFetchDevice.rejected, (state, action) => {
        state.isDeviceLoading = false;
        state.isDeviceError = action.error.message || "Fetch devices failed";
      });
    builder
      .addCase(handleCreateDevice.pending, (state) => {
        state.isDeviceCreateLoading = true;
        state.isDeviceCreateError = null;
      })
      .addCase(handleCreateDevice.fulfilled, (state, action) => {
        state.device = action.payload.data;
        state.isDeviceCreateLoading = false;
        state.isDeviceCreateError = null;
        // state.currentPageDeviceCreate += 1;
      })
      .addCase(handleCreateDevice.rejected, (state, action) => {
        state.isDeviceCreateLoading = false;
        state.isDeviceCreateError = action.error.message || "Create device failed";
      });
  },
});

export const handleFetchDevice = createAsyncThunk<
  DataRecievedWhileFetchDevice,
  DataSendToFetchDevices
>("device/fetchDevice", async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/devices`;

  const config: AxiosRequestConfig = {
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: { page: data.page, limit: data.limit, name: data.name },
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    if (response.data) {
      console.log("RESPONSE FOUND FOR DEVICE", response);
      return response.data;
    } else {
      throw new Error("Fetch devices failed");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Fetch devices failed");
  }
});

export const handleCreateDevice = createAsyncThunk<
  DataRecievedWhileCreateDevice,
  DataSendToCreateDevice
>("device/createDevice", async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/admin/createdevice`;

  const config: AxiosRequestConfig = {
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    if (response.data) {
      console.log("RESPONSE FOUND TO CREATE dEVICES", response);
      return response.data;
    } else {
      throw new Error("Create devices failed");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Create users failed");
  }
});

export const { increareCurrentPage, removeCurrentDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
