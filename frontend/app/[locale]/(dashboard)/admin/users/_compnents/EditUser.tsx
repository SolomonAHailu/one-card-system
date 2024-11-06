import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import UpdateBasicInfo from "./edituser/UpdateBasicInfo";
import UpdateAdditionalInfo from "./edituser/UpdateAdditionalInfo";
import UpdateUserSuccess from "./edituser/UpdateUserSuccess";
import { UserRecieved } from "@/store/slices/adminSlice/user";
import { useTranslations } from "next-intl";

const EditUser = ({ user }: { user: UserRecieved }) => {
  const t = useTranslations("adminusers");
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
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
        <UpdateBasicInfo user={user} />
      ) : currentPageUserCreate === 2 ? (
        <UpdateAdditionalInfo />
      ) : currentPageUserCreate === 3 ? (
        <UpdateUserSuccess />
      ) : null}
    </DialogContent>
  );
};

export default EditUser;
