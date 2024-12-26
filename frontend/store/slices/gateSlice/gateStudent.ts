import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

export enum SexType {
  Male = "Male",
  Female = "Female",
}

export enum StatusType {
  Active = "Active",
  Inactive = "Inactive",
}

export interface StudentRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  student_id: string;
  card_number: string;
  first_name: string;
  father_name: string;
  grand_father_name: string;
  email: string;
  phone: string;
  sex: SexType;
  date_of_birth: Date;
  program: string;
  section: string;
  year: number;
  semester: number;
  religion: string;
  photo: string;
  library_id: number;
  library_assigned: LibraryRecieved;
  cafeteria_id: number;
  cafeteria_assigned: CafeRecieved;
  dormitory_id: number;
  dormitory_assigned: DormRecieved;
  registered_by: number | null;
  registered_date: Date | null;
  status: StatusType;
}

export interface DataSendToUpdateStudent {
  ID?: number;
  student_id: string;
  card_number: string;
  first_name: string;
  father_name: string;
  grand_father_name: string;
  email: string;
  phone: string;
  sex: SexType;
  date_of_birth: Date;
  program: string;
  section: string;
  year: number;
  semester: number;
  religion: string;
  photo: string;
  library_id: number;
  cafeteria_id: number;
  dormitory_id: number;
  registered_by: number | null;
  status: StatusType;
}

export interface LibraryRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  library_name: string;
  campus: string;
  block_number: string;
  registered_by: number;
}

export interface CafeRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  cafeteria_name: string;
  campus: string;
  block_number: string;
  registered_by: number;
}
export interface LibraryRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  library_name: string;
  campus: string;
  block_number: string;
  registered_by: number;
}

export interface CafeRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  cafeteria_name: string;
  campus: string;
  block_number: string;
  registered_by: number;
}

export interface DormRecieved {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  dormitory_name: string;
  campus: string;
  block_number: string;
  registered_by: number;
}

export interface StudentState {
  student: StudentRecieved | null;
  isStudentLoading: boolean;
  isStudentError: null | string;
}

const initialState: StudentState = {
  student: null,
  isStudentLoading: false,
  isStudentError: null,
};

const gateSlice = createSlice({
  name: "gate",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleGetSingleStudent.pending, (state) => {
        state.isStudentLoading = true;
        state.isStudentError = null;
      })
      .addCase(
        handleGetSingleStudent.fulfilled,
        (state, action: PayloadAction<StudentRecieved>) => {
          state.student = action.payload;
          state.isStudentLoading = false;
          state.isStudentError = null;
        }
      )
      .addCase(handleGetSingleStudent.rejected, (state, action) => {
        state.isStudentLoading = false;
        state.isStudentError = action.error.message || "Fetch students failed";
      });
  },
});

export const handleGetSingleStudent = createAsyncThunk<
  StudentRecieved,
  { id: number }
>("student/getstudent", async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/registrar/student/${data.id}`;

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
      return response.data.data;
    } else {
      toast.error("Fetch student failed");
      throw new Error("Fetch student failed");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.error || "Fetch student failed");
    throw new Error(error.response?.data?.error || "Fetch student failed");
  }
});

export const {} = gateSlice.actions;
export default gateSlice.reducer;
