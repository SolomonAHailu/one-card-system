import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { createDeviceSchema } from "@/validators/admin/create-device-validator";
import {
  DataSendToCreateDevice,
  handleUpdateDevice,
  DeviceRecieved,
  resetDeviceUpdateSuccess,
} from "@/store/slices/adminSlice/device";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { RootState } from "@/store";

const EditDevice = ({ device }: { device: DeviceRecieved }) => {
  const t = useTranslations("adminDevice");
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const {
    isDeviceCreateLoading,
    isDeviceCreateError,
    isDeviceUpdateSuccess,
    isDeviceUpdateLoading,
  } = useSelector((state: RootState) => state.device);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<DataSendToCreateDevice>({
    resolver: yupResolver(createDeviceSchema(t)),
    defaultValues: {
      name: device.name,
      serial_number: device.serial_number,
      ip_address: device.ip_address,
      port: device.port,
      location: device.location,
    },
  });

  const onSubmit = (data: DataSendToCreateDevice) => {
    const updatedData = { ...data, id: device.ID };
    dispatch<any>(handleUpdateDevice(updatedData));
    setHasChanges(false);
  };

  const handleInputChange = () => {
    setHasChanges(true);
    dispatch(resetDeviceUpdateSuccess());
  };

  return (
    <DialogContent className="max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{t("updatedevice")}</DialogTitle>
        <DialogDescription>
          {t("becarefull")}
        </DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center flex flex-col gap-y-4">
          {isDeviceCreateError && (
            <p className="text-red-500">{isDeviceCreateError}</p>
          )}
          <div className="flex flex-col gap-y-1 items-start">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground"
            >
              {t("name")}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t("enterdevicename")}
              {...register("name")}
              onChange={handleInputChange}
              className={cn(
                { "focus-visible:ring-red-600": errors.name },
                "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
              )}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 items-start">
            <Label
              htmlFor="serial_number"
              className="block text-sm font-medium text-muted-foreground"
            >
              {t("serial_number")}
            </Label>
            <Input
              id="serial_number"
              type="text"
              placeholder={t("enterdeviceserialnumber")}
              {...register("serial_number")}
              onChange={handleInputChange}
              className={cn(
                { "focus-visible:ring-red-600": errors.serial_number },
                "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
              )}
            />
            {errors.serial_number && (
              <p className="text-red-500 mt-1">
                {errors.serial_number.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1 items-start">
            <Label
              htmlFor="ip_address"
              className="block text-sm font-medium text-muted-foreground"
            >
              {t("ip_address")}
            </Label>
            <Input
              id="ip_address"
              type="text"
              placeholder={t("enterdeviceipaddress")}
              {...register("ip_address")}
              onChange={handleInputChange}
              className={cn(
                { "focus-visible:ring-red-600": errors.ip_address },
                "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
              )}
            />
            {errors.ip_address && (
              <p className="text-red-500 mt-1">{errors.ip_address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1 items-start">
            <Label
              htmlFor="port"
              className="block text-sm font-medium text-muted-foreground"
            >
              {t("port")}
            </Label>
            <Input
              id="port"
              type="text"
              placeholder={t("enterdeviceport")}
              {...register("port")}
              onChange={handleInputChange}
              className={cn(
                { "focus-visible:ring-red-600": errors.port },
                "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
              )}
            />
            {errors.port && (
              <p className="text-red-500 mt-1">{errors.port.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-y-1 items-start">
            <Label
              htmlFor="location"
              className="block text-sm font-medium text-muted-foreground"
            >
              {t("location")}
            </Label>
            <Input
              id="location"
              type="text"
              placeholder={t("enterdevicelocation")}
              {...register("location")}
              onChange={handleInputChange}
              className={cn(
                { "focus-visible:ring-red-600": errors.location },
                "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
              )}
            />
            {errors.location && (
              <p className="text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>
          {isDeviceUpdateSuccess && !hasChanges ? (
            <DialogClose
              type="button"
              onClick={() => dispatch(resetDeviceUpdateSuccess())}
              className="bg-green-600 hover:bg-green-700 py-3.5 rounded-sm text-white"
            >
              {t("close")}
            </DialogClose>
          ) : (
            <Button
              type="submit"
              disabled={isDeviceUpdateLoading}
              className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
            >
              <span>{t("updatedevice")}</span>
              {isDeviceUpdateLoading && (
                <FaSpinner className="animate-spin ml-2 text-white" />
              )}
            </Button>
          )}
        </div>
      </form>
    </DialogContent>
  );
};

export default EditDevice;
