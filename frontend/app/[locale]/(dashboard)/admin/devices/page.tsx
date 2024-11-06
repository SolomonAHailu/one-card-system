"use client";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch } from "react-redux";
// import AddDevice from "@/components/admin/AddDevice";
import SearchByName from "@/app/[locale]/(dashboard)/admin/_components/SearchByName";
import SelectLimit from "@/app/[locale]/(dashboard)/admin/_components/SelectLimit";
import DeviceList from "./_component/DeviceList";

import AddDevice from "@/app/[locale]/(dashboard)/admin/devices/_component/AddDevice";
import { handleFetchDevice } from "@/store/slices/adminSlice/device";

const DevicesPage = () => {
  const dispatch = useDispatch();
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
            <AddDevice />
          </div>
        </div>
      </div>
      <DeviceList limit={limit} name={name} page={page} setPage={setPage} />
    </div>
  );
};

export default DevicesPage;
