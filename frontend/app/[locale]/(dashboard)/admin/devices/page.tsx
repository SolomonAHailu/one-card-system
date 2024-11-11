"use client";
import { useState } from "react";
import { ImLoop2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import DeviceList from "./_components/DeviceList";
import { handleFetchDevice } from "@/store/slices/adminSlice/device";
import CreateDevice from "./_components/CreateDevice";

const DevicesPage = () => {
  const dispatch = useDispatch();
  const [refetchDevice, setRefetchDevice] = useState<boolean>(false);

  const refetchDevices = () => {
    setRefetchDevice(true);
    setTimeout(() => {
      setRefetchDevice(false);
    }, 500);
    dispatch<any>(handleFetchDevice());
  };
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-end gap-x-4">
        <div
          className="h-10 w-10 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer"
          onClick={refetchDevices}
        >
          <ImLoop2
            className={`text-sm transition-transform duration-500 text-white ${
              refetchDevice ? "animate-spin" : ""
            }`}
          />
        </div>
        <CreateDevice />
      </div>
      <DeviceList />
    </div>
  );
};

export default DevicesPage;
