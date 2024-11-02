import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RootState } from "@/store";
import UpdateBasicInfo from "./edituser/UpdateBasicInfo";
import UpdateAdditionalInfo from "./edituser/UpdateAdditionalInfo";
import UpdateUserSuccess from "./edituser/UpdateUserSuccess";
import { UserRecieved } from "@/store/slices/adminSlice/user";

const EditUser = ({ user }: { user: UserRecieved }) => {
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <DialogContent className="max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {currentPageUserCreate == 1
            ? "Update user"
            : currentPageUserCreate == 2
            ? "Update permission"
            : "Get user password"}
        </DialogTitle>
        <DialogDescription>
          {currentPageUserCreate === 3
            ? "Please take care of the password"
            : " Be carefull when you fill the information"}
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
