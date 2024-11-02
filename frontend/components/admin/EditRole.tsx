import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleRecieved } from "@/store/slices/adminSlice/user";
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
  handleUpdateRole,
  resetRoleUpdateSuccess,
  RoleSend,
} from "@/store/slices/adminSlice/role";
import { yupResolver } from "@hookform/resolvers/yup";

import { createRoleSchema } from "@/Validators/admin/create-role-validators";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditRole = ({ role }: { role: RoleRecieved }) => {
  const t = useTranslations("admin");
  const dispatch = useDispatch();
  const { isRoleError, isRoleCreateLoading, isRoleUpdateSuccess } = useSelector(
    (state: RootState) => state.role
  );

  const [hasChanges, setHasChanges] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoleSend>({
    resolver: yupResolver(createRoleSchema(t)),
    defaultValues: {
      role_name: role.role_name,
      description: role.description,
    },
  });

  const onSubmit = (data: RoleSend) => {
    data = { ...data, id: role.ID };
    dispatch<any>(handleUpdateRole(data));
    setHasChanges(false); // Reset changes state after submission
  };

  const handleInputChange = () => {
    setHasChanges(true);
    dispatch(resetRoleUpdateSuccess());
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editRoleTitle")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col gap-y-4">
            {isRoleError && <p className="text-red-500">{isRoleError}</p>}
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="role_name"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("roleName")}
              </Label>
              <Input
                id="role_name"
                type="text"
                placeholder={t("enterRoleName")}
                {...register("role_name")}
                onChange={handleInputChange}
                className={cn(
                  { "focus-visible:ring-red-600": errors.role_name },
                  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
                )}
              />
              {errors.role_name && (
                <p className="text-red-500 mt-1">{errors.role_name.message}</p>
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
            {isRoleUpdateSuccess && !hasChanges ? (
              <DialogClose
                type="button"
                onClick={() => dispatch(resetRoleUpdateSuccess())}
                className="bg-green-600 hover:bg-green-700 py-3.5 rounded-sm text-white"
              >
                {t("close")}
              </DialogClose>
            ) : (
              <Button
                type="submit"
                disabled={isRoleCreateLoading}
                className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
              >
                <span>{t("updateRole")}</span>
                {isRoleCreateLoading && (
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

export default EditRole;
