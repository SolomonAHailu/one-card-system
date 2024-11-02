import {
  DialogClose,
  DialogContent,
  DialogDescription,
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
  resetRoleCreateSuccess,
  resetRoleUpdateSuccess,
  RoleSend,
} from "@/store/slices/adminSlice/role";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRoleSchema } from "@/validators/admin/create-role-validators";
import { useEffect } from "react";
import { toast } from "sonner";

const EditRole = ({ role }: { role: RoleRecieved }) => {
  const t = useTranslations("admin");
  const dispatch = useDispatch();
  const { isRoleError, isRoleCreateLoading, isRoleUpdateSuccess } = useSelector(
    (state: RootState) => state.role
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
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
    console.log("DATA TO UPDATE THE ROLE", data);
    dispatch<any>(handleUpdateRole(data));
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col gap-y-4">
            {isRoleError && <p className="text-red-500">{isRoleError}</p>}
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="firstname"
                className="block text-sm font-medium text-muted-foreground"
              >
                Role Name
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter Role Name"
                {...register("role_name")}
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
                htmlFor="fathername"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("fathername")}
              </Label>
              <Input
                id="fathername"
                type="text"
                placeholder={t("enterfathername")}
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
            {isRoleUpdateSuccess ? (
              <DialogClose
                type="button"
                onClick={() => {
                  dispatch(resetRoleUpdateSuccess());
                }}
                className="bg-green-600 hover:bg-green-700 py-3.5 rounded-sm text-white"
              >
                Close
              </DialogClose>
            ) : (
              <Button
                type="submit"
                disabled={isRoleCreateLoading}
                className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
              >
                <span>Update Role</span>
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
