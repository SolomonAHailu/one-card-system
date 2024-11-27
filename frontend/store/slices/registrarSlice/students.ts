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

export interface DataSendToUpdateStudent {
  id?: number;
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
  students: StudentRecieved[];
  student: StudentRecieved | null;
  isGetStudentLoading: boolean;
  isGetStudentError: string | null;
  currentPage: number;
  totalPages: number;
  isUpdateStudentLoading: boolean;
  isUpdateStudentError: null | string;
  totalStudents: number;
}

const initialState: StudentState = {
  students: [],
  student: null,
  isGetStudentLoading: false,
  isGetStudentError: null,
  isUpdateStudentLoading: false,
  isUpdateStudentError: null,
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
        state.isGetStudentLoading = true;
        state.isGetStudentError = null;
      })
      .addCase(
        handleFetchStudents.fulfilled,
        (state, action: PayloadAction<DataRecievedWhileFetchStudents>) => {
          state.students = action.payload.data;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalStudents = action.payload.totalUsers;
          state.isGetStudentLoading = false;
          state.isGetStudentError = null;
        }
      )
      .addCase(handleFetchStudents.rejected, (state, action) => {
        state.isGetStudentLoading = false;
        state.isGetStudentError =
          action.error.message || "Fetch students failed";
      });
    builder
      .addCase(handleGetSingleStudent.pending, (state) => {
        state.isGetStudentLoading = true;
        state.isGetStudentError = null;
      })
      .addCase(
        handleGetSingleStudent.fulfilled,
        (state, action: PayloadAction<StudentRecieved>) => {
          state.student = action.payload;
          state.isGetStudentLoading = false;
          state.isGetStudentError = null;
        }
      )
      .addCase(handleGetSingleStudent.rejected, (state, action) => {
        state.isGetStudentLoading = false;
        state.isGetStudentError =
          action.error.message || "Fetch students failed";
      });
    // builder
    //   .addCase(handleCreateStudent.pending, (state) => {
    //     state.isUpdateStudentLoading = true;
    //     state.isUpdateStudentError = null;
    //   })
    //   .addCase(
    //     handleCreateStudent.fulfilled,
    //     (state, action: PayloadAction<StudentRecieved>) => {
    //       state.students.push(action.payload);

    //       state.isUpdateStudentLoading = false;
    //       state.isUpdateStudentError = null;
    //     }
    //   )
    //   .addCase(handleCreateStudent.rejected, (state, action) => {
    //     state.isUpdateStudentLoading = false;
    //     state.isUpdateStudentError =
    //       action.error.message || "Fetch students failed";
    //   });
    builder
      .addCase(handleUpdateStudent.pending, (state) => {
        state.isUpdateStudentLoading = true;
        state.isUpdateStudentError = null;
      })
      .addCase(
        handleUpdateStudent.fulfilled,
        (state, action: PayloadAction<StudentRecieved>) => {
          state.students = state.students.map((student) =>
            student.ID === action.payload.ID ? action.payload : student
          );

          state.isUpdateStudentLoading = false;
          state.isUpdateStudentError = null;
        }
      )
      .addCase(handleUpdateStudent.rejected, (state, action) => {
        state.isUpdateStudentLoading = false;
        state.isUpdateStudentError =
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

// export const handleCreateStudent = createAsyncThunk<
//   StudentRecieved,
//   DataSendToCreateStudent
// >("student/createStudent", async (data) => {
//   const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/registrar/create-student`;

//   const config: AxiosRequestConfig = {
//     url,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//     withCredentials: true,
//   };

//   try {
//     const response = await axios(config);
//     if (response.data) {
//       toast.success("Student created successfully");
//       return response.data;
//     } else {
//       toast.error("Create Students failed");
//       throw new Error("Create Students failed");
//     }
//   } catch (error: any) {
//     toast.error(error.response?.data?.error || "Create Students failed");
//     throw new Error(error.response?.data?.error || "Create Students failed");
//   }
// });

export const handleUpdateStudent = createAsyncThunk<
  StudentRecieved,
  DataSendToUpdateStudent
>("student/updateStudent", async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/registrar/student/${data.id}`;

  const config: AxiosRequestConfig = {
    url,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  try {
    console.log("DATA SEND TO UPDATE STUDENT", data);

    const response = await axios(config);
    if (response.data) {
      toast.success("Student updated successfully");
      return response.data;
    } else {
      toast.error("Update Student failed");
      throw new Error("Update Student failed");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.error || "Update Student failed");
    throw new Error(error.response?.data?.error || "Update Student failed");
  }
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;
