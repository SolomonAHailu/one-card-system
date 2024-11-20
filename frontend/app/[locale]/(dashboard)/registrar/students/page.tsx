"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { ImLoop2 } from "react-icons/im";
import { Skeleton } from "@/components/ui/skeleton";
import SearchByName from "@/app/[locale]/(dashboard)/registrar/_components/SearchByName";
import SelectLimit from "@/app/[locale]/(dashboard)/registrar/_components/SelectLimit";
import StudentsList from "./_components/StudentsList";
import { handleFetchStudents } from "@/store/slices/registrarSlice/students";
import AddStudent from "./_components/addStudent/AddStudent";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const StudentsPage = () => {
  const t = useTranslations("students");
  const router = useRouter();
  const locale = usePathname().split("/")[1];
  const dispatch = useDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refetchUser, setRefetchUser] = useState<boolean>(false);

  const someThingTobeFetch = false;

  const refetchUsers = () => {
    setRefetchUser(true);
    setTimeout(() => {
      setRefetchUser(false);
    }, 500);
    dispatch<any>(
      handleFetchStudents({
        page,
        limit,
        name: name ?? "",
      })
    );
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        {someThingTobeFetch ? (
          <div className="flex items-center w-full gap-x-14">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="w-[350px] h-[44px] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-20">
            <div className="flex items-center gap-x-6">
              <div
                className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
                onClick={refetchUsers}
              >
                <ImLoop2
                  className={`text-sm transition-transform duration-500 text-white ${
                    refetchUser ? "animate-spin" : ""
                  }`}
                />
              </div>
              <SelectLimit limit={limit} setLimit={setLimit} />
            </div>
            <div className="">
              <SearchByName setName={setName} name={name} />
            </div>
            <div className="w-full flex justify-end">
              <div
                className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
                onClick={() => router.push(`/${locale}/registrar/students/add`)}
              >
                <MdOutlinePersonAddAlt1 className="text-xl text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
      <StudentsList limit={limit} name={name} page={page} setPage={setPage} />
    </div>
  );
};

export default StudentsPage;
