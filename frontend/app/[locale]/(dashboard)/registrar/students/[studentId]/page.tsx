/* eslint-disable @next/next/no-img-element */
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
  handleUpdateStudentCard,
  handleUpdateStudentPhoto,
  handleUpdateStudentStatus,
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
import { toast } from "sonner";
import { Cone, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EditStudent = ({ params }: { params: { studentId: string } }) => {
  const t = useTranslations("student");
  const dispatch = useDispatch();
  const webcamRef = useRef<Webcam | null>(null);
  const {
    isUpdateStudentPhotoLoading,
    isUpdateStudentCardLoading,
    isUpdateStudentError,
    isGetStudentLoading,
    isGetStudentError,
    student,
  } = useSelector((state: RootState) => state.student);
  // const student = students.find(
  //   (student) => student.ID === Number(params.studentId)
  // );
  useEffect(() => {
    dispatch<any>(handleGetSingleStudent({ id: Number(params.studentId) }));
  }, [dispatch, params.studentId]);

  console.log("student", student);

  const [image, setImage] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);

  const updateStudentCardNumber = () => {
    if (cardNumber == null) {
      toast.error("Card number is required");
      return;
    }
    if (cardNumber.length !== 8) {
      toast.error("Card number must be 8 digits");
      return;
    }
    dispatch<any>(
      handleUpdateStudentCard({
        ...student,
        card_number: cardNumber,
      } as DataSendToUpdateStudent)
    );
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      if (capturedImage) {
        setImage(capturedImage.split(",")[1]);
      }
    }
  };
  const saveImage = () => {
    if (image === null) {
      toast.error("Image is required");
      return;
    }
    dispatch<any>(
      handleUpdateStudentPhoto({
        ...student,
        photo: image,
      } as DataSendToUpdateStudent)
    );
  };

  const deleteImage = () => {
    setImage(null);
  };

  console.log("student", student);

  return (
    <div className="h-[calc(100vh-70px)] relative py-8 px-2 overflow-auto">
      {isGetStudentLoading ? (
        <div className="flex items-start gap-x-8">
          <Skeleton className="h-64 w-64" />
          <div className="grid grid-cols-3 gap-5 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-x-8">
          {image ? (
            <div className="col-span-4">
              <div className="h-64 w-64 relative rounded-sm overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${image}`}
                  fill
                  className="object-cover rounded-sm"
                  alt="Student Image"
                />
              </div>
            </div>
          ) : student?.photo ? (
            <div className="col-span-4">
              <div className="h-64 w-64 relative rounded-sm overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${student.photo}`}
                  fill
                  className="object-cover rounded-sm"
                  alt="Student Image"
                />
              </div>
            </div>
          ) : (
            <User className="h-64 w-64 border-[10px] border-gray-200 rounded-lg" />
          )}

          <div className="flex flex-col gap-y-4 w-full">
            <div className="grid grid-cols-12 gap-4">
              <h1 className="text-2xl col-span-12">
                STUDENT BASIC INFORMATION
              </h1>
              <div className="flex flex-col gap-y-1 items-start col-span-4">
                <Label htmlFor="first_name">{t("firstname")}</Label>
                <Input id="first_name" value={student?.first_name} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-4">
                <Label htmlFor="father_name">{t("fathername")}</Label>
                <Input id="father_name" value={student?.father_name} />
              </div>
              <div className="flex flex-col gap-y-1 items-start col-span-4">
                <Label htmlFor="grand_father_name">
                  {t("grandfathername")}
                </Label>
                <Input
                  id="grand_father_name"
                  value={student?.grand_father_name}
                />
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
            <div className="grid grid-cols-12 gap-4 mt-6">
              <h1 className="text-2xl col-span-12">
                UPDATE STUDENT INFORMATION
              </h1>
              <div className="flex flex-col gap-y-1 items-start col-span-4">
                <Label htmlFor="card_number">{t("cardnumber")}</Label>
                <div className="flex gap-x-2 items-baseline w-full">
                  <Input
                    id="card_number"
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder={t("entercardnumber")}
                    className="w-2/3"
                  />
                  <Button
                    className="w-1/3 bg-[#3A5DD9] hover:bg-[#2a4bc6] text-white flex items-center justify-center gap-x-2"
                    disabled={
                      isUpdateStudentCardLoading ||
                      student?.status === "Inactive"
                    }
                    onClick={updateStudentCardNumber}
                  >
                    Save
                    {isUpdateStudentCardLoading ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : null}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="flex flex-col gap-y-2 items-start col-span-4">
                  <Label htmlFor="status">Picture</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={student?.status === "Inactive"}
                      >
                        Take a picture
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Take picture</DialogTitle>
                        <DialogDescription>
                          Please position the student appropriately before
                          taking the picture.
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
                            <Button
                              variant={"default"}
                              onClick={() => student && captureImage()}
                              className="bg-[#3A5DD9] hover:bg-[#2a4bc6] text-white"
                            >
                              Capture Image
                            </Button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <Image
                              src={`data:image/jpeg;base64,${image}`}
                              width={100}
                              height={100}
                              alt="Captured"
                              className="w-full rounded-md"
                            />
                            <div className="flex gap-2 w-full">
                              <Button
                                variant="secondary"
                                onClick={deleteImage}
                                className="bg-red-700 hover:bg-red-800 w-1/2"
                                disabled={isUpdateStudentPhotoLoading}
                              >
                                Delete
                              </Button>
                              <Button
                                className="bg-[#3A5DD9] hover:bg-[#2a4bc6] px-2 text-sm rounded-md w-1/2 flex items-center justify-center gap-x-2 text-white"
                                onClick={() => student && saveImage()}
                                disabled={isUpdateStudentPhotoLoading}
                              >
                                Save Image
                                {isUpdateStudentPhotoLoading ? (
                                  <FaSpinner className="animate-spin mr-2" />
                                ) : null}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <DialogClose
                          onClick={() => setImage(null)}
                          className="bg-red-700 hover:bg-red-800 py-3 px-4 text-sm rounded-md"
                          disabled={isUpdateStudentPhotoLoading}
                        >
                          Cancel
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            disabled={student?.status === "Inactive"}
            className="bg-[#3A5DD9] hover:bg-[#2a4bc6] absolute bottom-4 right-4"
          >
            Print Id card
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px] h-[450px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Print Id Card</DialogTitle>
            <DialogDescription>
              Please check the status of the id card
            </DialogDescription>
          </DialogHeader>
          <Carousel className="flex-1">
            <CarouselContent className=" w-full h-full">
              <CarouselItem className="w-full">
                <img
                  src={`data:image/jpeg;base64,${student?.photo}`}
                  alt=""
                  className="object-fill m-auto"
                />
              </CarouselItem>
              <CarouselItem className="w-full">
                <img
                  src={`data:image/jpeg;base64,${student?.photo}`}
                  alt=""
                  className="object-fill m-auto"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <DialogFooter>
            <Button className="bg-[#3A5DD9] hover:bg-[#2a4bc6] px-2 text-sm rounded-md w-1/4 flex items-center justify-center gap-x-2 text-white">
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditStudent;
