import { useState } from "react";
import CreateUserFooter from "./CreateUserFooter";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeCurrentUser } from "@/store/slices/adminSlice/user";
import { DialogClose } from "@/components/ui/dialog";
import { resetUserPermissionState } from "@/store/slices/adminSlice/userpermission";
import { useTranslations } from "next-intl";

const CreateUserSuccess = () => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const handleConfirmClick = () => {
    dispatch<any>(removeCurrentUser());
    dispatch<any>(resetUserPermissionState());
    toast.success(t("thankyouproceed"));
  };

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl font-semibold text-center text-green-600">
          {t("useraccountcreated")}
        </h2>
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-center">
            {t("temporarypassword")}
            <span className="text-muted-foreground text-lg font-semibold">{`${user?.first_name.toUpperCase()} - ${user?.father_name.toUpperCase()}`}</span>
          </p>
          <span className="text-lg font-medium text-green-600 py-3 px-3 rounded-md">
            {user?.password}
          </span>
          <p className="text-center mt-2">{t("pleasechangepassword")}</p>
        </div>
        <DialogClose
          onClick={handleConfirmClick}
          className="bg-green-600 hover:bg-green-700  py-4 px-4 rounded mt-2"
        >
          {t("passwordsaved")}
        </DialogClose>
      </div>
      <CreateUserFooter />
    </div>
  );
};

export default CreateUserSuccess;
