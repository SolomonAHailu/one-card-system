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
        <div />
        <div className="flex items-center justify-center gap-2 relative">
          <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
            <Search size={18} />
          </div>
          <Input
            id="search by name"
            type="text"
            placeholder={t("searchbyname")}
            className="border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0 min-w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-4">
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
          <AddPermission />
        </div>
      </div>
      <PermissionList searchTerm={searchTerm} />
    </div>
  );
};

export default PermissionsPage;
