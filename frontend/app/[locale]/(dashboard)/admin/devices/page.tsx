"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { ImLoop2 } from "react-icons/im";
import { Skeleton } from "@/components/ui/skeleton";
// import AddDevice from "@/components/admin/AddDevice";
import SearchByName from "@/components/admin/SearchByName";
import SelectLimit from "@/components/admin/SelectLimit";
import DeviceList from "@/components/admin/DeviceList";
import { RootState } from "@/store";
import { handleFetchDevice } from "@/store/slices/adminSlice/device";

const DevicesPage = () => {
  const t = useTranslations("roles");
  const dispatch = useDispatch();
  const [usersRoleId, setUsersRoleId] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [refetchDevice, setRefetchDevice] = useState<boolean>(false);

  const refetchDevices = () => {
    setRefetchDevice(true);
    setTimeout(() => {
      setRefetchDevice(false);
    }, 500);
    dispatch<any>(
      handleFetchDevice({
        role_id: usersRoleId,
        page,
        limit,
        name: name ?? "",
      })
    );
  };
  return (
    <div className="flex flex-col gap-y-3">
      <div>
          <div className="flex items-center gap-x-20">
            <div className="flex items-center gap-x-6">
              <div
                className="h-14 w-14 px-5 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
                onClick={refetchDevices}
              >
                <ImLoop2
                  className={`text-4xl transition-transform duration-500 text-white ${
                    refetchDevice ? "animate-spin" : ""
                  }`}
                />
              </div>
             
              <SelectLimit limit={limit} setLimit={setLimit} />
            </div>
            <div className="">
              <SearchByName setName={setName} name={name} />
            </div>
            <div className="w-full flex justify-end">
              {/* <AddDevice /> */}
            </div>
          </div>
        
      </div>
      <DeviceList
        role_id={usersRoleId}
        limit={limit}
        name={name}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default DevicesPage;
