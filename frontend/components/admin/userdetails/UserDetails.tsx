import { UserRecieved } from "@/store/slices/adminSlice/user";
import { useState } from "react";
import UserBasicInfo from "./UserBasicInfo";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdditionalInformationForm from "./UserDetailAdditionalInfo";
import UserDetailFooter from "./UserDetailFooter";

const UserDetails = ({ user }: { user: UserRecieved }) => {
  const [page, setPage] = useState<number>(1);
  return (
    <DialogContent className="max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {page == 1 ? "Update user" : page == 2 ? "Update permission" : ""}
        </DialogTitle>
      </DialogHeader>
      {page === 1 ? (
        <UserBasicInfo user={user} />
      ) : page === 2 ? (
        <AdditionalInformationForm user={user} />
      ) : null}
      <UserDetailFooter page={page} setPage={setPage} />
    </DialogContent>
  );
};

export default UserDetails;
