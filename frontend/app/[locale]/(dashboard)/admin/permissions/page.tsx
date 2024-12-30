"use client";
import { Input } from "@/components/ui/input";
import AddPermission from "./_components/AddPermission";
import PermissionList from "./_components/PermissionList";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleFetchPermissions } from "@/store/slices/adminSlice/permission";
import { Search } from "lucide-react";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MdAddModerator } from "react-icons/md";

const PermissionsPage = () => {
  const t = useTranslations("permission");
  const dispatch = useDispatch();
  const [refetchRole, setRefetchRole] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const refetchUsers = () => {
    setRefetchRole(true);
    setTimeout(() => {
      setRefetchRole(false);
    }, 500);
    dispatch<any>(handleFetchPermissions());
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-x-4">
        <div
          className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
          onClick={refetchUsers}
        >
          <ImLoop2
            className={`text-sm transition-transform duration-500 text-white ${
              refetchRole ? "animate-spin" : ""
            }`}
          />
        </div>
        <div className="flex items-center gap-x-20">
          <div className="flex items-center justify-center gap-2 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </div>
            <Input
              id="search-by-name"
              type="text"
              placeholder={t("searchbyname")}
              className="pl-10 ring-0 border-2 focus-visible:ring-offset-0 focus-visible:ring-1 min-w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer">
              <MdAddModerator className="text-xl text-white" />
            </DialogTrigger>
            <AddPermission />
          </Dialog>
        </div>
      </div>
      <PermissionList searchTerm={searchTerm} />
    </div>
  );
};

export default PermissionsPage;
