import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  handleSendEmail,
  removeCurrentUser,
  removeSendEmailSuccess,
} from "@/store/slices/adminSlice/user";
import { DialogClose } from "@/components/ui/dialog";
import { resetUserPermissionState } from "@/store/slices/adminSlice/userpermission";
import UpdateUserFooter from "./UpdateUserFooter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaSpinner } from "react-icons/fa";

const UpdateUserSuccess = () => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const { user, sendEmailLoading, sendEmailSuccess, sendEmailError } =
    useSelector((state: RootState) => state.user);
  const { userPermissions } = useSelector(
    (state: RootState) => state.userPermission
  );
  const userCanDo = userPermissions.map(
    (permission) => permission.permission.description
  );
  const handleConfirmClick = () => {
    dispatch<any>(removeCurrentUser());
    dispatch<any>(resetUserPermissionState());
    dispatch<any>(removeSendEmailSuccess());
    toast.success(t("thankyouproceed"));
  };

  const handleSendEmailForUser = () => {
    dispatch<any>(
      handleSendEmail({
        name: `${user?.first_name} ${user?.father_name} ${user?.grand_father_name}`,
        email: user?.email || "",
        subject: "Password for your account",
        password: user?.password || "",
        role: user?.role.role_name || "",
        roledescription: userCanDo || [],
      })
    );
  };

  const handlePasswordClick = () => {
    navigator.clipboard.writeText(`${user?.password}`);
    toast.success(t("passwordcopied"));
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
            <span className="text-muted-foreground text-lg font-semibold block">{`${user?.first_name.toUpperCase()} - ${user?.father_name.toUpperCase()}`}</span>
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={handlePasswordClick}>
                <span className="text-lg font-medium text-green-600 py-3 px-3 rounded-md">
                  {user?.password}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("copypassword")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-center mt-2">{t("pleasechangepassword")}</p>
        </div>
        {sendEmailSuccess ? (
          <DialogClose
            onClick={handleConfirmClick}
            className="bg-green-600 hover:bg-green-700  py-4 px-4 rounded mt-2"
          >
            {t("passwordsaved")}
          </DialogClose>
        ) : (
          <Button
            className="bg-green-600 hover:bg-green-700  h-fit py-2 px-4 rounded mt-2 flex items-center flex-col gap-x-4 text-white text-lg"
            onClick={handleSendEmailForUser}
            disabled={sendEmailLoading}
          >
            Send Temporary Password To
            <span className="text-[#19285e] italic text-lg block">{user?.email}</span>
            {sendEmailLoading && (
              <FaSpinner className="animate-spin ml-2 text-white" />
            )}
          </Button>
        )}
      </div>
      <UpdateUserFooter />
    </div>
  );
};

export default UpdateUserSuccess;
