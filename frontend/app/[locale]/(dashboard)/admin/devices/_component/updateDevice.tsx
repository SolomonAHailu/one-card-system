import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { createDeviceSchema } from "@/Validators/admin/create-device-validator";
import {
  DataSendToCreateDevice,
  handleUpdateDevice,
  DeviceRecieved,
} from "@/store/slices/adminSlice/device";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const UpdateBasicInfo = ({ device }: { device: DeviceRecieved }) => {
  const t = useTranslations("adminDevice");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isDeviceCreateLoading, isDeviceCreateError } = useSelector(
    (state: RootState) => state.device
  );

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
    console.log("Form Data:", data);
    const updatedData = { ...data, id: device.ID };
    dispatch<any>(handleUpdateDevice(updatedData));
    reset({
      name: "",
      serial_number: "",
      ip_address: "",
      port: 0,
      location: ""
    });
    clearErrors();
  };

  return (
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
            className={cn(
              { "focus-visible:ring-red-600": errors.serial_number },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.serial_number && (
            <p className="text-red-500 mt-1">{errors.serial_number.message}</p>
          )}
        </div>

        {/* IP Address */}
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
            className={cn(
              { "focus-visible:ring-red-600": errors.ip_address },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.ip_address && (
            <p className="text-red-500 mt-1">
              {errors.ip_address.message}
            </p>
          )}
        </div>

        {/* Port */}
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
            className={cn(
              { "focus-visible:ring-red-600": errors.location },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.location && (
            <p className="text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isDeviceCreateLoading}
          className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
        >
          <span>{t("updatedevice")}</span>
          {isDeviceCreateLoading && (
            <FaSpinner className="animate-spin ml-2 text-white" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateBasicInfo;
