"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { ImLoop2 } from "react-icons/im";
import { Skeleton } from "@/components/ui/skeleton";
import AddUser from "@/components/admin/AddUser";
import RoleDropDown from "@/components/admin/RoleDropDown";
import SearchByName from "@/components/admin/SearchByName";
import SelectLimit from "@/components/admin/SelectLimit";
import UserList from "@/components/admin/UserList";
import { RootState } from "@/store";
import { handleFetchRole } from "@/store/slices/adminSlice/role";
import { handleFetchUser } from "@/store/slices/adminSlice/user";

const UsersPage = () => {
  const t = useTranslations("roles");
  const dispatch = useDispatch();
  const [usersRoleId, setUsersRoleId] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refetchUser, setRefetchUser] = useState<boolean>(false);

  const { roles, isRoleError, isRoleLoading } = useSelector(
    (state: RootState) => state.role
  );

  const refetchUsers = () => {
    setRefetchUser(true);
    setTimeout(() => {
      setRefetchUser(false);
    }, 500);
    dispatch<any>(
      handleFetchUser({
        role_id: usersRoleId,
        page,
        limit,
        name: name ?? "",
      })
    );
  };

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
              <div
                className="h-14 w-14 px-5 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
                onClick={refetchUsers}
              >
                <ImLoop2
                  className={`text-4xl transition-transform duration-500 text-white ${
                    refetchUser ? "animate-spin" : ""
                  }`}
                />
              </div>
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
      <UserList
        role_id={usersRoleId}
        limit={limit}
        name={name}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default UsersPage;
