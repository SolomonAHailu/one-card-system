"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImLoop2 } from "react-icons/im";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { usePathname } from "next/navigation";
import { RootState } from "@/store";
import { handleFetchStudents } from "@/store/slices/registrarSlice/students";
import SelectLimit from "@/app/[locale]/(dashboard)/registrar/_components/SelectLimit";
import StudentsList from "./_components/StudentsList";
import StatusFilter from "../_components/StatusFilter";
import CustomDebounceSearch from "@/components/inputs/CustomDebounceSearch";
import { Form } from "@/components/ui/form";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const locale = usePathname().split("/")[1];
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState<string>("Active");
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refetchStudent, setRefetchStudent] = useState<boolean>(false);

  const { isGetStudentLoading } = useSelector(
    (state: RootState) => state.student
  );

  const refetchStudents = () => {
    setRefetchStudent(true);
    setTimeout(() => {
      setRefetchStudent(false);
    }, 500);
    dispatch<any>(
      handleFetchStudents({
        page,
        limit,
        name: name ?? "",
        status,
      })
    );
  };

  const handleFormSubmit = () => {
    refetchStudents();
  };

  return (
    <div className="flex flex-col gap-y-3">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-6">
            <div
              className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
              onClick={refetchStudents}
            >
              <ImLoop2
                className={`text-sm transition-transform duration-500 text-white ${
                  refetchStudent ? "animate-spin" : ""
                }`}
              />
            </div>
            <SelectLimit limit={limit} setLimit={setLimit} />
            <StatusFilter status={status} setStatus={setStatus} />
          </div>
          <div>
            <CustomDebounceSearch
              value={name}
              onChange={setName}
              placeholder="Search by name..."
              className="min-w-[350px]"
              delay={1000}
            />
          </div>
        </div>
      </form>
      <StudentsList
        limit={limit}
        name={name}
        page={page}
        setPage={setPage}
        status={status}
      />
    </div>
  );
};

export default StudentsPage;
