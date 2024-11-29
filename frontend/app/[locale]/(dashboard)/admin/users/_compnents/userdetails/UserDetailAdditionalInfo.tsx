import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRecieved } from "@/store/slices/adminSlice/user";
import { handleFetchUserPermission } from "@/store/slices/adminSlice/userpermission";
import { useTranslations } from "next-intl";

const AdditionalInformationForm = ({ user }: { user: UserRecieved }) => {
  const t = useTranslations("adminusers");
  const dispatch = useDispatch();
  const { rolePermissions, isRolePermissionLoading, isRolePermissionError } =
    useSelector((state: RootState) => state.rolePermission);
  const { userPermissions } = useSelector(
    (state: RootState) => state.userPermission
  );

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
    defaultValues: {
      selectedPermissions: userPermissions.map((perm) => perm.permission_id),
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <p>{allowedUserPermissions.length === 0 && t("nopermissionforuser")}</p>
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
          <form className="space-y-6">
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
                        }}
                        disabled={true}
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
          </form>
        </Form>
      )}
    </div>
  );
};

export default AdditionalInformationForm;
