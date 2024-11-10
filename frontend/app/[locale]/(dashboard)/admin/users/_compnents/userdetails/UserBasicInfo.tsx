import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  DataSendToCreateUser,
  UserRecieved,
} from "@/store/slices/adminSlice/user";
import { useForm } from "react-hook-form";
import { createUserSchema } from "@/validators/admin/create-user-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserBasicInfo = ({ user }: { user: UserRecieved }) => {
  const t = useTranslations("adminusers");
  const [roleSelect, setRoleSelect] = useState("");
  const { roles } = useSelector((state: RootState) => state.role);

  const { setValue } = useForm<DataSendToCreateUser>({
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
    }
  }, [roles, user.role_id, setValue]);

  return (
    <form className="flex flex-col gap-y-6">
      <div className="text-center flex flex-col gap-y-4">
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
            value={user.first_name}
            disabled
            className="cursor-not-allowed border-muted-foreground border-2"
          />
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
            value={user.father_name}
            disabled
            className="cursor-not-allowed border-muted-foreground border-2"
          />
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
            value={user.grand_father_name}
            disabled
            className="cursor-not-allowed border-muted-foreground border-2"
          />
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
            value={user.email}
            disabled
            className="cursor-not-allowed border-muted-foreground border-2"
          />
        </div>
        <div className="flex flex-col gap-y-1 items-start">
          <Label
            htmlFor="role"
            className="block text-sm font-medium text-muted-foreground"
          >
            {t("role")}
          </Label>
          <Input
            id="role"
            type="text"
            placeholder={t("enterrole")}
            value={roleSelect}
            disabled
            className="cursor-not-allowed border-muted-foreground border-2"
          />
        </div>
      </div>
    </form>
  );
};

export default UserBasicInfo;
