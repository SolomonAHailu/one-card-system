"use client";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

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
import BasicInformationForm from "../../users/_compnents/createuser/BasicInformationForm";
// import AdditionalInformationForm from "./createuser/AdditionalInformationForm";
import CreateUserSuccess from "../../users/_compnents/createuser/CreateUserSuccess";
import CreateDevice from "./createdevice";

const AddDevice = () => {
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <Dialog>
      <DialogTrigger className="h-14 w-14 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm">
        <MdOutlinePersonAddAlt1 className="text-xl text-white" />
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Create Device
            {/* {currentPageUserCreate == 1
              ? " Create Device"
              : currentPageUserCreate == 2
              ? "Assign permission"
              : "Get user password"} */}
          </DialogTitle>
          <DialogDescription>
            {/* {currentPageUserCreate === 3
              ? "Please take care of the password"
              : " Be carefull when you "} */}
            Please fill in the information to create a new device
          </DialogDescription>
        </DialogHeader>

        <CreateDevice />
      </DialogContent>
    </Dialog>
  );
};

export default AddDevice;
