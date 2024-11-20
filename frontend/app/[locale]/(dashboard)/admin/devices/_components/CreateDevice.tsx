import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createDeviceSchema } from "@/validators/admin/create-device-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  DataSendToCreateDevice,
  handleCreateDevice,
  resetDeviceCreateSuccess,
} from "@/store/slices/adminSlice/device";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { TbDeviceDesktopPlus } from "react-icons/tb";
import { UserRoundPlus } from "lucide-react";

const CreateDevice = () => {
  const t = useTranslations("adminDevice");
  const dispatch = useDispatch();
  const { isDeviceCreateLoading, isDeviceCreateError, isDeviceCreateSuccess } =
    useSelector((state: RootState) => state.device);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataSendToCreateDevice>({
    resolver: yupResolver(createDeviceSchema(t)),
  });

  const onSubmit = (data: DataSendToCreateDevice) => {
    dispatch<any>(handleCreateDevice(data));
  };

  useEffect(() => {
    if (isDeviceCreateSuccess) {
      dispatch(resetDeviceCreateSuccess());
      reset();
    }
  }, [isDeviceCreateSuccess, reset, dispatch]);

  return (
    <Dialog>
      <DialogTrigger className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm">
        {/* <MdOutlinePersonAddAlt1 className="text-xl text-white" /> */}
        <TbDeviceDesktopPlus className="text-xl text-white" />
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("createdevice")}</DialogTitle>
          <DialogDescription>{t("becarefull")}</DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                className={cn(
                  { "focus-visible:ring-red-600": errors.port },
                  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                )}
              />
              {errors.port && (
                <p className="text-red-500 mt-1">{errors.port.message}</p>
              )}
            </div>
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
              {errors?.location && (
                <p className="text-red-500 mt-1">{errors?.location.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isDeviceCreateLoading}
              className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
            >
              <span>{t("createdevice")}</span>
              {isDeviceCreateLoading && (
                <FaSpinner className="animate-spin ml-2 text-white" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDevice;
