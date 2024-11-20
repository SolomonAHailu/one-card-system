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

export interface DataRecievedWhileFetchStudents {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  data: StudentRecieved[];
}
interface DataSendToFetchStudents {
  page: number;
  limit: number;
  name?: string;
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
  students: StudentRecieved[];
  student: StudentRecieved | null;
  isGetStudentLoaidng: boolean;
  isGetStudentError: string | null;
  currentPage: number;
  totalPages: number;
  totalStudents: number;
}

const initialState: StudentState = {
  students: [],
  student: null,
  isGetStudentLoaidng: false,
  isGetStudentError: null,
  currentPage: 0,
  totalPages: 0,
  totalStudents: 0,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleFetchStudents.pending, (state) => {
        state.isGetStudentLoaidng = true;
        state.isGetStudentError = null;
      })
      .addCase(
        handleFetchStudents.fulfilled,
        (state, action: PayloadAction<DataRecievedWhileFetchStudents>) => {
          state.students = action.payload.data;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalStudents = action.payload.totalUsers;
          state.isGetStudentLoaidng = false;
          state.isGetStudentError = null;
        }
      )
      .addCase(handleFetchStudents.rejected, (state, action) => {
        state.isGetStudentLoaidng = false;
        state.isGetStudentError =
          action.error.message || "Fetch students failed";
      });
  },
});

export const handleFetchStudents = createAsyncThunk<
  DataRecievedWhileFetchStudents,
  DataSendToFetchStudents
>("student/fetchStudents", async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/registrar/students`;

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
      return response.data;
    } else {
      toast.error("Fetch students failed");
      throw new Error("Fetch students failed");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.error || "Fetch students failed");
    throw new Error(error.response?.data?.error || "Fetch students failed");
  }
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;
