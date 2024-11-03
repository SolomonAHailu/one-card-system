import { Label } from "@/components/ui/label";
// import CreateUserFooter from "./CreateUserFooter";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  DataSendToCreateUser,
  handleCreateUser,
} from "@/store/slices/adminSlice/user";
import { useForm } from "react-hook-form";
import { createDeviceSchema } from "@/Validators/admin/create-device-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  DataSendToCreateDevice,
  handleCreateDevice,
} from "@/store/slices/adminSlice/device";

const CreateDevice = () => {
  const t = useTranslations("adminDevice");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roleSelect, setRoleSelect] = useState("");
  const { roles } = useSelector((state: RootState) => state.role);
  const { isDeviceCreateLoading, isDeviceCreateError } = useSelector(
    (state: RootState) => state.device
  );
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    resetField,
    reset,
    formState: { errors },
  } = useForm<DataSendToCreateDevice>({
    resolver: yupResolver(createDeviceSchema(t)),
  });

  const onSubmit = (data: DataSendToCreateDevice) => {
    console.log("Form Data:", data);
    dispatch<any>(handleCreateDevice(data));
    reset();
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
            {t("Location")}
          </Label>
          <Input
            id="location"
            type="text"
            placeholder={t("enterdevicelocation")}
            {...register("Location")}
            className={cn(
              { "focus-visible:ring-red-600": errors.Location },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.Location && (
            <p className="text-red-500 mt-1">{errors.Location.message}</p>
          )}
        </div>
        {/* <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="role"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("role")}
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-12"
              >
                {roleSelect
                  ? t(
                      roles
                        .find((role) => role.role_name === roleSelect)
                        ?.role_name.toLowerCase() ?? t("selectrole")
                    )
                  : t("selectrole")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
              <Command>
                <CommandInput placeholder={t("searchrole")} />
                <CommandList>
                  <CommandEmpty>No Role Found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.ID}
                        onSelect={(currentroleSelect) => {
                          setRoleSelect(
                            currentroleSelect === roleSelect
                              ? ""
                              : currentroleSelect
                          );
                          clearErrors("role_id");
                          setValue("role_id", role.ID);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            roleSelect === role.role_name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {t(role.role_name.toLowerCase())}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.role_id && (
            <p className="text-red-500 mt-1">{errors.role_id.message}</p>
          )}
        </div> */}
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
      {/* <CreateUserFooter /> */}
    </form>
  );
};

export default CreateDevice;
