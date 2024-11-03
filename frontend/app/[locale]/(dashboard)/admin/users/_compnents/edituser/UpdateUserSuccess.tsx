import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeCurrentUser } from "@/store/slices/adminSlice/user";
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

const UpdateUserSuccess = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleConfirmClick = () => {
    dispatch<any>(removeCurrentUser());
    dispatch<any>(resetUserPermissionState());
    toast.success("Thank you! You can now proceed.");
  };

  const handlePasswordClick = () => {
    navigator.clipboard.writeText(`${user?.password}`);
    toast.success("Password copied to clipboard");
    setShowTooltip(false);
  };

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl font-semibold text-center text-green-600">
          Account Created Successfully!
        </h2>
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-center">
            Temporary password for user{" "}
            <span className="text-muted-foreground text-lg font-semibold">{`${user?.first_name.toUpperCase()} - ${user?.father_name.toUpperCase()}`}</span>
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                asChild
                className="text-lg font-medium text-green-600 py-3 px-3"
                onClick={handlePasswordClick}
              >
                <Button variant="ghost" className="hover:text-green-700">
                  {user?.password}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm text-[#2a4bc6]">Click to copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-center mt-2">
            Please change this password after logging in for security.
          </p>
        </div>
        <DialogClose
          onClick={handleConfirmClick}
          className="bg-green-600 hover:bg-green-700 py-4 px-4 rounded mt-2"
        >
          I have saved my password
        </DialogClose>
      </div>
      <UpdateUserFooter />
    </div>
  );
};

export default UpdateUserSuccess;
