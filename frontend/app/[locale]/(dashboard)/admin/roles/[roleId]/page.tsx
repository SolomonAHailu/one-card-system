"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleFetchPermissions } from "@/store/slices/adminSlice/permission";
import {
  handleFetchPermissionForSpecificRole,
  handleUpdateRolePermissionByRoleId,
} from "@/store/slices/adminSlice/rolepermission";
import { FaSpinner } from "react-icons/fa";

const RoleDetailPage = ({ params }: { params: { roleId: string } }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state: RootState) => state.role);
  const { permissions, isPermissionLoading } = useSelector(
    (state: RootState) => state.permission
  );
  const {
    rolePermissions,
    isRolePermissionLoading,
    isRolePermissionUpdateLoading,
  } = useSelector((state: RootState) => state.rolePermission);
  const currentRole = roles.find((role) => role.ID === parseInt(params.roleId));

  // Define schema for form validation
  const FormSchema = z.object({
    selectedPermissions: z.array(z.number()).optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedPermissions: [],
    },
  });

  // Set up useEffect hooks for fetching data
  useEffect(() => {
    dispatch<any>(handleFetchPermissions());
    dispatch<any>(
      handleFetchPermissionForSpecificRole({ role_id: parseInt(params.roleId) })
    );
  }, [dispatch, params.roleId]);

  useEffect(() => {
    if (rolePermissions) {
      const rolePermIds = rolePermissions.map((perm) => perm.permission_id);
      form.setValue("selectedPermissions", rolePermIds);
    }
  }, [rolePermissions, form]);

  const onSubmit = (data: { selectedPermissions?: number[] }) => {
    dispatch<any>(
      handleUpdateRolePermissionByRoleId({
        role_id: parseInt(params.roleId),
        permission_ids: data.selectedPermissions ?? [],
      })
    );
  };

  return (
    <div className="rounded-xl h-[calc(100vh-96px)] flex flex-col gap-y-2">
      <div className="bg-secondary/60 p-6 rounded-tr-2xl rounded-br-2xl">
        <div className="grid grid-cols-8 mb-4 items-baseline">
          <h1 className="text-[#2a4bc6] text-lg col-span-1">Role name</h1>
          <p className="text-muted-foreground text-sm col-span-7">
            {currentRole?.role_name}
          </p>
        </div>
        <div className="grid grid-cols-8 items-baseline">
          <h1 className="text-[#2a4bc6] text-lg col-span-1">
            Role description
          </h1>
          <p className="text-muted-foreground text-sm col-span-7">
            {currentRole?.description}
          </p>
        </div>
      </div>
      <div className="col-span-2 bg-secondary/60 p-6 rounded-tr-2xl rounded-br-2xl flex-1 overflow-y-auto">
        {isPermissionLoading || isRolePermissionLoading ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="w-60 h-[50px] col-span-2" />
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="col-span-1 h-[50px]" />
            ))}
            <Skeleton className="w-60 h-[50px]" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full relative"
            >
              <h1 className="text-xl text-[#2a4bc6]">Role Permissions</h1>
              <div className="grid grid-cols-7 gap-4 mt-4">
                {permissions.map((permission) => (
                  <FormField
                    key={permission.ID}
                    control={form.control}
                    name="selectedPermissions"
                    render={({ field }) => (
                      <FormItem className="col-span-1 flex items-center gap-x-3">
                        <FormControl>
                          <Checkbox
                            checked={
                              field?.value?.includes(permission.ID) ?? false
                            }
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...(field.value ?? []), permission.ID]
                                  : field.value?.filter(
                                      (id) => id !== permission.ID
                                    )
                              );
                            }}
                            className="h-5 w-5 text-[#2a4bc6]"
                          />
                        </FormControl>
                        <FormLabel>{permission.permissions_name}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="py-6 bg-[#3A5DD9] hover:bg-[#2a4bc6] absolute bottom-0 right-0 text-white"
              >
                Save Changes
                {isRolePermissionUpdateLoading && (
                  <FaSpinner className="animate-spin ml-2" />
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RoleDetailPage;
