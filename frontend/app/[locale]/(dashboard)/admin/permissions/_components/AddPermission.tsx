"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { MdAddModerator } from "react-icons/md";
import { MdDomainAdd } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreatePermissionDataSend,
  resetRoleCreateSuccess,
  handleCreatePermission,
} from "@/store/slices/adminSlice/permission";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";
import { createPermissionSchema } from "@/validators/admin/create-permission-validator";

const AddPermissions = () => {
  const t = useTranslations("permission");
  const dispatch = useDispatch();
  const {
    isPermissionCreateSuccess,
    isPermissionError,
    isPermissionCreateLoading,
  } = useSelector((state: RootState) => state.permission);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreatePermissionDataSend>({
    resolver: yupResolver(createPermissionSchema(t)),
  });

  useEffect(() => {
    if (isPermissionCreateSuccess) {
      dispatch(resetRoleCreateSuccess());
      reset();
    }
  }, [isPermissionCreateSuccess, reset, dispatch]);

  const onSubmit = (data: CreatePermissionDataSend) => {
    dispatch<any>(handleCreatePermission(data));
  };
  return (
    <Dialog>
      <DialogTrigger className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer">
        <MdAddModerator className="text-xl text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addpermission")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col gap-y-4">
            {isPermissionError && (
              <p className="text-red-500">{isPermissionError}</p>
            )}
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="firstname"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("permissionname")}
              </Label>
              <Input
                id="permissionname"
                type="text"
                placeholder={t("enterpermissionname")}
                {...register("permissions_name")}
                className={cn(
                  { "focus-visible:ring-red-600": errors.permissions_name },
                  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                )}
              />
              {errors.permissions_name && (
                <p className="text-red-500 mt-1">
                  {errors.permissions_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="permissiondescription"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("permissiondescription")}
              </Label>
              <Input
                id="permissiondescription"
                type="text"
                placeholder={t("enterpermissiondescription")}
                {...register("description")}
                className={cn(
                  { "focus-visible:ring-red-600": errors.description },
                  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                )}
              />
              {errors.description && (
                <p className="text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isPermissionCreateLoading}
              className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
            >
              <span>{t("createpermission")}</span>
              {isPermissionCreateLoading && (
                <FaSpinner className="animate-spin ml-2 text-white" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPermissions;
