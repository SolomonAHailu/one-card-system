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
import BasicInformationForm from "./createuser/BasicInformationForm";
import AdditionalInformationForm from "./createuser/AdditionalInformationForm";
import CreateUserSuccess from "./createuser/CreateUserSuccess";
import { useTranslations } from "next-intl";

const AddUser = () => {
  const t = useTranslations("adminusers");
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
            {currentPageUserCreate == 1
              ? t("createuser")
              : currentPageUserCreate == 2
              ? t("assignpermission")
              : t("getpassword")}
          </DialogTitle>
          <DialogDescription>
            {currentPageUserCreate === 3
              ? t("takecareofpassword")
              : t("becarefull")}
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
