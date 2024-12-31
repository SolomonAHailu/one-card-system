"use client";
import { RootState } from "@/store";
import { handleGetSingleStudent } from "@/store/slices/registrarSlice/students";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StudentFormLoading from "./StudentFormLoading";
import StudentForm from "./StudentForm";

type Props = {
  studentId?: string;
};

export default function StudentFormComponent({ studentId }: Props) {
  const dispatch = useDispatch();
  const { student, isGetStudentLoading } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    if (studentId) {
      dispatch<any>(handleGetSingleStudent({ id: Number(studentId) }));
    }
  }, [dispatch, studentId]);

  return (
    <div>
      {studentId ? (
        <div>
          {isGetStudentLoading ? (
            <StudentFormLoading />
          ) : (
            <>
              <StudentForm student={student!} />
            </>
          )}
        </div>
      ) : (
        <StudentForm />
      )}
    </div>
  );
}
