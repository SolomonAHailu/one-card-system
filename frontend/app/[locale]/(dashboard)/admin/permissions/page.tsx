"use client";
import AddPermission from "@/components/admin/AddPermission";
import PermissionList from "@/components/admin/PermissionList";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleFetchPermissions } from "@/store/slices/adminSlice/permission";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const PermissionsPage = () => {
  const dispatch = useDispatch();
  const { isPermissionLoading, isPermissionError } = useSelector(
    (state: RootState) => state.permission
  );
  const [refetchRole, setRefetchRole] = useState<boolean>(false);

  const refetchUsers = () => {
    setRefetchRole(true);
    setTimeout(() => {
      setRefetchRole(false);
    }, 500);
    dispatch<any>(handleFetchPermissions());
  };
  return (
    <div className="flex flex-col gap-y-3">
      {isPermissionLoading ? (
        <div className="flex items-center justify-end w-full gap-x-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="w-[40px] h-[40px] rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-end gap-x-4">
          <div
            className="h-10 w-10 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
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
      )}
      <PermissionList />
    </div>
  );
};

export default PermissionsPage;
