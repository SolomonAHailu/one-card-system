import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaSpinner } from "react-icons/fa";
import { MdDomainAdd } from "react-icons/md";
import { MdAddModerator } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  handleCreateRole,
  resetRoleCreateSuccess,
  RoleSend,
} from "@/store/slices/adminSlice/role";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRoleSchema } from "@/validators/admin/create-role-validators";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

const AddRole = () => {
  const t = useTranslations("roles");
  const dispatch = useDispatch();
  const { isRoleCreateLoading, isRoleError, isRoleCreateSuccess } = useSelector(
    (state: RootState) => state.role
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<RoleSend>({
    resolver: yupResolver(createRoleSchema(t)),
  });

  useEffect(() => {
    if (isRoleCreateSuccess) {
      dispatch(resetRoleCreateSuccess());
      reset();
    }
  }, [isRoleCreateSuccess, reset, dispatch]);

  const onSubmit = (data: RoleSend) => {
    dispatch<any>(handleCreateRole(data));
  };
  return (
    <Dialog>
      <DialogTrigger className="h-8 w-8 bg-[#3A5DD9] hover:bg-[#2a4bc6] flex items-center justify-center rounded-sm cursor-pointer">
        {/* <MdDomainAdd className="text-xl text-white" /> */}
        <MdAddModerator className="text-xl text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ADD ROLE</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col gap-y-4">
            {isRoleError && <p className="text-red-500">{isRoleError}</p>}
            <div className="flex flex-col gap-y-1 items-start">
              <Label
                htmlFor="firstname"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("rolename")}
              </Label>
              <Input
                id="rolename"
                type="text"
                placeholder={t("enterrolename")}
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
                htmlFor="roledescription"
                className="block text-sm font-medium text-muted-foreground"
              >
                {t("roledescription")}
              </Label>
              <Input
                id="roledescription"
                type="text"
                placeholder={t("enterroledescription")}
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
              disabled={isRoleCreateLoading}
              className="w-full bg-[#3A5DD9] hover:bg-[#2a4bc6] py-6 text-white"
            >
              <span>{t("createrole")}</span>
              {isRoleCreateLoading && (
                <FaSpinner className="animate-spin ml-2 text-white" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRole;
