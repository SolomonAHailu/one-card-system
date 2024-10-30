"use client";
import AddUser from "@/components/admin/AddUser";
import RoleDropDown from "@/components/admin/RoleDropDown";
import SearchByName from "@/components/admin/SearchByName";
import SelectLimit from "@/components/admin/SelectLimit";
import UserList from "@/components/admin/UserList";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { handleFetchRole } from "@/store/slices/adminSlice/role";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersPage = () => {
  const t = useTranslations("roles");
  const dispatch = useDispatch();
  const [usersRoleId, setUsersRoleId] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const { roles, isRoleError, isRoleLoading } = useSelector(
    (state: RootState) => state.role
  );

  useEffect(() => {
    dispatch<any>(handleFetchRole());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        {isRoleLoading ? (
          <div className="flex items-center w-full gap-x-14">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="w-[350px] h-[64px] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-x-20">
            <div className="flex items-center gap-x-6">
              <RoleDropDown setUsersRoleId={setUsersRoleId} />
              <SelectLimit limit={limit} setLimit={setLimit} />
            </div>
            <div className="">
              <SearchByName setName={setName} name={name} />
            </div>
            <div className="w-full flex justify-end">
              <AddUser />
            </div>
          </div>
        )}
      </div>
      <UserList role_id={usersRoleId} limit={limit} name={name} />
    </div>
  );
};

export default UsersPage;
