import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleFetchPermissionForSpecificRole } from "@/store/slices/adminSlice/rolepermission";
import { RootState } from "@/store";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DataSendToCreateUserPermission,
  handleCreateUserPermission,
  handleFetchUserPermission,
  handleUpdateUserPermission,
} from "@/store/slices/adminSlice/userpermission";
import { increareCurrentPage } from "@/store/slices/adminSlice/user";
import UpdateUserFooter from "./UpdateUserFooter";
import { useTranslations } from "next-intl";

const AdditionalInformationForm = () => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { rolePermissions, isRolePermissionLoading, isRolePermissionError } =
    useSelector((state: RootState) => state.rolePermission);
  const {
    userPermissions,
    isUserPermissionCreateLoading,
    isUserPermissionError,
  } = useSelector((state: RootState) => state.userPermission);
  const [userTryToAssign, setUserTryToAssign] = useState<boolean>(false);

  const allowedUserPermissions = rolePermissions.map((permission) => ({
    id: permission.permission_id,
    name: permission.permission.permissions_name,
    description: permission.permission.description,
  }));

  useEffect(() => {
    if (user?.role_id !== undefined) {
      dispatch<any>(
        handleFetchPermissionForSpecificRole({ role_id: user.role_id })
      );
      dispatch<any>(handleFetchUserPermission(user.ID));
    }
  }, [dispatch, user?.role_id, user?.ID]);

  const FormSchema = z.object({
    selectedPermissions: z.array(z.number()).optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedPermissions: userPermissions.map((perm) => perm.permission_id),
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      selectedPermissions: userPermissions.map((perm) => perm.permission_id),
    });
  }, [userPermissions, reset]);

  const onSubmit = async (data: { selectedPermissions?: number[] }) => {
    if (data.selectedPermissions?.length === 0) {
      if (!userTryToAssign) {
        setUserTryToAssign(true);
        return;
      }
    }
    if (user?.ID !== undefined) {
      dispatch<any>(
        handleUpdateUserPermission({
          user_id: user.ID,
          permission_ids: data.selectedPermissions ?? [],
        })
      );
    } else {
      toast.error("User ID is missing");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <p>
        {allowedUserPermissions.length === 0
          ? t("nopermissionforrole")
          : t("assignpermissiontouser")}
      </p>
      {isRolePermissionError && (
        <p className="text-red-500">{isRolePermissionError}</p>
      )}
      {isRolePermissionLoading ? (
        <div className="flex flex-col items-center w-full gap-y-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[44px] rounded-sm" />
          ))}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {allowedUserPermissions.map((permission) => (
              <FormField
                key={permission.id}
                control={form.control}
                name="selectedPermissions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={(field.value ?? []).includes(permission.id)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...(field.value ?? []), permission.id]
                              : (field.value ?? []).filter(
                                  (id) => id !== permission.id
                                )
                          );
                          setUserTryToAssign(false);
                        }}
                        disabled={isUserPermissionCreateLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{permission.name.toUpperCase()}</FormLabel>
                      <p>{permission.description}</p>
                    </div>
                  </FormItem>
                )}
              />
            ))}
            {allowedUserPermissions.length === 0 ? (
              <Button
                type="button"
                className="bg-green-500 hover:bg-green-600 w-full px-4 py-7 rounded-md text-white text-sm"
                onClick={() => dispatch<any>(increareCurrentPage())}
              >
                {t("getpassword")}
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#3A5DD9] hover:bg-[#2a4bc6] w-full px-4 py-7 rounded-md text-white text-sm"
                disabled={isUserPermissionCreateLoading}
              >
                {t("assign")}
                {isUserPermissionCreateLoading && (
                  <FaSpinner className="animate-spin ml-2 text-white" />
                )}
              </Button>
            )}
          </form>
        </Form>
      )}
      <UpdateUserFooter />
    </div>
  );
};

export default AdditionalInformationForm;
