"use client";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import BasicInformationForm from "./createuser/BasicInformationForm";
import AdditionalInformationForm from "./createuser/AdditionalInformationForm";
import CreateUserSuccess from "./createuser/CreateUserSuccess";

const AddUser = () => {
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <Dialog>
      <DialogTrigger className="h-10 w-10 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm">
        <MdOutlinePersonAddAlt1 className="text-xl text-white" />
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentPageUserCreate == 1
              ? " Create user"
              : currentPageUserCreate == 2
              ? "Assign permission"
              : "Get user password"}
          </DialogTitle>
          <DialogDescription>
            {currentPageUserCreate === 3
              ? "Please take care of the password"
              : " Be carefull when you fill the information"}
          </DialogDescription>
        </DialogHeader>
        {currentPageUserCreate === 1 ? (
          <BasicInformationForm />
        ) : currentPageUserCreate === 2 ? (
          <AdditionalInformationForm />
        ) : currentPageUserCreate === 3 ? (
          <CreateUserSuccess />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;