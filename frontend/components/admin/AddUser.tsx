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

const AddUser = () => {
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <Dialog>
      <DialogTrigger className="h-14 w-14 bg-green-500 hover:bg-green-400 flex items-center justify-center rounded-sm">
        <MdOutlinePersonAddAlt1 className="text-xl" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Be carefull when you fill the information
          </DialogDescription>
        </DialogHeader>
        {currentPageUserCreate === 1 ? (
          <BasicInformationForm />
        ) : currentPageUserCreate === 2 ? (
          <AdditionalInformationForm />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
