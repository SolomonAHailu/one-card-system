"use client";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  CreatePermissionDataSend,
  resetPermissionUpdateSuccess,
  handleUpdatePermission,
  PermissionRecieved,
} from "@/store/slices/adminSlice/permission";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPermissionSchema } from "@/validators/admin/create-permission-validator";
import { useEffect, useState } from "react";

const EditPermission = ({ permission }: { permission: PermissionRecieved }) => {
  const t = useTranslations("admin");
  const dispatch = useDispatch();
  const {
    isPermissionCreateSuccess,
    isPermissionError,
    isPermissionCreateLoading,
    isPermissionUpdateSuccess,
  } = useSelector((state: RootState) => state.permission);

  const [hasChanges, setHasChanges] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePermissionDataSend>({
    resolver: yupResolver(createPermissionSchema(t)),
    defaultValues: {
      permissions_name: permission.permissions_name,
      description: permission.description,
    },
  });

  const onSubmit = (data: CreatePermissionDataSend) => {
    data = { ...data, id: permission.ID };
    dispatch<any>(handleUpdatePermission(data));
    setHasChanges(false);
  };

  const handleInputChange = () => {
    setHasChanges(true);
    dispatch(resetPermissionUpdateSuccess());
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editPermissionTitle")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col gap-y-4">
            {isPermissionError && (
              <p className="text-red-500">{isPermissionError}</p>
            )}
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="permissions_name"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("permissionName")}
              </Label>
              <Input
                id="permissions_name"
                type="text"
                placeholder={t("enterPermissionName")}
                {...register("permissions_name")}
                onChange={handleInputChange}
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
                htmlFor="description"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("description")}
              </Label>
              <Input
                id="description"
                type="text"
                placeholder={t("enterDescription")}
                {...register("description")}
                onChange={handleInputChange}
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
            {isPermissionUpdateSuccess && !hasChanges ? (
              <DialogClose
                type="button"
                onClick={() => dispatch(resetPermissionUpdateSuccess())}
                className="bg-green-600 hover:bg-green-700 py-3.5 rounded-sm text-white"
              >
                {t("close")}
              </DialogClose>
            ) : (
              <Button
                type="submit"
                disabled={isPermissionCreateLoading}
                className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
              >
                <span>{t("updatePermission")}</span>
                {isPermissionCreateLoading && (
                  <FaSpinner className="animate-spin ml-2 text-white" />
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </div>
  );
};

export default EditPermission;
