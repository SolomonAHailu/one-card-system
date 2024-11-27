"use client";
import { Label } from "@/components/ui/label";
// import CreateUserFooter from "./CreateUserFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import {
  DataSendToUpdateStudent,
  handleGetSingleStudent,
  handleUpdateStudent,
  StatusType,
} from "@/store/slices/registrarSlice/students";
import { editStudentSchema } from "@/validators/registrar/edit-student";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { format, set } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Webcam from "react-webcam";
import Image from "next/image";

const EditStudent = ({ params }: { params: { studentId: string } }) => {
  const t = useTranslations("student");
  const dispatch = useDispatch();
  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const {
    isUpdateStudentLoading,
    isUpdateStudentError,
    isGetStudentLoading,
    isGetStudentError,
    students,
  } = useSelector((state: RootState) => state.student);
  const student = students.find(
    (student) => student.ID === Number(params.studentId)
  );
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<DataSendToUpdateStudent>({
    resolver: yupResolver(editStudentSchema(t) as any),
    defaultValues: {
      status: student?.status,
      id: student?.ID,
      card_number: student?.card_number,
      photo: student?.photo,
    },
  });
  const onSubmit = (data: DataSendToUpdateStudent) => {
    console.log(data);
    dispatch<any>(handleUpdateStudent(data));
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      if (capturedImage) {
        setValue("photo", capturedImage);
      }
      clearErrors("photo");
      setImage(capturedImage);
    }
  };

  const deleteImage = () => {
    setValue("photo", "");
    setImage(null);
  };

  return (
    <div className="h-[730px] relative py-8 px-2 overflow-auto">
      <div>
        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="first_name">{t("firstname")}</Label>
            <Input id="first_name" value={student?.first_name} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="father_name">{t("fathername")}</Label>
            <Input id="father_name" value={student?.father_name} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="grand_father_name">{t("grandfathername")}</Label>
            <Input id="grand_father_name" value={student?.grand_father_name} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="student_id">{t("studentid")}</Label>
            <Input id="student_id" value={student?.student_id} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" value={student?.email} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input id="phone" value={student?.phone} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="sex">{t("sex")}</Label>
            <Input id="sex" value={student?.sex} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
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
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="program">{t("program")}</Label>
            <Input id="program" type="text" value={student?.program} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="section">{t("section")}</Label>
            <Input id="section" type="text" value={student?.section} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="year">{t("year")}</Label>
            <Input id="year" type="text" value={student?.year} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="semester">{t("semester")}</Label>
            <Input id="semester" type="text" value={student?.semester} />
          </div>
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="religion">{t("religion")}</Label>
            <Input id="religion" type="text" value={student?.religion} />
          </div>
        </div>
        <form
          className="grid grid-cols-12 gap-4 mt-6 items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-1 items-start col-span-4">
            <Label htmlFor="card_number">{t("cardnumber")}</Label>
            <Input
              id="card_number"
              {...register("card_number")}
              placeholder={t("entercardnumber")}
              className={cn(
                { "focus-visible:ring-red-600": errors.card_number },
                "mt-1 block w-full"
              )}
            />
            {errors.card_number && (
              <p className="text-red-500">{errors.card_number.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 items-start col-span-4">
            <Label htmlFor="status">{t("status")}</Label>
            <Select
              onValueChange={(value) => {
                setValue("status", value as StatusType);
                clearErrors("status");
              }}
              defaultValue={student?.status}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue
                  placeholder={student?.status || t("selectstatus")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={StatusType.Active}>Active</SelectItem>
                  <SelectItem value={StatusType.Inactive}>Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 mt-1">{errors.status.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 items-start col-span-4">
            <Label htmlFor="status">{t("status")}</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Take a picture</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Take picture</DialogTitle>
                  <DialogDescription>
                    Please position the student appropriately before taking the
                    picture.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  {!image ? (
                    <>
                      <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full rounded-md"
                      />
                      <Button variant={"default"} onClick={captureImage}>
                        Capture Image
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt="Captured"
                        className="w-full rounded-md"
                      />
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={deleteImage}>
                          Delete
                        </Button>
                        <DialogClose>Save Image</DialogClose>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <DialogClose onClick={() => setImage(null)}>
                    Cancel
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}
          </div>
          {image ? (
            <div className="col-span-4">
              <div className="h-48 w-48 relative">
                <Image
                  src={image}
                  fill
                  className="object-contain rounded-md"
                  alt="Student Image"
                />
              </div>
            </div>
          ) : student?.photo ? (
            <div className="col-span-4">
              <div className="h-48 w-48 relative">
                <Image
                  src={student?.photo}
                  fill
                  className="object-contain rounded-md"
                  alt="Student Image"
                />
              </div>
            </div>
          ) : null}
          <div className="flex justify-center absolute bottom-0 right-0">
            <Button
              type="submit"
              className="w-full sm:w-40 mt-4"
              disabled={isUpdateStudentLoading}
            >
              {isUpdateStudentLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : null}
              {t("edit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
