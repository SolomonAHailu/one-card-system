"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, set } from "date-fns";
import { handleGetSingleStudent } from "@/store/slices/gateSlice/gateStudent";

export default function CurrentGatePage() {
  const dispatch = useDispatch();
  const t = useTranslations("gate");
  const { isStudentError, isStudentLoading, student } = useSelector(
    (state: RootState) => state.gateStudent
  );
  const [id, setId] = useState<number>(49);

  useEffect(() => {
    dispatch<any>(handleGetSingleStudent({ id }));
  }, [dispatch, id]);
  return (
    <div className="h-[calc(100vh-70px)] relative py-8 px-2 overflow-auto">
      {isStudentLoading ? (
        <div className="flex items-start gap-x-8">
          <Skeleton className="h-64 w-64" />
          <div className="grid grid-cols-3 gap-5 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-x-8 bg-red-500">
          <div className="w-1/3 h-full bg-green-500">
            {student?.photo ? (
              <div className="h-96 w-96 relative rounded-sm overflow-hidden bg-violet-400">
                <Image
                  src={`data:image/jpeg;base64,${student.photo}`}
                  fill
                  className="object-cover rounded-sm"
                  alt="Student Image"
                />
              </div>
            ) : (
              <User className="h-96 w-96 border-[10px] border-gray-200 rounded-lg bg-green-500" />
            )}
          </div>

          <div className="flex flex-col gap-y-4 w-2/3 bg-green-500">
            <div className="grid grid-cols-12 gap-4">
              <h1 className="text-2xl col-span-12">
                STUDENT BASIC INFORMATION
              </h1>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="first_name">{t("firstname")}</Label>
                <Input id="first_name" value={student?.first_name} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="father_name">{t("fathername")}</Label>
                <Input id="father_name" value={student?.father_name} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="grand_father_name">
                  {t("grandfathername")}
                </Label>
                <Input
                  id="grand_father_name"
                  value={student?.grand_father_name}
                />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="student_id">{t("studentid")}</Label>
                <Input id="student_id" value={student?.student_id} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" value={student?.email} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" value={student?.phone} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="sex">{t("sex")}</Label>
                <Input id="sex" value={student?.sex} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="date_of_birth">{t("dateofbirth")}</Label>
                <Input
                  id="date_of_birth"
                  type="text"
                  value={
                    student?.date_of_birth
                      ? format(new Date(student.date_of_birth), "yyyy-MM-dd")
                      : ""
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="program">{t("program")}</Label>
                <Input id="program" type="text" value={student?.program} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="section">{t("section")}</Label>
                <Input id="section" type="text" value={student?.section} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="year">{t("year")}</Label>
                <Input id="year" type="text" value={student?.year} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="semester">{t("semester")}</Label>
                <Input id="semester" type="text" value={student?.semester} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-6">
                <Label htmlFor="religion">{t("religion")}</Label>
                <Input id="religion" type="text" value={student?.religion} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
