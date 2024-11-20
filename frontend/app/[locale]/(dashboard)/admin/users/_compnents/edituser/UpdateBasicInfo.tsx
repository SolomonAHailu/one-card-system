import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  DataSendToCreateUser,
  handleCreateUser,
  handleUpdateUser,
  UserRecieved,
} from "@/store/slices/adminSlice/user";
import { useForm } from "react-hook-form";
import { createUserSchema } from "@/validators/admin/create-user-validator";
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
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import UpdateUserFooter from "./UpdateUserFooter";

const UpdateBasicInfo = ({ user }: { user: UserRecieved }) => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [roleSelect, setRoleSelect] = useState("");
  const { roles } = useSelector((state: RootState) => state.role);
  const { isUserCreateLoading, isUserCreateError } = useSelector(
    (state: RootState) => state.user
  );
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<DataSendToCreateUser>({
    resolver: yupResolver(createUserSchema(t)),
    defaultValues: {
      first_name: user.first_name,
      father_name: user.father_name,
      grand_father_name: user.grand_father_name,
      email: user.email,
      role_id: user.role_id,
    },
  });

  useEffect(() => {
    const currentRole = roles.find(
      (role) => role.ID === user.role_id
    )?.role_name;
    if (currentRole) {
      setRoleSelect(currentRole);
      setValue("role_id", user.role_id);
    }
  }, [roles, user.role_id, setValue]);

  const onSubmit = (data: DataSendToCreateUser) => {
    const updatedData = { ...data, id: user.ID };
    dispatch<any>(handleUpdateUser(updatedData));
  };

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center flex flex-col gap-y-4">
        {isUserCreateError && (
          <p className="text-red-500">{isUserCreateError}</p>
        )}
        <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="firstname"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("firstname")}
          </Label>
          <Input
            id="firstname"
            type="text"
            placeholder={t("enterfirstname")}
            {...register("first_name")}
            className={cn(
              { "focus-visible:ring-red-600": errors.first_name },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.first_name && (
            <p className="text-red-500 mt-1">{errors.first_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="fathername"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("fathername")}
          </Label>
          <Input
            id="fathername"
            type="text"
            placeholder={t("enterfathername")}
            {...register("father_name")}
            className={cn(
              { "focus-visible:ring-red-600": errors.father_name },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.father_name && (
            <p className="text-red-500 mt-1">{errors.father_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="grandfathername"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("grandfathername")}
          </Label>
          <Input
            id="grandfathername"
            type="text"
            placeholder={t("entergrandfathername")}
            {...register("grand_father_name")}
            className={cn(
              { "focus-visible:ring-red-600": errors.grand_father_name },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.grand_father_name && (
            <p className="text-red-500 mt-1">
              {errors.grand_father_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("email")}
          </Label>
          <Input
            id="email"
            type="text"
            placeholder={t("enteremail")}
            {...register("email")}
            className={cn(
              { "focus-visible:ring-red-600": errors.email },
              "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
            )}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 items-start">
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
                {roleSelect ? t(roleSelect.toLowerCase()) : t("selectrole")}
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
                        onSelect={(currentRoleSelect) => {
                          setRoleSelect(
                            currentRoleSelect === roleSelect
                              ? ""
                              : currentRoleSelect
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
        </div>
        <Button
          type="submit"
          disabled={isUserCreateLoading}
          className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
        >
          <span>{t("edituser")}</span>
          {isUserCreateLoading && (
            <FaSpinner className="animate-spin ml-2 text-white" />
          )}
        </Button>
      </div>
      <UpdateUserFooter />
    </form>
  );
};

export default UpdateBasicInfo;
