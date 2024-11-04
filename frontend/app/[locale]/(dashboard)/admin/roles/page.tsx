"use client";
import AddRole from "@/components/admin/AddRole";
import RoleList from "@/components/admin/RoleList";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleFetchRole } from "@/store/slices/adminSlice/role";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

const AllrolesPage = () => {
  const dispatch = useDispatch();
  const { isRoleLoading, isRoleError, roles } = useSelector(
    (state: RootState) => state.role
  );
  const [refetchRole, setRefetchRole] = useState<boolean>(false);

  const refetchRoles = () => {
    setRefetchRole(true);
    setTimeout(() => {
      setRefetchRole(false);
    }, 500);
    dispatch<any>(handleFetchRole());
  };
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-end gap-x-4">
        <div
          className="h-10 w-10 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
          onClick={refetchRoles}
        >
          <ImLoop2
            className={`text-sm transition-transform duration-500 text-white ${
              refetchRole ? "animate-spin" : ""
            }`}
          />
        </div>
        <AddRole />
      </div>
      <RoleList />
    </div>
  );
};

export default AllrolesPage;